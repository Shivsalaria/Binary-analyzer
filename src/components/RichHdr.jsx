// import { useState } from "react";
// import { useSelector } from "react-redux";

// function RichHdr() {
//   const richHeaderData = useSelector((state) => state.richHeader.data);

//   // State for search and filtering
//   const [searchTerm, setSearchTerm] = useState("");
//   const [caseSensitive, setCaseSensitive] = useState(false);

//   if (!richHeaderData || richHeaderData.length === 0) {
//     return <div className="p-4 text-gray-700">No Rich Header data available</div>;
//   }

//   // Filter logic
//   const filteredData = richHeaderData.filter((item) => {
//     let searchString = searchTerm;
//     let itemString = `${item.name} ${item.build_id} ${item.count} ${item.product_id} ${item.vs_version} ${item.meaning}` || "";

//     if (!caseSensitive) {
//       searchString = searchString.toLowerCase();
//       itemString = itemString.toLowerCase();
//     }
//     return itemString.includes(searchString);
//   });

//   return (
//     <div className="p-4 space-y-4 mb-12 bg-gray-50">
//       <div className="border rounded-lg">
//         <div className="max-h-[600px] overflow-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">Build ID</th>
//                 <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">Count</th>
//                 <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">Product ID</th>
//                 <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">VS Version</th>
//                 <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">Meaning</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y text-[12px] divide-gray-200 text-gray-700">
//               {filteredData.map((row, index) => (
//                 <tr key={index}>
//                   <td className="px-6 py-1 whitespace-nowrap font-mono">{row.name || 'N/A'}</td>
//                   <td className="px-6 py-1 whitespace-nowrap font-mono">{row.build_id || 'N/A'}</td>
//                   <td className="px-6 py-1 whitespace-nowrap font-mono">{row.count || 'N/A'}</td>
//                   <td className="px-6 py-1 whitespace-nowrap font-mono">{row.product_id || 'N/A'}</td>
//                   <td className="px-6 py-1 whitespace-nowrap font-mono">{row.vs_version || 'N/A'}</td>
//                   <td className="px-6 py-1 whitespace-nowrap font-mono">{row.meaning || 'N/A'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RichHdr;



import { useState } from "react";
import { useSelector } from "react-redux";

function RichHdr() {
  const richHeaderData = useSelector((state) => state.richHeader.data);
  const [searchTerm, setSearchTerm] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  const isLoading = !richHeaderData || richHeaderData.length === 0;

  const filteredData = isLoading
    ? []
    : richHeaderData.filter((item) => {
      let searchString = searchTerm;
      let itemString = `${item.name} ${item.build_id} ${item.count} ${item.product_id} ${item.vs_version} ${item.meaning}` || "";

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
                {["Name", "Build ID", "Count", "Product ID", "VS Version", "Meaning"].map((header) => (
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
                      <td className="px-6 py-1 whitespace-nowrap font-mono">{row.name || "N/A"}</td>
                      <td className="px-6 py-1 whitespace-nowrap font-mono">{row.build_id || "N/A"}</td>
                      <td className="px-6 py-1 whitespace-nowrap font-mono">{row.count || "N/A"}</td>
                      <td className="px-6 py-1 whitespace-nowrap font-mono">{row.product_id || "N/A"}</td>
                      <td className="px-6 py-1 whitespace-nowrap font-mono">{row.vs_version || "N/A"}</td>
                      <td className="px-6 py-1 whitespace-nowrap font-mono">{row.meaning || "N/A"}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RichHdr;
