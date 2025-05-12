import { render, screen } from "@testing-library/react";
import TodoFilter from "../components/todo/TodoFilter";

test("TodoFilter arama kutusu render eder", () => {
  render(<TodoFilter filters={{}} categories={[]} onChange={() => {}} onApply={() => {}} />);
  expect(screen.getByPlaceholderText(/Ara/i)).toBeInTheDocument();
}); 