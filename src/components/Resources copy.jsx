// 'use client'

// function Resources() {

//   const fileHeaderData = [
//     {
//       offset: '0x0',
//       name: 'Resources',
//       value: '1',
//       meaning: 'RESOURCE_DIRECTORY',
//       entries_count:'1'
//     },

//     {
//       offset: '0x0',
//       name: 'Resources',
//       value: '1',
//       meaning: 'RESOURCE_DIRECTORY',
//       entries_count:'1'
//     },
   
//   ];

//   return (
//     <div className="w-full max-w-9xl mb-12 mx-auto bg-white rounded-sm shadow p-4">
//       <table className="min-w-full">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Offset</th>
//             <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Name</th>
//             <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Value</th>
//             <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Enteries Count</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {fileHeaderData.map((data, index) => (
//             <tr key={index} className="bg-white">
//               <td className="px-4 py-2 text-sm text-gray-700">{data.offset}</td>
//               <td className="px-4 py-2 text-sm text-gray-700">{data.name}</td>
//               <td className="px-4 py-2 text-sm text-gray-700">{data.value}</td>
// \              <td className="px-4 py-2 text-sm text-gray-700">{data.entries_count}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Resources; 






// import { useSelector } from 'react-redux';
// function Resources() {
//   const resourcesData = useSelector((state) => state.resources.data);
//   console.log("Redux resourcesData:", resourcesData);

//   if (!resourcesData || !resourcesData.resources) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="w-full max-w-9xl mb-12 mx-auto bg-white rounded-sm shadow p-4">
//       <table className="min-w-full">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Offset</th>
//             <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Name</th>
//             <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Value</th>
//             <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Enteries Count</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {resourcesData?.resources?.map((data, index) => (
//             <tr key={index} className="bg-white">
//               <td className="px-4 py-2 text-sm text-gray-700">{data.offset}</td>
//               <td className="px-4 py-2 text-sm text-gray-700">{data.name}</td>
//               <td className="px-4 py-2 text-sm text-gray-700">{data.value}</td>
//               <td className="px-4 py-2 text-sm text-gray-700">{data.entries_count}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Resources; 



'use client'

import { useState } from 'react';

function Resources() {
  const fileHeaderData = [
    {
      offset: '0x0',
      name: 'Resources',
      value: '1',
      meaning: 'RESOURCE_DIRECTORY',
      entries_count: '1'
    },
    {
      offset: '0x0',
      name: 'Resources',
      value: '1',
      meaning: 'RESOURCE_DIRECTORY',
      entries_count: '1'
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  const filteredData = fileHeaderData.filter((data) => {
    let searchString = searchTerm;
    let itemString = `${data.offset} ${data.name} ${data.value} ${data.meaning} ${data.entries_count}`;

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
              <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">Meaning</th>
              <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">Entries Count</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y text-[12px] divide-gray-200 text-gray-700">
            {filteredData.map((data, index) => (
              <tr key={index}>
                <td className="px-6 py-1 whitespace-nowrap font-mono">{data.offset}</td>
                <td className="px-6 py-1 whitespace-nowrap font-mono">{data.name}</td>
                <td className="px-6 py-1 whitespace-nowrap font-mono">{data.value}</td>
                <td className="px-6 py-1 whitespace-nowrap font-mono">{data.meaning}</td>
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