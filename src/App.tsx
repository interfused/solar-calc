import "./App.css";
import EnergyUsage from "./electricity-usage/EnergyUsage";
import { GlobalStateProvider } from "./GlobalStateContext"; // Import GlobalStateProvider
import LatLongForm from "./electricity-usage/LatLongForm";
import { Calculations } from "./electricity-usage/Calculations";
import { AppNav } from "./layout/AppNav";

function App() {
  return (
    <GlobalStateProvider>
      <>
        <AppNav></AppNav>

        <div className="max-w-screen-xl mx-auto p-4">
          <Calculations />
          <div className="my-4">
            <LatLongForm />
          </div>
          <EnergyUsage />
        </div>
      </>
    </GlobalStateProvider>
  );
}

export default App;
