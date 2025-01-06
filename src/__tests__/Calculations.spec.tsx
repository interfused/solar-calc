import { createRoutesStub } from "react-router";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // Ensure this is imported if not set globally
import { act } from "react";
import App from "../App";

const changeLatLong = (latitude: string, longitude: string) => {
  const form = screen.getByTestId("locationForm");
  const latitudeInput = screen.getByLabelText("latitude");
  const longitudeInput = screen.getByLabelText("longitude");

  fireEvent.change(latitudeInput, { target: { value: latitude } });
  fireEvent.change(longitudeInput, { target: { value: longitude } });
  fireEvent.submit(form); // Trigger the submit event on the form
};

const addUsage = (month: string, kWh: string) => {
  const form = screen.getByTestId("energyEntryForm");
  const input = screen.getByTestId("kWhEntry");
  const select = screen.getByLabelText("month");

  fireEvent.change(select, { target: { value: month } });
  fireEvent.change(input, { target: { value: kWh } });
  fireEvent.submit(form); // Trigger the submit event on the form
};
let Stub: any;

beforeAll(() => {
  // Initialize the route stub once for all tests
  Stub = createRoutesStub([
    {
      path: "/",
      Component: App,
    },
  ]);
});

describe("Panel inputs affect calculations", () => {
  it("see it in final calculations", async () => {
    // Render the app
    await act(async () => {
      render(<Stub initialEntries={["/"]} />);
    });
    // Set latitude and longitude
    changeLatLong("28.703660", "-81.480933");
    addUsage("January", "1612");
    // Wait for initial dailyKwh calculation
    await waitFor(() => {
      expect(screen.getByText("53.73")).toBeInTheDocument();
      //let screenVal = screen.getByText(/Panels Needed 29/i); // Replace with actual text in your App
      //expect(metric1).toBeInTheDocument();
    });

    // Fill in panel details
    const panelWattageInput = screen.getByLabelText("panelWattage");
    const panelLength = screen.getByLabelText("panelLength");
    const panelWidth = screen.getByLabelText("panelWidth");

    await act(async () => {
      fireEvent.change(panelWattageInput, { target: { value: 400 } });
      fireEvent.change(panelLength, { target: { value: 4 } });
      fireEvent.change(panelWidth, { target: { value: 5 } });
    });

    /*
    await waitFor(() => {
      expect(screen.getByText("29")).toBeInTheDocument();
      //let screenVal = screen.getByText(/Panels Needed 29/i); // Replace with actual text in your App
      //expect(metric1).toBeInTheDocument();
    });
    */
  });
});
