import { useState } from "react";
import { useSelector } from "react-redux";

function ImportedFunctionsTab() {
  const importsFuncData = useSelector((state) => state.fileHeader?.data);

  const [searchTerm, setSearchTerm] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  const isLoading = !importsFuncData || !importsFuncData.imported_functions;

  const filteredData = isLoading
    ? []
    : importsFuncData.imported_functions.filter((item) => {
      let searchString = searchTerm;
      let itemString = `${item.call_via} ${item.name} ${item.ordinal} ${item.original_thunk} ${item.thunk}` || "";

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
                {['Call Via', 'Dll Name', 'Name', 'Ordinal', 'Original Thunk', 'Thunk'].map((header) => (
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
                      <td className="px-6 py-1 whitespace-nowrap font-mono">{row.call_via}</td>
                      <td className="px-6 py-1 whitespace-nowrap font-mono">{row.dllname}</td>
                      <td className="px-6 py-1 whitespace-nowrap font-mono">{row.name}</td>
                      <td className="px-6 py-1 whitespace-nowrap font-mono">{row.ordinal}</td>
                      <td className="px-6 py-1 whitespace-nowrap font-mono">{row.original_thunk}</td>
                      <td className="px-6 py-1 whitespace-nowrap font-mono">{row.thunk}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ImportedFunctionsTab;
