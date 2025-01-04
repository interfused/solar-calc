import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react";
import App from "../App";

const changeInputs = (latitude: string, longitude: string) => {
  const form = screen.getByTestId("locationForm");
  const latitudeInput = screen.getByLabelText("latitude");
  const longitudeInput = screen.getByLabelText("longitude");

  fireEvent.change(latitudeInput, { target: { value: latitude } });
  fireEvent.change(longitudeInput, { target: { value: longitude } });
  fireEvent.submit(form); // Trigger the submit event on the form
};

beforeEach(() => {
  fetchMock.resetMocks(); // Reset previous mocks
  /*
  fetchMock.mockResponseOnce(
    JSON.stringify({
      outputs: {
        avg_dni: { annual: 4.74 },
        avg_ghi: { annual: 4.87 },
        avg_lat_tilt: { annual: 5.39 },
      },
    })
  );
  */
  // Mock the reset method to avoid errors in tests
  //HTMLFormElement.prototype.reset = jest.fn();
});
test("shows message if input missing", async () => {
  render(<App />);

  changeInputs("", "-81.480933");
  expect(screen.getByText(/Need to enter your location./i)).toBeInTheDocument();

  changeInputs("-81.480933", "");
  expect(screen.getByText(/Need to enter your location./i)).toBeInTheDocument();
});

test("gets values from API", async () => {
  render(<App />);

  fetchMock.mockResponseOnce(
    JSON.stringify({
      outputs: {
        avg_dni: { annual: 4.74 },
        avg_ghi: { annual: 4.87 },
        avg_lat_tilt: { annual: 5.39 },
      },
    })
  );

  // Simulate input change
  act(() => {
    changeInputs("28.703660", "-81.480933"); // Ensure changeInputs triggers a state update
  });

  // Wait for the API to resolve and the data to be rendered
  await waitFor(() => screen.findByText(/4.74/i));

  // Query for the element using your CSS selector
  let element = screen.getByTestId("averageDni");
  expect(element).toHaveTextContent("4.74");
  element = screen.getByTestId("averageGhi");
  expect(element).toHaveTextContent("4.87");
  element = screen.getByTestId("averageLatTilt");
  expect(element).toHaveTextContent("5.39");
});
