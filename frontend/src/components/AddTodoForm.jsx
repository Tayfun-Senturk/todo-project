import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddTodoForm = () => {
  const initialValues = {
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    due_date: "",
    category_ids: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Başlık zorunlu").min(3).max(100),
    description: Yup.string().max(500),
    status: Yup.string().oneOf(["pending", "in_progress", "completed", "cancelled"]),
    priority: Yup.string().oneOf(["low", "medium", "high"]),
    due_date: Yup.date().nullable(),
  });

  const onSubmit = (values, { resetForm }) => {
    axios
      .post("http://localhost:8000/api/todos", values)
      .then((res) => {
        alert("Todo eklendi!");
        resetForm();
      })
      .catch((err) => {
        console.error("Todo eklenirken hata:", err);
      });
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "500px" }}>
      <h2>Yeni Todo Ekle</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div>
            <label>Başlık</label>
            <Field name="title" />
            <ErrorMessage name="title" component="div" style={{ color: "red" }} />
          </div>

          <div>
            <label>Açıklama</label>
            <Field name="description" as="textarea" />
          </div>

          <div>
            <label>Durum</label>
            <Field name="status" as="select">
              <option value="pending">pending</option>
              <option value="in_progress">in_progress</option>
              <option value="completed">completed</option>
              <option value="cancelled">cancelled</option>
            </Field>
          </div>

          <div>
            <label>Öncelik</label>
            <Field name="priority" as="select">
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </Field>
          </div>

          <div>
            <label>Teslim Tarihi</label>
            <Field name="due_date" type="date" />
          </div>

          <button type="submit" style={{ marginTop: "1rem" }}>Ekle</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddTodoForm;
