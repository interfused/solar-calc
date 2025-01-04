import { render, screen } from "@testing-library/react";
import App from "../App";

test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the main page", () => {
  render(<App />);
  expect(true).toBeTruthy();
});

test("shows main header text", () => {
  render(<App />);
  const linkElement = screen.getByText(/Solar Panel Calculator/i); // Replace with actual text in your App
  expect(linkElement).toBeInTheDocument();
});
