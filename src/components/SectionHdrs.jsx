import { useState } from "react";
import { useSelector } from "react-redux";

function SectionHdrs() {
  const sectionHeaderData = useSelector((state) => state.fileHeader?.data);
  // console.log("Redux sectionHeaderData:", sectionHeaderData);

  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  const isLoading = !sectionHeaderData || !sectionHeaderData.sections;

  // Filter logic
  const filteredData = isLoading
    ? []
    : sectionHeaderData.sections.filter((item) => {
      let searchString = searchTerm;
      let itemString = `${item.name} ${item.rawadd} ${item.rawsize} ${item["virtual addr"]} ${item.virtualsize} ${item.characteristics}` || "";

      if (!caseSensitive) {
        searchString = searchString.toLowerCase();
        itemString = itemString.toLowerCase();
      }
      return itemString.includes(searchString);
    });

  return (
    <div className="p-4 space-y-4 mb-12 bg-gray-50">
      <div className="border rounded-lg">
        <div className="max-h-[600px] overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Name', 'Raw Address', 'Raw Size', 'Virtual Addr', 'Virtual Size', 'Characteristics'].map((header) => (
                  <th key={header} className="px-6 py-2 text-left text-xs font-semibold text-gray-800 uppercase">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y text-xs divide-gray-200 text-gray-700">
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
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
                      <td className="px-6 py-1 whitespace-nowrap">{row.name}</td>
                      <td className="px-6 py-1 whitespace-nowrap">{row.rawadd}</td>
                      <td className="px-6 py-1 whitespace-nowrap">{row.rawsize}</td>
                      <td className="px-6 py-1 whitespace-nowrap">{row["virtual addr"]}</td>
                      <td className="px-6 py-1 whitespace-nowrap">{row.virtualsize}</td>
                      <td className="px-6 py-1 whitespace-nowrap">{row.characteristics}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SectionHdrs;
