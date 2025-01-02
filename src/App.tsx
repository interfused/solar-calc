//import { useState } from "react";
import "./App.css";
import EnergyUsage from "./electricity-usage/EnergyUsage";
import { GlobalStateProvider } from "./GlobalStateContext"; // Import GlobalStateProvider
import LatLongForm from "./electricity-usage/LatLongForm";
import Calculations from "./electricity-usage/Calculations";

function App() {
  //  const [count, setCount] = useState(0);

  return (
    <GlobalStateProvider>
      <>
        <div className="flex items-center bg-blue-500 text-white">
          <div className="flex-none w-24 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </div>
          <div className="flex-auto">
            <h1 className="font-bold">Solar Panel Calculator</h1>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto">
          <div className="my-4">
            <LatLongForm></LatLongForm>
          </div>

          <EnergyUsage></EnergyUsage>

          <Calculations></Calculations>
        </div>
      </>
    </GlobalStateProvider>
  );
}

export default App;
