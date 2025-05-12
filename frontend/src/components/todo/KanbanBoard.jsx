import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TodoDetailModal from "./TodoDetailModal";
import axios from "axios";

const statusList = [
  { key: "pending", label: "Bekliyor" },
  { key: "in_progress", label: "Devam Ediyor" },
  { key: "completed", label: "Tamamlandı" },
  { key: "cancelled", label: "İptal" },
];

export default function KanbanBoard({ todos, onEdit, onDelete, onDetail, reload }) {
  const [localTodos, setLocalTodos] = useState(todos);
  const [dragging, setDragging] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  React.useEffect(() => {
    setLocalTodos(todos);
  }, [todos]);

  const grouped = statusList.reduce((acc, s) => {
    acc[s.key] = localTodos.filter((t) => t.status === s.key);
    return acc;
  }, {});

  const onDragEnd = async (result) => {
    setDragging(false);
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId) return;
    const todoId = draggableId;
    
    const prevTodos = [...localTodos];
    setLocalTodos((prev) =>
      prev.map((t) =>
        t.id.toString() === todoId ? { ...t, status: destination.droppableId } : t
      )
    );
    setLoadingId(todoId);
    try {
      await axios.patch(`http://localhost:8000/api/todos/${todoId}/status`, {
        status: destination.droppableId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (reload) reload();
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      alert("Durum güncellenemedi!");
      setLocalTodos(prevTodos);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setDragging(true)}>
        <div className="flex gap-4 min-w-[900px]">
          {statusList.map((status) => (
            <Droppable droppableId={status.key} key={status.key}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-[400px] transition-colors duration-200 shadow-md ${snapshot.isDraggingOver ? 'ring-2 ring-indigo-400' : ''}`}
                >
                  <div className="font-bold mb-3 text-gray-700 dark:text-gray-200 text-center">
                    {status.label}
                  </div>
                  {grouped[status.key].map((todo, idx) => (
                    <Draggable draggableId={todo.id.toString()} index={idx} key={todo.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`mb-4 last:mb-0 bg-white dark:bg-gray-900 rounded shadow p-4 cursor-pointer transition-all duration-200 border border-transparent ${snapshot.isDragging ? 'border-indigo-400 scale-105' : ''}`}
                          onClick={() => onDetail && onDetail(todo)}
                        >
                          <div className="font-semibold text-gray-800 dark:text-gray-100 mb-1 flex items-center gap-2">
                            {todo.title}
                            {loadingId == todo.id.toString() && <span className="animate-spin ml-2 w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full"></span>}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{todo.due_date}</div>
                          <div className="flex gap-2 flex-wrap">
                            <span className="px-2 py-1 rounded text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200">
                              {todo.priority}
                            </span>
                            <span className="px-2 py-1 rounded text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                              {todo.status.replace("_", " ")}
                            </span>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
} 