import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
beforeEach(() => {
  fetchMock.resetMocks(); // Reset previous mocks
  fetchMock.mockResponseOnce(
    JSON.stringify({
      outputs: {
        avg_dni: { annual: 4.74 },
        avg_ghi: { annual: 5.25 },
        avg_lat_tilt: { annual: 22 },
      },
    })
  );

  // Mock the reset method to avoid errors in tests
  //HTMLFormElement.prototype.reset = jest.fn();
});

test("shows Average DNI: text", () => {
  render(<App />);
  const basicText = screen.getByText(/Average DNI:/i); // Replace with actual text in your App
  expect(basicText).toBeInTheDocument();
});

test("gets values from API", async () => {
  render(<App />);
  const form = screen.getByTestId("locationForm");
  fireEvent.submit(form); // Trigger the submit event on the form

  // Wait for the fetch to resolve and the data to be rendered
  await waitFor(() => screen.findByText(/4.74/i));

  // Assert that the fetched data is displayed
  const dniValue = screen.getByText(/4.74/i);
  expect(dniValue).toBeInTheDocument();
});
