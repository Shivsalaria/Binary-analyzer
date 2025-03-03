import { useState } from 'react';
import { useSelector } from 'react-redux';

function Debug() {
  const debugData = useSelector((state) => state.resources.data);
  // console.log("Redux debugData:", debugData);

  const [searchTerm, setSearchTerm] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  const isLoading = !debugData || !debugData.debug;

  const filteredData = isLoading
    ? []
    : debugData.debug.filter((data) => {
        let searchString = searchTerm;
        let itemString = `${data.offset} ${data.type} ${data.typename} ${data.characteristics} ${data.majorversion} ${data.minorversion} ${data.sizeofdata} ${data.addressof}`;

        if (!caseSensitive) {
          searchString = searchString.toLowerCase();
          itemString = itemString.toLowerCase();
        }
        return itemString.includes(searchString);
      });

  return (
    <div className="p-4 space-y-4 mb-12 bg-gray-50">
      <div className="border rounded-lg overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Offset', 'Type', 'Type Name', 'Characteristics', 'Major Version', 'Minor Version', 'Size of Data', 'Address Of'].map((header) => (
                <th key={header} className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y text-[12px] divide-gray-200 text-gray-700">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    {Array.from({ length: 8 }).map((_, colIndex) => (
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
              : filteredData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{data.offset}</td>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{data.type}</td>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{data.typename}</td>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{data.characteristics}</td>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{data.majorversion}</td>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{data.minorversion}</td>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{data.sizeofdata}</td>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{data.addressof}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Debug;
