import { render, screen } from "@testing-library/react";
import TodoItem from "../components/todo/TodoItem";

test("TodoItem başlık render eder", () => {
  render(<TodoItem todo={{ id: 1, title: "Test Todo", status: "pending", priority: "medium", categories: [] }} />);
  expect(screen.getByText(/Test Todo/i)).toBeInTheDocument();
}); 