import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

const changeInputs = (month: string, kWh: string) => {
  const form = screen.getByTestId("energyEntryForm");
  const input = screen.getByTestId("kWhEntry");
  const select = screen.getByLabelText("month");

  fireEvent.change(select, { target: { value: month } });
  fireEvent.change(input, { target: { value: kWh } });
  fireEvent.submit(form); // Trigger the submit event on the form
};

describe("Energy input affects daily kWh", () => {
  test("see it in final calculations", async () => {
    render(<App />);
    changeInputs("January", "1612");

    // Assert that the fetched data is displayed
    let dailyKwh = screen.getByText("53.73");
    expect(dailyKwh).toBeInTheDocument();

    changeInputs("February", "2042");
    dailyKwh = screen.getByText("60.90");
    expect(dailyKwh).toBeInTheDocument();
  });
});
