import EnergyUsageForm from "./EnergyUsageForm";
import { useGlobalState } from "../GlobalStateContext";

function EnergyUsage() {
  const { globalState } = useGlobalState();
  console.log("global state is");
  console.dir(globalState);
  return (
    <>
      <h2 className="text-left mt-8">Enter your energy usage</h2>
      <EnergyUsageForm />

      {!globalState.energyEntries.length && (
        <div className="text-left mt-2 font-bold text-red-500">
          Need to enter some energy usage.
        </div>
      )}
    </>
  );
}

export default EnergyUsage;
