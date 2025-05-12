import { useState, useCallback } from "react";
import * as TodoAPI from "../api/todoApi";

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoad] = useState(false);

  const list = useCallback(async (params = {}) => {
    setLoad(true);
    const { data } = await TodoAPI.fetchTodos(params);
    setTodos(data.data);
    setMeta(data.meta.pagination);
    setLoad(false);
  }, []);

  const search = useCallback(async (q, params = {}) => {
    setLoad(true);
    const { data } = await TodoAPI.searchTodos(q, params);
    setTodos(data.data);
    setMeta(data.meta?.pagination ?? null);
    setLoad(false);
  }, []);

  return { todos, meta, loading, list, search, ...TodoAPI };
}
