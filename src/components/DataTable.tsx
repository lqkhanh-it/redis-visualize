// components/DataTable.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const DataTable: React.FC = () => {
  const [keys, setKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const response = await axios.get("/api/data");
      setKeys(response?.data ?? []);
    } catch (error) {
      console.error("Error fetching keys:", error);
    }
  };

  const fetchDataByKey = async () => {
    try {
      const response = await axios.get(`/api/dataByKey?key=${selectedKey}`);
      setData([response.data]);
    } catch (error) {
      console.error("Error fetching data by key:", error);
    }
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedKey(e.target.value);
  };

  const handleFetchData = () => {
    if (!selectedKey) return;
    fetchDataByKey();
  };

  return (
    <div className="container mx-auto">
      <div className="my-4 flex items-center">
        <select
          className="px-2 py-1 border rounded text-black"
          value={selectedKey}
          onChange={handleKeyChange}
        >
          <option value="">Select Key</option>
          {keys.map((key, index) => (
            <option key={index} value={key}>
              {key}
            </option>
          ))}
        </select>
        <button
          className="px-4 py-2 bg-blue-500 text-black rounded ml-2"
          onClick={handleFetchData}
        >
          Fetch Data
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-black">Data</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="border px-4 py-2 text-black">{JSON.stringify(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
