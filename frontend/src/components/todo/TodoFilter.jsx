import { useState } from "react";

export default function TodoFilter({ filters, categories, onChange, onApply }) {
  const handleApply = () => {
    onApply(filters);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {/* Arama Kutusu */}
      <input
        type="text"
        placeholder="Ara..."
        value={filters.q}
        onChange={(e) => {
          const newFilters = { ...filters, q: e.target.value };
          onChange(newFilters);
          if (onApply) onApply(newFilters);
        }}
        className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
      />

      {/* Sıralama */}
      <select
        value={filters.sort}
        onChange={(e) => onChange({ ...filters, sort: e.target.value })}
        className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
      >
        <option value="created_at">Oluşturulma Tarihi</option>
        <option value="due_date">Teslim Tarihi</option>
        <option value="priority">Öncelik</option>
      </select>

      <select
        value={filters.order}
        onChange={(e) => onChange({ ...filters, order: e.target.value })}
        className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
      >
        <option value="desc">Azalan</option>
        <option value="asc">Artan</option>
      </select>

      {/* Diğer filtreler (status / priority / category) */}
      <select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
        className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
      >
        <option value="">Durum</option>
        <option value="pending">pending</option>
        <option value="in_progress">in_progress</option>
        <option value="completed">completed</option>
        <option value="cancelled">cancelled</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) => onChange({ ...filters, priority: e.target.value })}
        className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
      >
        <option value="">Öncelik</option>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>

      <select
        value={filters.category_id}
        onChange={(e) => onChange({ ...filters, category_id: e.target.value })}
        className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
      >
        <option value="">Kategori</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleApply}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Uygula
      </button>
    </div>
  );
}
