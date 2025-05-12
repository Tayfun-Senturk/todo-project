import { useState, useCallback } from "react";
import * as CatAPI from "../api/categoryApi";

export default function useCategories() {
  const [cats, setCats]    = useState([]);
  const [loading, setLoad] = useState(false);

  const list = useCallback(async () => {
    setLoad(true); const { data } = await CatAPI.fetchCategories();
    setCats(data.data); setLoad(false);
  }, []);

  return { cats, loading, list, ...CatAPI };
}
