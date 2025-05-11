import React, { useEffect, useState } from "react";
import { fetchTodos } from "./api/todoApi";
import AddTodoForm from "./components/AddTodoForm";
import axios from "axios";
import EditTodoForm from "./components/EditTodoForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "./components/ConfirmationModal";
function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", priority: "", category_id: "" });
  const [categories, setCategories] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [todoToDelete, setTodoToDelete] = useState(null);


  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8000/api/categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.error("Kategoriler alınamadı:", err);
      });

    fetchTodos()
      .then((res) => {
        setTodos(res.data.data.data);
      })
      .catch((err) => {
        console.error("API Hatası:", err);
      })
      .finally(() => {
        setLoading(false);
      });

    handleFilter();
  }, []);

  const getStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-gray-200 text-gray-600",
    };
  
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status] || "bg-gray-100"}`}>
        {status.replace("_", " ")}
      </span>
    );
  };
  
  const getPriorityBadge = (priority) => {
    const colors = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    };
  
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[priority] || "bg-gray-100"}`}>
        {priority}
      </span>
    );
  };




  const handleDelete = (id) => {
    const onay = window.confirm("Bu todo silinsin mi?");
    if (!onay) return;

    axios
      .delete(`http://localhost:8000/api/todos/${id}`)
      .then(() => {
        toast.success("Todo silindi!");
        handleFilter();
      })
      .catch((err) => {
        console.error("Silme hatası:", err);
        toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      });
  };

  const handleFilter = (page = 1) => {
    setLoading(true);
    const params = { page };
  
    if (filters.status) params.status = filters.status;
    if (filters.priority) params.priority = filters.priority;
    if (filters.category_id) params.category_id = filters.category_id;
  
    axios
      .get("http://localhost:8000/api/todos", { params })
      .then((res) => {
        setTodos(res.data.data.data); 
        setCurrentPage(res.data.data.current_page);
        setLastPage(res.data.data.last_page);
      })
      .catch((err) => {
        console.error("Todo çekilemedi:", err);
        toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <h1 className="text-2xl font-bold mb-4">Todo Uygulaması</h1>
      <AddTodoForm />

      <h2 className="text-xl font-semibold mb-2">Filtrele</h2>
      <div className="flex gap-4 mb-4">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Durum</option>
          <option value="pending">pending</option>
          <option value="in_progress">in_progress</option>
          <option value="completed">completed</option>
          <option value="cancelled">cancelled</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Öncelik</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>

        <select
          value={filters.category_id}
          onChange={(e) => setFilters({ ...filters, category_id: e.target.value })}
          className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleFilter}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Uygula
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 mt-10">
          <svg className="animate-spin h-6 w-6 text-gray-400 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Yükleniyor...
        </div>
      ) : todos.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">Hiç todo bulunamadı.</div>
      ) : (
        <ul className="space-y-4 mt-6">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-white shadow p-4 rounded flex justify-between items-start hover:bg-gray-50 transition cursor-pointer"
            >
              <div onClick={() => setSelectedTodo(todo)} className="flex-1">
                
                <h3 className="font-semibold text-lg text-gray-800">
                  {todo.title}
                </h3>
                <p className="text-sm flex gap-2 mt-1">
                  {getStatusBadge(todo.status)}
                  {getPriorityBadge(todo.priority)}
                </p>
                {todo.categories?.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Kategoriler:{" "}
                    {todo.categories.map((cat) => cat.name).join(", ")}
                  </p>
                )}
                
              </div>

              <button
                  onClick={() => setTodoToDelete(todo.id)}
                  className="ml-4 text-red-600 hover:underline text-sm"
              >
                Sil
              </button>

            </li>
          ))}
        </ul>
        
      )}

<div className="flex justify-center mt-6 space-x-2">
  {Array.from({ length: lastPage }, (_, index) => index + 1).map((page) => (
    <button
      key={page}
      className={`px-3 py-1 rounded ${
        page === currentPage
          ? "bg-indigo-600 text-white"
          : "bg-gray-200 text-gray-800"
      }`}
      onClick={() => handleFilter(page)}
    >
      {page}
    </button>
  ))}
</div>

      {selectedTodo && (
        <EditTodoForm
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
          onUpdated={handleFilter}
        />
      )}
      {todoToDelete && (
  <ConfirmationModal
    message="Bu todo silinsin mi?"
    onConfirm={() => {
      axios
        .delete(`http://localhost:8000/api/todos/${todoToDelete}`)
        .then(() => {
          toast.success("Todo silindi!");
          handleFilter();
        })
        .catch(() => {
          toast.error("Silme işlemi başarısız!");
        })
        .finally(() => setTodoToDelete(null));
    }}
    onCancel={() => setTodoToDelete(null)}
  />
)}

    </div>
  );
}

export default App;