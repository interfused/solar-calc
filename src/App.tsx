import "./App.css";

import { Calculations } from "./electricity-usage/Calculations";
import { AppNav } from "./layout/AppNav";

function App() {
  return (
    <>
      <AppNav></AppNav>

      <div className="max-w-screen-xl mx-auto p-4">
        <Calculations />
      </div>
    </>
  );
}

export default App;
