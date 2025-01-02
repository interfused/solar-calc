import { useEffect } from "react";
import { EnergyUsageEntry } from "../types/basicTypes";
import { useGlobalState } from "../GlobalStateContext";

function EnergyUsageForm() {
  const { globalState, setGlobalState } = useGlobalState();

  useEffect(() => {
    console.log("EnergyUsageForm: globalState updated:", globalState);
  }, [globalState]);

  function addToEnergyEntries(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const month = formData.get("month") as string;
    const kWh = parseFloat(formData.get("kWh") as string);

    if (!month || isNaN(kWh)) {
      console.error(
        "Invalid input. Please provide valid month and kWh values."
      );
      return;
    }

    const newEntry: EnergyUsageEntry = { month, kWh };

    setGlobalState((prevState) => ({
      ...prevState,
      energyEntries: [...prevState.energyEntries, newEntry], // Add new entry to energyEntries
    }));

    event.currentTarget.reset();
  }

  return (
    <form
      onSubmit={addToEnergyEntries}
      className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8"
    >
      <div className="sm:col-span-3 text-left">
        <label className="block text-sm/6 font-medium">Month</label>
        <input type="text" name="month" required className="block w-full" />
      </div>
      <div className="sm:col-span-3 text-left">
        <label className="block text-sm/6 font-medium">kWh Used</label>
        <input type="text" name="kWh" required className="block w-full" />
      </div>
      <div className="sm:col-span-2 text-left pt-6">
        <button type="submit" className="text-white bg-blue-500">
          Add
        </button>
      </div>
    </form>
  );
}

export default EnergyUsageForm;
