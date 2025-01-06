import { createRoutesStub } from "react-router";
import { render, screen } from "@testing-library/react";
import App from "../App";

let Stub;

beforeAll(() => {
  // Initialize the route stub once for all tests
  Stub = createRoutesStub([
    {
      path: "/",
      Component: App,
    },
  ]);
});

/*
test("demo", () => {
  expect(true).toBe(true);
});
*/

test("Renders the main page", () => {
  // render the app stub at "/"
  render(<Stub initialEntries={["/"]} />);
  expect(true).toBeTruthy();
});

test("shows main header text", () => {
  // render the app stub at "/"
  render(<Stub initialEntries={["/"]} />);
  const linkElement = screen.getByText(/Solar Panel Calculator/i); // Replace with actual text in your App
  expect(linkElement).toBeInTheDocument();
});
