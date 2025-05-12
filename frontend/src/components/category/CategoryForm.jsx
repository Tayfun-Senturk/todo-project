import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function CategoryForm({ initialValues, onSubmit, onCancel }) {
  const validationSchema = Yup.object({
    name: Yup.string().required("Kategori adı zorunlu").min(2).max(30),
    color: Yup.string().required("Renk seçiniz"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      await onSubmit(values);
      toast.success("Kategori başarıyla eklendi/güncellendi!");
    } catch (err) {
      toast.error("Kategori eklenirken/güncellenirken hata oluştu!");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Kategori</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Ad</label>
            <Field name="name" className="border border-gray-300 dark:border-gray-700 w-full px-2 py-1 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100" />
            <ErrorMessage name="name" component="div" className="text-sm text-red-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Renk</label>
            <Field name="color" type="color" className="w-16 h-8 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onCancel} className="px-4 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">İptal</button>
            <button type="submit" className="px-4 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition">Kaydet</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
