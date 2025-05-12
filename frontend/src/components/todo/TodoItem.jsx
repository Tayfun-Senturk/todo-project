import CategoryBadge from "../common/CategoryBadge";

const statusColors = {
  pending: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
  in_progress: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
  completed: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
  cancelled: "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300",
};

const priorityColors = {
  low: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
  medium: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
  high: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
};

export default function TodoItem({ todo, onEdit, onDelete, onDetail }) {
  return (
    <li
      className="bg-white dark:bg-gray-800 shadow p-4 rounded flex justify-between items-start hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
    >
      <div onClick={() => onDetail && onDetail(todo)} className="flex-1 cursor-pointer">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{todo.title}</h3>

        <p className="text-sm flex gap-2 mt-1">
          <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[todo.status]}`}>
            {todo.status.replace("_", " ")}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[todo.priority]}`}>
            {todo.priority}
          </span>
        </p>

        {(todo.categories ?? []).length > 0 && (
          <div className="flex flex-wrap mt-1">
            {(todo.categories ?? []).map((cat) => (
              <CategoryBadge key={cat.id} cat={cat} />
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
