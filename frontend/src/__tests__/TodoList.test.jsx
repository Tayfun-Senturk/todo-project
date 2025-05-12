import { render, screen } from "@testing-library/react";
import TodoList from "../components/todo/TodoList";

test("TodoList boşken 'Kayıt yok' mesajı gösterir", () => {
  render(<TodoList todos={[]} />);
  expect(screen.getByText(/Kayıt yok/i)).toBeInTheDocument();
}); 