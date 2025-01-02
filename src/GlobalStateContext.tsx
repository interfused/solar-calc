import React, { createContext, useContext, useState } from "react";
import { EnergyUsageEntry, LocationData } from "./types/basicTypes";
// Define the structure of the global state
type GlobalState = {
  energyEntries: EnergyUsageEntry[]; // Add energyEntries to the global state
  LocationData: LocationData;
  userName: string;
};
// Define the context type
type GlobalStateContextType = {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
};

// Initialize the context
const GlobalStateContext = createContext<GlobalStateContextType | null>(null);

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [globalState, setGlobalState] = useState<GlobalState>({
    energyEntries: [],
    LocationData: {
      latitude: 0,
      longitude: 0,
      avg_dni: 0,
      avg_ghi: 0,
      avg_lat_tilt: 0,
    },
    userName: "",
  });
  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

//export const useGlobalState = () => useContext(GlobalStateContext);
// Hook to use the global state
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
