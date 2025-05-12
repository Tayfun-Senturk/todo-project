import { Routes, Route, Navigate } from "react-router-dom";
import TodoListPage from "./pages/TodoListPage";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/todos" />} />
      <Route path="/todos" element={<TodoListPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/categories" element={<CategoryPage />} />
      <Route path="*" element={<div className="p-4">404 - Sayfa bulunamadi</div>} />
    </Routes>
  );
};

export default AppRouter;
