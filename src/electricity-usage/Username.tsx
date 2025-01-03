import { useEffect } from "react";
//import UsernameForm from "./UsernameForm";
import { useGlobalState } from "../GlobalStateContext";

function Username() {
  //  const [count, setCount] = useState(0);
  const { globalState, setGlobalState } = useGlobalState();

  useEffect(() => {
    console.log("Username: globalState updated:", globalState);
  }, [globalState]);

  return (
    <>
      <h2>Username</h2>
      {/* we want to show in kWh */}

      <button
        onClick={() => {
          const newUsername = "Jeremy";
          console.log("Previous global state:", globalState); // Log before update

          setGlobalState((prevState) => ({
            ...prevState,
            userName: newUsername,
          }));
        }}
      >
        Change Global Username State
      </button>
    </>
  );
}

export default Username;
