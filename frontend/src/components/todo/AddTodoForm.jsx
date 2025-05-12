import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const AddTodoForm = ({ onAdded, onClose }) => {
  const initialValues = {
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    due_date: "",
    category_ids: [],
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.error("Kategoriler alınamadı:", err);
        toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      });
  }, []); 

  const validationSchema = Yup.object({
    title: Yup.string().required("Başlık zorunlu").min(3).max(100),
    description: Yup.string().max(500),
    status: Yup.string().oneOf(["pending", "in_progress", "completed", "cancelled"]),
    priority: Yup.string().oneOf(["low", "medium", "high"]),
    due_date: Yup.date()
  .nullable()
  .min(new Date(), "Tarih bugünden sonra olmalı"),

  });

  const onSubmit = (values, { resetForm }) => {
    axios
      .post("http://localhost:8000/api/todos", values)
      .then((res) => {
        toast.success("Todo başarıyla eklendi!");
        console.log(values);
        resetForm();
        setTimeout(() => {
          if (onAdded) onAdded();
        }, 150);
      })
      .catch((err) => {
        console.error("Todo eklenirken hata:", err);
        toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      });
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 p-6 rounded shadow max-w-md mx-auto mt-8">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl font-bold"
          aria-label="Kapat"
        >
          ×
        </button>
      )}
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Yeni Todo Ekle</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values, helpers) => {
        onSubmit(values, helpers);
        if (onClose) onClose();
      }}>
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

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mt-4"
          >
            Ekle
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddTodoForm;
