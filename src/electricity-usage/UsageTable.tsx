import { useGlobalState } from "../GlobalStateContext";

export default function UsageTable() {
  const { globalState } = useGlobalState();

  return (
    <table className="w-full border border-gray-200 mt-4">
      <thead>
        <tr>
          <th>Month</th>
          <th>kWh</th>
        </tr>
      </thead>
      <tbody>
        {globalState.energyEntries.map((entry, index) => (
          <tr key={index}>
            <td>{entry.month}</td>
            <td>{entry.kWh}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
