import { useEffect, useState } from "react";
import TodoList from "../components/todo/TodoList";
import AddTodoForm from "../components/todo/AddTodoForm";
import EditTodoForm from "../components/todo/EditTodoForm";
import ConfirmationModal from "../components/common/ConfirmationModal";
import TodoFilter from "../components/todo/TodoFilter";
import useTodos from "../hooks/useTodos";
import useCategories from "../hooks/useCategories";
import { toast } from "react-toastify";
import TodoDetailModal from "../components/todo/TodoDetailModal";
import KanbanBoard from "../components/todo/KanbanBoard";
import * as TodoAPI from "../api/todoApi";

export default function TodoListPage() {
  const { todos, meta, list, deleteTodo, search } = useTodos();
  const { cats, list: loadCats } = useCategories();
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    category_id: "",
    q: "",
    sort: "created_at",
    order: "desc",
  });
  
  const [selected, setSelected] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [detailTodo, setDetailTodo] = useState(null);
  const [kanban, setKanban] = useState(true);
  const [kanbanTodos, setKanbanTodos] = useState([]);

  useEffect(() => {
    list(); loadCats();
  }, []);

  useEffect(() => {
    if (kanban) {
      if (filters.q?.trim()) {
        TodoAPI.searchTodos(filters.q, { ...filters, per_page: 1000 }).then(({ data }) => {
          setKanbanTodos(data.data);
        });
      } else {
        TodoAPI.fetchTodos({ ...filters, per_page: 1000 }).then(({ data }) => {
          setKanbanTodos(data.data);
        });
      }
    }
  }, [kanban, filters]);

  const applyFilters = ({ q, sort, order, page = 1, ...otherFilters }) => {
    const params = {
      page,
      sort,
      order,
      ...otherFilters,
    };

    if (q?.trim()) {
      search(q, params);
    } else {
      list(params);
    }
  };


  const reloadKanban = () => {
    if (filters.q?.trim()) {
      TodoAPI.searchTodos(filters.q, { ...filters, per_page: 1000 }).then(({ data }) => setKanbanTodos(data.data));
    } else {
      TodoAPI.fetchTodos({ ...filters, per_page: 1000 }).then(({ data }) => setKanbanTodos(data.data));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Todo Listesi</h1>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 shadow"
          >
            Yeni Todo Ekle
          </button>
          <button
            onClick={() => setKanban((k) => !k)}
            className={`px-4 py-2 rounded shadow ${kanban ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100'}`}
          >
            {kanban ? 'Klasik Liste' : 'Kanban Görünüm'}
          </button>
        </div>
      </div>

      <TodoFilter
        filters={filters}
        categories={cats}
        onChange={setFilters}
        onApply={(f) => applyFilters(f)}
      />

      {kanban ? (
        <KanbanBoard
          todos={kanbanTodos}
          onEdit={setSelected}
          onDelete={setConfirmId}
          onDetail={setDetailTodo}
          reload={reloadKanban}
        />
      ) : (
        <TodoList todos={todos} onEdit={setSelected} onDelete={setConfirmId} onDetail={setDetailTodo} />
      )}


      {!kanban && meta && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => applyFilters({ ...filters, page: pageNum })}
              className={`px-3 py-1 rounded ${
                pageNum === meta.current_page
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-lg mx-auto">
            <EditTodoForm
              todo={selected}
              onClose={() => setSelected(null)}
              onUpdated={() => {
                applyFilters({ page: meta?.current_page, ...filters });
                if (kanban) reloadKanban();
              }}
            />
          </div>
        </div>
      )}
      
      {confirmId && (
        <ConfirmationModal
          onCancel={() => setConfirmId(null)}
          onConfirm={() =>
            deleteTodo(confirmId)
              .then(() => {
                toast.success("Todo başarıyla silindi!");
                applyFilters({ page: meta?.current_page, ...filters });
                if (kanban) reloadKanban();
                setConfirmId(null);
              })
              .catch(() => {
                toast.error("Todo silinirken hata oluştu!");
                setConfirmId(null);
              })
          }
        />
      )}

      {detailTodo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-lg mx-auto">
            <TodoDetailModal
              todo={detailTodo}
              onClose={() => setDetailTodo(null)}
              onEdit={(todo) => {
                setSelected(todo);
                setDetailTodo(null);
              }}
              onDelete={(id) => {
                setConfirmId(id);
                setDetailTodo(null);
              }}
            />
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-lg mx-auto">
            <AddTodoForm
              onAdded={() => {
                applyFilters({ page: 1, ...filters });
                if (kanban) reloadKanban();
              }}
              onClose={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
