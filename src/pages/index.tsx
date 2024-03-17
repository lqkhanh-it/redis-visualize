// pages/index.tsx
import DataTable from "../components/DataTable";
import "../app/globals.css";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold my-4">Data Table</h1>
      <DataTable />
    </div>
  );
}
