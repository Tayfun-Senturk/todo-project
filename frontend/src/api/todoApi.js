import api from "./axios";

export const fetchTodos     = (params)      => api.get("/todos",   { params });
export const createTodo     = (payload)     => api.post("/todos",  payload);
export const updateTodo     = (id, payload) => api.put(`/todos/${id}`, payload);
export const deleteTodo     = (id)          => api.delete(`/todos/${id}`);
export const patchStatus    = (id, status)  => api.patch(`/todos/${id}/status`, { status });
export const searchTodos = (q, params = {}) =>
  api.get("/todos/search", { params: { q, ...params } });

