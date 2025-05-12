import api from "./axios";
export const fetchTodoStats = () => api.get("/stats/todos");
