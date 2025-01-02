import { useEffect } from "react";
import { GlobalStateProvider, useGlobalState } from "../GlobalStateContext";

function LastName() {
  //  const [count, setCount] = useState(0);
  const { globalState, setGlobalState } = useGlobalState();
  console.log("global state is");
  console.dir(globalState);

  useEffect(() => {
    console.log("LastName: globalState updated:", globalState);
  }, [globalState]);

  return (
    <>
      <h2>LastName</h2>
      {/* we want to show in kWh */}

      <button
        onClick={() => {
          const newLastName = "Bernabe";
          console.log("Previous global state:", globalState); // Log before update
          setGlobalState((prevState) => ({
            ...prevState,
            lastName: newLastName,
          }));
          console.log("Updated global state:", globalState); // Log after update (NOTE: state updates are async)
        }}
      >
        Change Global LastName State
      </button>
    </>
  );
}

export default LastName;
/*
export default () => (
  <GlobalStateProvider>
    <LastName />
  </GlobalStateProvider>
);
*/
