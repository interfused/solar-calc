import { useState } from "react";
import { useGlobalState } from "../GlobalStateContext";
import Metric from "./Metric";

interface EnergyEntry {
  month: string;
  kWh: number;
}

export function getFormattedNumberString(n: number) {
  if (Number.isInteger(n)) {
    return n.toString();
  }
  return n.toFixed(2);
}

export function Calculations() {
  const [panelWattage, setPanelWattage] = useState(350);
  const { globalState } = useGlobalState();

  const getTableContents = (entries: EnergyEntry[]) => {
    if (!entries.length) {
      return <span>No energy entries available. Please add some data.</span>;
    }

    return (
      <>
        <h2 className="font-bold mt-8">Energy Usage History</h2>
        <table className="w-full border border-gray-200 mt-4">
          <thead>
            <tr>
              <th>Month</th>
              <th>kWh</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.month}</td>
                <td>{entry.kWh}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  const getSystemDetails = (
    dailyKWH: number,
    peakSunHours: number,
    panelWattage: number
  ) => {
    if (!globalState.LocationData.avg_dni) {
      return { systemSize: 0, panelCnt: 0 };
    }
    const systemSize = dailyKWH / peakSunHours;
    const panelCnt = Math.ceil(systemSize / (panelWattage / 1000));
    return { systemSize, panelCnt };
  };

  const monthlyKWH =
    globalState.energyEntries.reduce(
      (total: number, next: EnergyEntry) => total + next.kWh,
      0
    ) / globalState.energyEntries.length || 0;

  let dailyKWH = monthlyKWH ? monthlyKWH / 30 : 0;

  const hourlyKWH = monthlyKWH ? dailyKWH / 24 : 0;
  const { panelCnt, systemSize } = getSystemDetails(
    dailyKWH,
    globalState.LocationData.avg_dni,
    panelWattage
  );

  return (
    <div className="text-left">
      <h2 className="mt-8 mb-4">Solar Panel Details</h2>
      <label htmlFor="panelWattage">Panel Wattage (W):</label>
      <input
        id="panelWattage"
        type="number"
        defaultValue={panelWattage}
        onChange={(e) => setPanelWattage(Number(e.target.value))}
        className="border p-2 mt-2 ml-2"
      />

      <div className="md:grid md:grid-cols-2 md:gap-4 mt-8">
        <div className="bg-gray-100 p-4 border border-solid border-gray-200 bg-gray-50">
          <h2 className="mb-4">Results for Your Location</h2>
          <p>
            <span data-testid="averageDni">
              <strong>Average DNI:</strong> {globalState.LocationData.avg_dni}
            </span>
            <span className="ml-4" data-testid="averageGhi">
              <strong>Average GHI:</strong> {globalState.LocationData.avg_ghi}
            </span>
            <span className="ml-4" data-testid="averageLatTilt">
              <strong>Average Lat Tilt:</strong>{" "}
              {globalState.LocationData.avg_lat_tilt}
            </span>
          </p>
          <div className="mt-4">
            {getTableContents(globalState.energyEntries)}
          </div>
        </div>

        <div className="bg-white p-4">
          <h2 className="mb-4">Final Calculations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {[
              {
                header: "Monthly kWh",
                value: getFormattedNumberString(monthlyKWH),
              },
              {
                header: "Daily kWh",
                value: getFormattedNumberString(dailyKWH),
                bgColor: "yellow",
              },
              {
                header: "Hourly kWh",
                value: getFormattedNumberString(hourlyKWH),
              },
              { header: "Panels Needed", value: panelCnt, bgColor: "blue" },
              {
                header: "System Size (kW)",
                value: getFormattedNumberString(systemSize),
                bgColor: "blue",
              },
            ].map((metric, index) => (
              <Metric
                key={index}
                displayHeader={metric.header}
                displayValue={metric.value}
                bgColor={metric.bgColor}
              />
            ))}
          </div>
          <p className="text-sm mt-4">Based on averages of your usage.</p>
        </div>
      </div>
    </div>
  );
}

//export default Calculations;
