import { createRoutesStub } from "react-router";
import { render, screen } from "@testing-library/react";
import Glossary from "../pages/Glossary";

test("Basic text shows", async () => {
  const Stub = createRoutesStub([
    {
      path: "/glossary",
      Component: Glossary,
    },
  ]);

  // render the app stub at "/glossary"
  render(<Stub initialEntries={["/glossary"]} />);
  const termElement = screen.getByText("Average DNI");
  expect(termElement).toBeInTheDocument();

  const termDefinition = screen.getByText("Average Direct Normal Irradiance");
  expect(termDefinition).toBeInTheDocument();
});
