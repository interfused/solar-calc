import { useState, useEffect } from "react";
import { useGlobalState } from "../GlobalStateContext";

function LatLongForm() {
  const { globalState, setGlobalState } = useGlobalState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("LatLongForm: globalState updated:", globalState);
  }, [globalState]);

  const apiKey: string = "r4BtDeBjvePlUSnXziyCrRvrd2qS8vBICBSALZEg"; // Replace with your actual API key

  async function addLocationData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const latitude = parseFloat(formData.get("latitude") as string);
    const longitude = parseFloat(formData.get("longitude") as string);

    if (isNaN(latitude) || isNaN(longitude)) {
      console.error(
        "Invalid input. Please provide valid latitude and longitude."
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    const apiUrl = `https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=${apiKey}&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`API error: ${response.statusText}`);
      const data = await response.json();

      const newEntry = {
        latitude,
        longitude,
        avg_dni: data.outputs.avg_dni.annual,
        avg_ghi: data.outputs.avg_ghi.annual,
        avg_lat_tilt: data.outputs.avg_lat_tilt.annual,
      };

      setGlobalState((prevState) => ({
        ...prevState,
        LocationData: newEntry, // Update only LocationData
      }));
    } catch (err: any) {
      console.error("Error fetching location data:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }

    event.currentTarget.reset();
  }

  return (
    <>
      <h2 className="text-left">Where are you located?</h2>
      <form
        onSubmit={addLocationData}
        className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8"
      >
        <div className="sm:col-span-3 text-left">
          <label className="block text-sm/6 font-medium">Your Latitude</label>
          <input
            type="text"
            name="latitude"
            required
            defaultValue="28.703660"
            className="block w-full"
          />
        </div>
        <div className="sm:col-span-3 text-left">
          <label className="block text-sm/6 font-medium">Your Longitude</label>
          <input
            type="text"
            name="longitude"
            required
            defaultValue="-81.480933"
            className="block w-full"
          />
        </div>
        <div className="sm:col-span-2 text-left pt-6">
          <button type="submit" className="text-white bg-blue-500">
            Submit
          </button>
        </div>
      </form>
      <div className="text-left font-bold mt-2 text-red-500">
        {error}
        {isLoading ? "Loading..." : ""}
        {!globalState.LocationData.avg_dni && (
          <span>Need to enter your location.</span>
        )}
      </div>
    </>
  );
}

export default LatLongForm;
/*
export default () => (
  <GlobalStateProvider>
    <LatLongForm />
  </GlobalStateProvider>
);
*/
