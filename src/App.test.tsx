import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

test("renders", () => {
  render(<App />);
  const submit = screen.getByText(/Submit/i);
  expect(submit).toBeInTheDocument();
});
