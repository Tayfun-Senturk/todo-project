import api from "./axios";

export const fetchCategories = ()                 => api.get("/categories");
export const createCategory  = (payload)          => api.post("/categories", payload);
export const updateCategory  = (id, payload)      => api.put(`/categories/${id}`, payload);
export const deleteCategory  = (id)               => api.delete(`/categories/${id}`);
export const todosByCategory = (id, params = {}) => api.get(`/categories/${id}/todos`, { params });
export const fetchCategoriesStats = () => api.get("/stats/categories");
