import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg transition-all duration-200 ${
    isActive 
      ? "bg-indigo-600 text-white shadow-md" 
      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
  }`;

export default function Navbar() {
  const { dark, toggle } = useTheme();

  return (
    <nav className="flex items-center justify-between mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-all duration-300">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-300">Todo App</h1>
      <div className="flex gap-3 items-center">
        <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/todos" className={linkClass}>Todos</NavLink>
        <NavLink to="/categories" className={linkClass}>Kategoriler</NavLink>
        <div
          onClick={toggle}
          className={`w-14 h-7 flex items-center rounded-full cursor-pointer transition-colors duration-300 px-1 ${dark ? 'bg-indigo-600 justify-end' : 'bg-gray-200 justify-start'}`}
        >
          <div className="bg-white w-5 h-5 rounded-full shadow-md transition-all duration-300" />
        </div>
      </div>
    </nav>
  );
}
