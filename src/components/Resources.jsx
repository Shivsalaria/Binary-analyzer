import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Resources() {
  const resourcesData = useSelector((state) => state.resources.data?.resources);
  // console.log("Redux resourcesData:", resourcesData);

  const [searchTerm, setSearchTerm] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (resourcesData) {
      setIsLoading(false);
    }
  }, [resourcesData]);

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 mb-12 bg-gray-50">
        <div className="border rounded-lg overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y text-[12px] divide-gray-200 text-gray-700">
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  {Array.from({ length: 5 }).map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-1 whitespace-nowrap">
                      <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Convert object to array with single item
  const resourcesArray = [resourcesData];

  const filteredData = resourcesArray.filter((data) => {
    let searchString = searchTerm;
    let itemString = `${data.offset} ${data.name} ${data.value} ${data.type} ${data.entries_count}`;

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
              <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">Offset</th>
              <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">Value</th>
              <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">Entries Count</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y text-[12px] divide-gray-200 text-gray-700">
            {filteredData.map((data, index) => (
              <tr key={index}>
                <td className="px-6 py-1 whitespace-nowrap font-mono">{data.offset}</td>
                <td className="px-6 py-1 whitespace-nowrap font-mono">{data.name}</td>
                <td className="px-6 py-1 whitespace-nowrap font-mono">{data.value}</td>
                <td className="px-6 py-1 whitespace-nowrap font-mono">{data.type}</td>
                <td className="px-6 py-1 whitespace-nowrap font-mono">{data.entries_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Resources;