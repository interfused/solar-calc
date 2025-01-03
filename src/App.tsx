import "./App.css";
import EnergyUsage from "./electricity-usage/EnergyUsage";
import { GlobalStateProvider } from "./GlobalStateContext"; // Import GlobalStateProvider
import LatLongForm from "./electricity-usage/LatLongForm";
import { Calculations } from "./electricity-usage/Calculations";

function App() {
  return (
    <GlobalStateProvider>
      <>
        <div className="text-center bg-blue-500 text-white p-4">
          <h1 className="font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="relative w-16 inline top-[-5px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
            Solar Panel Calculator
          </h1>
        </div>

        <div className="max-w-screen-xl mx-auto p-4">
          <div className="my-4">
            <LatLongForm />
          </div>
          <EnergyUsage />
          <Calculations />
        </div>
      </>
    </GlobalStateProvider>
  );
}

export default App;
