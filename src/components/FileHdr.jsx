// import { useState } from "react";
// import { useSelector } from "react-redux";

// function FileHdr() {
//   const fileHeaderData = useSelector((state) => state.fileHeader?.data);
//   console.log(fileHeaderData.file_header,"hello")

//   // State for search and filtering
//   const [searchTerm, setSearchTerm] = useState("");
//   const [caseSensitive, setCaseSensitive] = useState(false);

//   const isLoading = !fileHeaderData || !fileHeaderData.file_header;

//   // Filter logic
//   const filteredData = isLoading
//     ? []
//     : [fileHeaderData.file_header].filter((item) => {
//       let searchString = searchTerm;
//       let itemString = `${item.offset} ${item.name} ${item.value} ${item.meaning}` || "";

//       if (!caseSensitive) {
//         searchString = searchString.toLowerCase();
//         itemString = itemString.toLowerCase();
//       }
//       return itemString.includes(searchString);
//     });

//   return (
//     <div className="p-4 space-y-4 mb-12 bg-gray-50">
//       <div className="border rounded-lg">
//         <div className="max-h-[600px] overflow-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {['Offset', 'Name', 'Value', 'Meaning'].map((header) => (
//                   <th key={header} className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">
//                     {header}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y text-[12px] divide-gray-200 text-gray-700">
//               {isLoading
//                 ? Array.from({ length: 5 }).map((_, index) => (
//                   <tr key={index}>
//                     {Array.from({ length: 4 }).map((_, colIndex) => (
//                       <td key={colIndex} className="px-6 py-1 whitespace-nowrap">
//                         <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//                 : filteredData.length === 0
//                   ? (
//                     <tr>
//                       <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No data found</td>
//                     </tr>
//                   )
//                   : filteredData.map((row, index) => (
//                     <tr key={index}>
//                       <td className="px-6 py-1 whitespace-nowrap font-mono">{row.offset}</td>
//                       <td className="px-6 py-1 whitespace-nowrap font-mono">{row.name}</td>
//                       <td className="px-6 py-1 whitespace-nowrap font-mono">{row.value}</td>
//                       <td className="px-6 py-1 whitespace-nowrap font-mono">{row.meaning}</td>
//                     </tr>
//                   ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FileHdr;




import { useState } from "react";
import { useSelector } from "react-redux";

function FileHdr() {
  const fileHeaderData = useSelector((state) => state.fileHeader?.data);
  // console.log("Redux optionalHeaderData:", optionalHeaderData);

  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  const isLoading = !fileHeaderData || !fileHeaderData.file_header;

  // Filter logic
  const filteredData = isLoading
    ? []
    : fileHeaderData.file_header.filter((item) => {
        let searchString = searchTerm;
        let itemString = `${item.offset} ${item.name} ${item.value}` || "";

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
                {['Offset', 'Name', 'Value', 'Meaning'].map((header) => (
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
                      {Array.from({ length: 3 }).map((_, colIndex) => (
                        <td key={colIndex} className="px-6 py-1 whitespace-nowrap">
                          <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                        </td>
                      ))}
                    </tr>
                  ))
                : filteredData.map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-1 whitespace-nowrap font-mono">{row.offset}</td>
                      <td className="px-6 py-1 whitespace-nowrap font-mono">{row.name}</td>
                      <td className="px-6 py-1 whitespace-nowrap font-mono">{row.value}</td>
                      <td className="px-6 py-1 whitespace-nowrap font-mono">{row.meaning}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FileHdr;
