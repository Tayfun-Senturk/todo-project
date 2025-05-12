import { useState, useEffect } from "react";
import { fetchTodoStats } from "../api/statsApi";
import { fetchCategoriesStats } from "../api/categoryApi";
    

export default function useStats() {
  const [stats, setStats] = useState(null);
  const [catStats, setCatStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchTodoStats(), fetchCategoriesStats()])
      .then(([todoRes, catRes]) => {
        setStats(todoRes.data.data);
        setCatStats(catRes.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { stats, catStats, loading };
}
