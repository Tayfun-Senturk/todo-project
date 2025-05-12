import { useState, useEffect } from "react";
import useCategories from "../hooks/useCategories";
import CategoryList from "../components/category/CategoryList";
import CategoryForm from "../components/category/CategoryForm";
import { toast } from "react-toastify";

export default function CategoryPage() {
  const { cats, list, createCategory, updateCategory, deleteCategory } = useCategories();
  const [editing, setEditing] = useState(null);
  const [isNew, setIsNew] = useState(true);   

  useEffect(() => {
    list();
  }, []);

  const handleSubmit = async (values) => {
    try {
      if (isNew) {
        await createCategory(values);
        toast.success("Kategori eklendi!");
      } else {
        await updateCategory(editing.id, values);
        toast.success("Kategori güncellendi!");
      }
      setEditing(null);
      list();
    } catch {
      toast.error("İşlem başarısız");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu kategori silinsin mi?")) return;
    try {
      await deleteCategory(id);
      toast.success("Silindi!");
      list();
    } catch {
      toast.error("Silme başarısız!");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Kategori Yönetimi</h1>

      <button
        onClick={() => {
          setEditing({ name: "", color: "#000000" });
          setIsNew(true);
        }}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Yeni Kategori
      </button>

      <CategoryList categories={cats} onEdit={(cat) => { setEditing(cat); setIsNew(false); }} onDelete={handleDelete} />

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <CategoryForm
            initialValues={editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}
    </div>
  );
}
