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
  ) => {
    const systemSize = dailyKWH / peakSunHours;
    const panelCnt = Math.ceil(systemSize / (panelWattage / 1000));
    return { systemSize, panelCnt };
  };

  const monthlyKWH =
    globalState.energyEntries.reduce((total, next) => total + next.kWh, 0) /
    globalState.energyEntries.length;
  const dailyKWH = monthlyKWH / 30 || 0;
  const hourlyKWH = dailyKWH / 24 || 0;

  console.log("global state is");
  console.dir(globalState);
  return (
    <div className="text-left">
      <h2 className="my-4">Solar Panel Details</h2>
      <label>How many watts does the panel put out?</label>
      <br />
      <input
        defaultValue={panelWattage}
        onChange={(e) => setPanelWattage(Number(e.target.value))}
      ></input>
      <hr className="mt-8" />
      <h2 className="my-4">Results for your location</h2>
      <p>
        Average DNI: {globalState.LocationData.avg_dni}
        <span className="ml-4">
          Average GHI: {globalState.LocationData.avg_ghi}
        </span>
        <span className="ml-4">
          Average Lat Tilt: {globalState.LocationData.avg_lat_tilt}
        </span>
      </p>
      <h2 className="my-4">Final Calculations</h2>
      <p>Based on averages of your usage</p>
      <p>
        Monthly kWh: {monthlyKWH || 0}
        <span className="ml-4">Daily kWh: {dailyKWH}</span>
        <span className="ml-4">Hourly kWh: {hourlyKWH}</span>
      </p>
      <p>
        Panels Needed:{" "}
        {getSystemDetails(
          dailyKWH,
          globalState.LocationData.avg_dni,
          panelWattage
        ).panelCnt || 0}
      </p>
    </div>
  );
}

export default Calculations;
