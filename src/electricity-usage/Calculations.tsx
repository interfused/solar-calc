/*
REFERENCES:
https://www.solar.com/learn/how-much-is-a-solar-system-for-a-2000-sq-ft-house/
*/
import { useState } from "react";

import { useGlobalState } from "../GlobalStateContext";

function Calculations() {
  //  const [count, setCount] = useState(0);
  const [panelWattage, setPanelWattage] = useState(350);
  const { globalState } = useGlobalState();

  const getSystemDetails = (
    dailyKWH: number,
    peakSunHours: number,
    panelWattage: number
  ): number => {
    if (!globalState.LocationData.avg_dni) {
      return 0;
    }
    const systemSize = dailyKWH / peakSunHours;
    const panelCnt = Math.ceil(systemSize / (panelWattage / 1000));
    return panelCnt;
  };

  const monthlyKWH =
    globalState.energyEntries.reduce((total, next) => total + next.kWh, 0) /
    globalState.energyEntries.length;
  const dailyKWH = Math.ceil(monthlyKWH / 30) || 0;
  const hourlyKWH = Math.ceil(dailyKWH / 24) || 0;

  return (
    <div className="text-left">
      <h2 className="mt-8 mb-4">Solar Panel Details</h2>
      <label>How many watts does the panel put out?</label>
      <br />
      <input
        defaultValue={panelWattage}
        onChange={(e) => setPanelWattage(Number(e.target.value))}
      ></input>
      <hr className="mt-8" />

      <div className="md:grid md:grid-cols-2 md:gap-4">
        <div className="bg-gray-100 p-4">
          <h2 className="mb-4">Results for your location</h2>
          <p>
            Average DNI: {globalState.LocationData.avg_dni}
            <span className="ml-4">
              Average GHI: {globalState.LocationData.avg_ghi}
            </span>
            <span className="ml-4">
              Average Lat Tilt: {globalState.LocationData.avg_lat_tilt}
            </span>
          </p>
          <div className="mt-4">
            {globalState.energyEntries.map((el, index) => {
              return (
                <div key={"idx" + index} className="text-left">
                  Month: {el.month} <span className="ml-4">kWh: {el.kWh}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-4">
          <h2 className="mb-4">Final Calculations</h2>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center bg-yellow-100 p-4">
              <p>Monthly kWh:</p>
              <p className="text-xl font-bold">{monthlyKWH || 0}</p>
            </div>

            <div className="text-center bg-yellow-100 p-4">
              <p>Daily kWh:</p>
              <p className="text-xl font-bold">{dailyKWH}</p>
            </div>

            <div className="text-center bg-yellow-100 p-4">
              <p>Hourly kWh:</p>
              <p className="text-xl font-bold">{hourlyKWH}</p>
            </div>

            <div className="text-center bg-blue-100 p-4">
              <p>Panels Needed:</p>
              <p className="text-xl font-bold">
                {getSystemDetails(
                  dailyKWH,
                  globalState.LocationData.avg_dni,
                  panelWattage
                ) || 0}
              </p>
            </div>
          </div>

          <p className="text-sm mt-4">Based on averages of your usage.</p>
        </div>
      </div>
    </div>
  );
}

export default Calculations;
