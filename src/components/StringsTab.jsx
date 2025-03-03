// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchStringsData } from "../services/operations/service";

// const StringsTab = () => {
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);
//   const stringsData = useSelector((state) => state.strings.data);
//   const loading = useSelector((state) => state.strings.loading);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [itemsPerPage, setItemsPerPage] = useState(50);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [useRegex, setUseRegex] = useState(false);
//   const [caseSensitive, setCaseSensitive] = useState(false);

//   useEffect(() => {
//     fetchStringsData(currentPage, itemsPerPage, token, dispatch);
//   }, [currentPage, itemsPerPage, token, dispatch]);

//   const filteredData = !stringsData ? [] : stringsData.filter((item) => {
//     let searchString = searchTerm;
//     let itemString = item.string;

//     if (!caseSensitive) {
//       searchString = searchString.toLowerCase();
//       itemString = itemString.toLowerCase();
//     }

//     if (useRegex) {
//       try {
//         const regex = new RegExp(searchString);
//         return regex.test(itemString);
//       } catch {
//         return false;
//       }
//     }

//     return itemString.includes(searchString);
//   });

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//     fetchStringsData(newPage, itemsPerPage, token, dispatch);
//   };

//   return (
//     <div className="p-4 space-y-4 mb-12 bg-gray-50">
//       <div className="border rounded-lg">
//         <div className="max-h-[600px] overflow-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {['Offset', 'Type', 'Length', 'String'].map((header) => (
//                   <th key={header} className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">
//                     {header}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y text-[12px] divide-gray-200 text-gray-700">
//               {loading ? (
//                 // Loading skeleton
//                 Array.from({ length: 5 }).map((_, index) => (
//                   <tr key={index}>
//                     {Array.from({ length: 4 }).map((_, colIndex) => (
//                       <td key={colIndex} className="px-6 py-1 whitespace-nowrap">
//                         <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               ) : (
//                 // Actual data
//                 filteredData.map((row, index) => (
//                   <tr key={index}>
//                     <td className="px-6 py-1 whitespace-nowrap font-mono">{row.offset}</td>
//                     <td className="px-6 py-1 whitespace-nowrap font-mono">{row.type}</td>
//                     <td className="px-6 py-1 whitespace-nowrap font-mono">{row.length}</td>
//                     <td className="px-6 py-1 whitespace-nowrap font-mono">{row.string}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4">
//         <select
//           value={itemsPerPage}
//           onChange={(e) => setItemsPerPage(Number(e.target.value))}
//           className="px-3 py-2 border rounded text-[12px] "
//         >
//           <option value={10}>10 per page</option>
//           <option value={20}>20 per page</option>
//           <option value={50}>50 per page</option>
//         </select>

//         <div className="flex gap-2">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-3 py-2 border rounded disabled:opacity-50 text-[12px]"
//           >
//             Previous
//           </button>
//           <span className="px-3 py-2 text-[12px]">
//             Page {currentPage}
//           </span>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             className="px-3 py-2 border rounded text-[12px]"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StringsTab;









import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStringsData } from "../services/operations/service";

const StringsTab = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const stringsData = useSelector((state) => state.strings.data);
  const loading = useSelector((state) => state.strings.loading);

  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [useRegex, setUseRegex] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);

  useEffect(() => {
    fetchStringsData(currentPage, itemsPerPage, token, dispatch);
  }, [currentPage, itemsPerPage, token, dispatch]);

  const filteredData = !stringsData ? [] : stringsData.filter((item) => {
    let searchString = searchTerm;
    let itemString = item.string;

    if (!caseSensitive) {
      searchString = searchString.toLowerCase();
      itemString = itemString.toLowerCase();
    }

    if (useRegex) {
      try {
        const regex = new RegExp(searchString);
        return regex.test(itemString);
      } catch {
        return false;
      }
    }

    return itemString.includes(searchString);
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchStringsData(newPage, itemsPerPage, token, dispatch);
  };

  return (
    <div className="p-4 space-y-4 mb-12 bg-gray-50">
      <div className="border rounded-lg">
        <div className="max-h-[600px] overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Offset', 'Type', 'Length', 'String'].map((header) => (
                  <th key={header} className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y text-[12px] divide-gray-200 text-gray-700">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    {Array.from({ length: 4 }).map((_, colIndex) => (
                      <td key={colIndex} className="px-6 py-1 whitespace-nowrap">
                        <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No data found</td>
                </tr>
              ) : (
                // Actual data
                filteredData.map((row, index) => (
                  <tr key={index}>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{row.offset}</td>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{row.type}</td>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{row.length}</td>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{row.string}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="px-3 py-2 border rounded text-[12px] "
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 border rounded disabled:opacity-50 text-[12px]"
          >
            Previous
          </button>
          <span className="px-3 py-2 text-[12px]">
            Page {currentPage}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-2 border rounded text-[12px]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StringsTab;