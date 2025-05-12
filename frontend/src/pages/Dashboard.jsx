import { useEffect } from "react";
import useStats from "../hooks/useStats";
import useTodos from "../hooks/useTodos";
import dayjs from "dayjs";

export default function Dashboard() {
  const { stats, loading } = useStats();
  const { todos, list } = useTodos();

  useEffect(() => {
    list();
  }, []);

  const upcoming = todos.filter(todo =>
    dayjs(todo.due_date).isAfter(dayjs()) &&
    dayjs(todo.due_date).diff(dayjs(), 'day') <= 7
  );

  if (loading || !stats) return <p className="p-4 text-gray-800 dark:text-gray-200">Yükleniyor...</p>;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded text-center">
          <div className="uppercase text-xs text-gray-500 dark:text-gray-400">Toplam</div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white">{stats.total}</div>
        </div>
        {stats.status_counts.map(s => (
          <div key={s.status} className="bg-white dark:bg-gray-800 shadow p-4 rounded text-center">
            <div className="uppercase text-xs text-gray-500 dark:text-gray-400">{s.status.replace("_", " ")}</div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white">{s.count}</div>
          </div>
        ))}
      </div>


      <div>
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Önceliklere Göre Dağılım</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.priority_counts.map(p => (
            <div key={p.priority} className="bg-white dark:bg-gray-800 shadow p-4 rounded text-center">
              <div className="uppercase text-xs text-gray-500 dark:text-gray-400">{p.priority}</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">{p.count}</div>
            </div>
          ))}
        </div>
      </div>


      {stats.catStats && stats.catStats.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Kategorilere Göre Görev Dağılımı</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stats.catStats.map(cat => (
              <div key={cat.id} className="bg-white shadow p-4 rounded text-center">
                <div
                  className="text-sm font-medium mb-1"
                  style={{ backgroundColor: cat.color, color: "#fff", borderRadius: "8px", padding: "4px" }}
                >
                  {cat.name}
                </div>
                <div className="text-2xl font-bold">{cat.todos_count}</div>
              </div>
            ))}
          </div>
        </div>
      )}


      <div>
        <h2 className="text-xl font-semibold mb-2">Yaklaşan Todo'lar (7 gün içinde)</h2>
        {upcoming.length === 0 ? (
          <p className="text-sm text-gray-400">Yaklaşan görev yok.</p>
        ) : (
          <ul className="space-y-2">
            {upcoming.map(t => (
              <li key={t.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded shadow-sm">
                <div className="font-medium">{t.title}</div>
                <div className="text-sm text-gray-500">{dayjs(t.due_date).format("DD MMMM YYYY")}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
