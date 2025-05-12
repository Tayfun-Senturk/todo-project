import Navbar from "./components/common/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import AppRouter from "./AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-200">
        <div className="max-w-5xl mx-auto p-4">
          <Navbar />
          <AppRouter />
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </ThemeProvider>
  );
}
export default App;
