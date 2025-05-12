import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
const EditTodoForm = ({ todo, onClose, onUpdated }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error("Kategori çekilemedi:", err));
  }, []);

  const validationSchema = Yup.object({
    title: Yup.string().required("Başlık gerekli").min(3).max(100),
    description: Yup.string().max(500),
    status: Yup.string().oneOf(["pending", "in_progress", "completed", "cancelled"]),
    priority: Yup.string().oneOf(["low", "medium", "high"]),
    due_date: Yup.date()
  .nullable()
  .min(new Date(), "Tarih bugünden sonra olmalı"),

  });

  const initialValues = {
    title: todo.title || "",
    description: todo.description || "",
    status: todo.status || "pending",
    priority: todo.priority || "medium",
    due_date: todo.due_date?.slice(0, 10) || "",
    category_ids: todo.categories?.map((cat) => cat.id) || [],
  };

  const onSubmit = (values) => {
    axios
      .put(`http://localhost:8000/api/todos/${todo.id}`, values)
      .then(() => {
        toast.success("Todo güncellendi!");
        onUpdated();
        onClose();
      })
      .catch((err) => {
        console.error("Güncelleme hatası:", err);
        toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-md mx-auto mt-8 border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Todo Düzenle</h3>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Başlık</label>
            <Field
              name="title"
              className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Açıklama</label>
            <Field
              name="description"
              as="textarea"
              className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Durum</label>
            <Field
              name="status"
              as="select"
              className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            >
              <option value="pending">pending</option>
              <option value="in_progress">in_progress</option>
              <option value="completed">completed</option>
              <option value="cancelled">cancelled</option>
            </Field>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Öncelik</label>
            <Field
              name="priority"
              as="select"
              className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </Field>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Teslim Tarihi</label>
            <Field
              name="due_date"
              type="date"
              className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Kategoriler</label>
            <Field
              name="category_ids"
              as="select"
              multiple
              className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Field>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Kaydet
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              İptal
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditTodoForm;
