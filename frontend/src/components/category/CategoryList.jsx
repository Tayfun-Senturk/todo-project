import { toast } from "react-toastify";

export default function CategoryList({ categories, onEdit, onDelete }) {
    const handleDelete = async (id) => {
        try {
            await onDelete(id);
            toast.success("Kategori başarıyla silindi!");
        } catch (err) {
            toast.error("Kategori silinirken hata oluştu!");
        }
    };
    return (
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-left text-gray-800 dark:text-gray-200">
            <th className="p-2">Ad</th>
            <th className="p-2">Renk</th>
            <th className="p-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id} className="border-t bg-white dark:bg-gray-900">
              <td className="p-2">{cat.name}</td>
              <td className="p-2">
                <span style={{
                  backgroundColor: cat.color,
                  color: "#fff",
                  padding: "2px 8px",
                  borderRadius: "8px"
                }}>
                  {cat.color}
                </span>
              </td>
              <td className="p-2 space-x-2">
                <button onClick={() => onEdit(cat)} className="bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-100 hover:bg-blue-700 dark:hover:bg-blue-400 px-3 py-1 rounded transition">Düzenle</button>
                <button onClick={() => handleDelete(cat.id)} className="bg-red-600 dark:bg-red-500 text-white dark:text-gray-100 hover:bg-red-700 dark:hover:bg-red-400 px-3 py-1 rounded transition">Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  