import { useState } from "react";
import { useSelector } from "react-redux";

function DataDirectory() {
  const DataDirectory = useSelector((state) => state.resources.data);
  // console.log("Redux DataDirectory:", DataDirectory?.optional_dataDirectory);

  const [searchTerm, setSearchTerm] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  const isLoading =
    !DataDirectory ||
    !DataDirectory.optional_dataDirectory ||
    DataDirectory.optional_dataDirectory.length === 0;

  const directoryData = isLoading
    ? []
    : Object.entries(DataDirectory.optional_dataDirectory[0]) 
        .reduce((acc, [key, value]) => {
          if (
            key !== "filename" && 
            typeof value === "object" &&
            value !== null &&
            "virtual_address" in value &&
            "size" in value
          ) {
            acc.push({
              name: key.toString().replace(/_/g, " "),
              virtualAddress: value.virtual_address,
              size: value.size,
            });
          }
          return acc;
        }, []);

  return (
    <div className="p-4 space-y-4 mb-12 bg-gray-50">
      {isLoading ? (
        <table className="min-w-full divide-y divide-gray-200">
          <tbody>
            {Array.from({ length: 7 }).map((_, index) => (
              <tr key={index}>
                {Array.from({ length: 8 }).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-1 whitespace-nowrap">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="border rounded-lg overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Directory", "Size", "Virtual Address"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y text-[12px] divide-gray-200 text-gray-700">
              {directoryData.map((entry, index) => (
                <tr key={index}>
                  <td className="px-6 py-1 whitespace-nowrap font-mono">
                    {entry.name}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap font-mono">
                    {entry.size}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap font-mono">
                    {entry.virtualAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DataDirectory;
