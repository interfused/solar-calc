import "../App.css";
import { AppNav } from "../layout/AppNav";
import { useGlobalState } from "../GlobalStateContext"; // Import GlobalStateProvider
import { useState } from "react";
import EnergyUsage from "../electricity-usage/EnergyUsage";
import LatLongForm from "../electricity-usage/LatLongForm";
import UsageTable from "../electricity-usage/UsageTable";

export function Settings() {
  const { globalState } = useGlobalState();

  const [panelWattage, setPanelWattage] = useState(350);
  const [panelWidth, setPanelWidth] = useState(0);
  const [panelLength, setPanelLength] = useState(0);
  return (
    <>
      <AppNav></AppNav>
      <div className="max-w-screen-xl mx-auto p-4">
        <h2 className="mb-4">Settings </h2>
        <div>
          <h2 className="mt-8 mb-4">Solar Panel Details</h2>
          <label htmlFor="panelWattage">Wattage (W):</label>
          <input
            id="panelWattage"
            aria-label="panelWattage"
            type="number"
            defaultValue={panelWattage}
            onChange={(e) => setPanelWattage(Number(e.target.value))}
            className="border p-2 mt-2 ml-2"
          />

          <label htmlFor="panelLength" className="ml-4">
            Length (feet):
          </label>
          <input
            id="panelLength"
            aria-label="panelLength"
            type="number"
            defaultValue={panelLength}
            onChange={(e) => setPanelLength(Number(e.target.value))}
            className="border p-2 mt-2 ml-2"
          />

          <label htmlFor="panelWidth" className="ml-4">
            Width (feet):
          </label>
          <input
            id="panelWidth"
            aria-label="panelWidth"
            type="number"
            defaultValue={panelWidth}
            onChange={(e) => setPanelWidth(Number(e.target.value))}
            className="border p-2 mt-2 ml-2"
          />
        </div>

        <div className="my-4">
          <LatLongForm />
        </div>

        <EnergyUsage />
        {globalState.energyEntries.length > 0 && <UsageTable />}
      </div>
    </>
  );
}

export default Settings;
