import { useState } from "react";
import EnergyUsageForm from "./EnergyUsageForm";
import { GlobalStateProvider, useGlobalState } from "../GlobalStateContext";

function EnergyUsage() {
  const [count, setCount] = useState(0);
  const { globalState } = useGlobalState();
  console.log("global state is");
  console.dir(globalState);
  return (
    <>
      <h2 className="text-left">Enter your energy usage</h2>
      <EnergyUsageForm />

      <div className="mt-4">
        {globalState.energyEntries.map((el, index) => {
          return (
            <div key={"idx" + index} className="text-left">
              Month: {el.month} <span className="ml-4">kWh: {el.kWh}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default EnergyUsage;
