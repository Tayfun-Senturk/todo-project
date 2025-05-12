import TodoItem from "./TodoItem";

export default function TodoList({ todos, onEdit, onDelete, onDetail }) {
  if (todos.length === 0) return <p className="text-gray-400">Kayıt yok.</p>;
  return (
    <ul className="space-y-4 mt-6 pl-0">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onEdit={onEdit}
          onDelete={onDelete}
          onDetail={onDetail}
        />
      ))}
    </ul>
  );
}
