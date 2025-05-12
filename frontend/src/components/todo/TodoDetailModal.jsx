import React from "react";
import dayjs from "dayjs";
import CategoryBadge from "../common/CategoryBadge";

export default function TodoDetailModal({ todo, onClose, onEdit, onDelete }) {
  if (!todo) return null;
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-lg w-full animate-fadeIn">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-gray-200/70 dark:bg-gray-700/70 text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors text-2xl font-bold"
        aria-label="Kapat"
      >
        ×
      </button>
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">{todo.title}</h2>
      <div className="mb-4 text-gray-600 dark:text-gray-300">{todo.description || <span className="italic text-gray-400">Açıklama yok</span>}</div>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 text-xs font-semibold">
          Durum: {todo.status.replace("_", " ")}
        </span>
        <span className="px-3 py-1 rounded bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-200 text-xs font-semibold">
          Öncelik: {todo.priority}
        </span>
        <span className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold">
          Teslim: {todo.due_date ? dayjs(todo.due_date).format("DD MMMM YYYY") : "-"}
        </span>
      </div>
      {todo.categories && todo.categories.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Kategoriler:</div>
          <div className="flex flex-wrap gap-2">
            {todo.categories.map((cat) => (
              <CategoryBadge key={cat.id} cat={cat} />
            ))}
          </div>
        </div>
      )}
      <div className="absolute right-8 bottom-8 flex gap-2">
        <button
          onClick={() => onEdit && onEdit(todo)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Düzenle
        </button>
        <button
          onClick={() => onDelete && onDelete(todo.id)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
        >
          Sil
        </button>
      </div>
    </div>
  );
} 