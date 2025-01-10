export type EnergyUsageEntry = {
  month: string;
  kWh: number;
};

export type LocationData = {
  latitude: number;
  longitude: number;
  avg_dni: number;
  avg_ghi: number;
  avg_lat_tilt: number;
};

export type PanelData = {
  wattage: number;
  length: number;
  width: number;
};
