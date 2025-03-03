import { useState } from "react";
import { useSelector } from "react-redux";

function exportedFunctionsTab() {
  const exportsFuncData = useSelector((state) => state.fileHeader?.data);

  const [searchTerm, setSearchTerm] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  const isLoading = !exportsFuncData || !exportsFuncData.exported_functions;

  const filteredData = isLoading
    ? []
    : exportsFuncData.exported_functions.filter((item) => {
      let searchString = searchTerm;
      let itemString = `${item.offset} ${item.name} ${item.name_rva} ${item.function_rva} ${item.ordinal}` || "";

      if (!caseSensitive) {
        searchString = searchString.toLowerCase();
        itemString = itemString.toLowerCase();
      }
      return itemString.includes(searchString);
    });

  return (
    <div className="p-4 space-y-4 mb-12 bg-gray-50">
      <div className="border rounded-lg p-4 bg-white shadow">
        <div className="max-h-[600px] overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['offset', 'Name', 'Name_rva', 'Function_rva', 'Ordinal'].map((header) => (
                  <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-gray-800 uppercase">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y text-xs divide-gray-200 text-gray-700">
              {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                  <tr key={index}>
                    {Array.from({ length: 6 }).map((_, colIndex) => (
                      <td key={colIndex} className="px-6 py-1 whitespace-nowrap">
                        <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
                : filteredData.length === 0
                ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No data found</td>
                  </tr>
                )
                : filteredData.map((row, index) => (
                  <tr key={index}>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{row.offset}</td>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{row.name}</td>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{row.name_rva}</td>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{row.function_rva}</td>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{row.ordinal}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default exportedFunctionsTab;
