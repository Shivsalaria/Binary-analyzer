import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDecompilerData } from '../services/operations/service';

function DecompilerTab() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const decompilerData = useSelector(state => state.decompiler.decompilerData);
  // console.log(decompilerData, 'hiii')
  const loading = useSelector(state => state.decompiler.loading);

  // Search and pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [useRegex, setUseRegex] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);

  useEffect(() => {
    // Update to use pagination
    fetchDecompilerData(currentPage, itemsPerPage, token, dispatch);
  }, [dispatch, token, currentPage, itemsPerPage]);

  // Filter data based on search term
  const filteredData = decompilerData ? decompilerData.filter((item) => {
    let searchString = searchTerm;
    let itemString = `${item.mnemonic} ${item.op_str}` || '';

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
  }) : [];

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Download functionality
  const downloadData = () => {
    if (!decompilerData) return;

    const content = decompilerData.map((row) =>
      `${row.address}\t${row.mnemonic}\t${row.op_str}`
    ).join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "decompiler_data.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Update the pagination handlers to fetch data
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchDecompilerData(newPage, itemsPerPage, token, dispatch);
  };

  return (
    <div className="p-4 space-y-4 mb-12 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            className="border border-gray-700 text-sm px-4 text-gray-700 py-1 rounded"
            onClick={downloadData}
          >
            Save
          </button>
          <div className="flex items-center space-x-2 text-gray-700 text-[12px]">
            <span>Page</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="w-16 border border-gray-300 rounded px-2 py-1 text-black"
            />
          </div>
          <div className="flex items-center space-x-2 text-gray-700 text-[12px]">
            <span>Max per page</span>
            <select
              value={String(itemsPerPage)}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="w-20 border border-gray-300 rounded px-2 py-1 text-black"
            >
              {[10, 20, 50, 100].map((value) => (
                <option key={value} value={String(value)}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center text-gray-700 space-x-4">
          <input
            placeholder="Search instruction"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80 py-1 border border-gray-300 rounded px-2 text-gray-700"
          />
          <div className="flex items-center text-sm space-x-2">
            <input
              type="checkbox"
              id="regex"
              checked={useRegex}
              onChange={(e) => setUseRegex(e.target.checked)}
              className="form-checkbox"
            />
            <label htmlFor="regex">By regex</label>
          </div>
          <div className="flex items-center text-sm space-x-2">
            <input
              type="checkbox"
              id="case"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="form-checkbox"
            />
            <label htmlFor="case">Case sensitive</label>
          </div>
        </div>
      </div>

      <div className="border rounded-lg">
        <div className="max-h-[600px] overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">Address</th>
                <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider"> Row Address</th>
                <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">Mnemonic</th>
                <th className="px-6 py-4 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider">Operands</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y text-[12px] divide-gray-200 text-gray-700">
              {loading || !decompilerData ? (
                Array.from({ length: 10 }).map((_, index) => (
                  <tr key={index}>
                    {Array.from({ length: 3 }).map((_, colIndex) => (
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
                filteredData.map((row, index) => (
                  <tr key={index}>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{row.address}</td>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{row.raw_address}</td>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{row.mnemonic}</td>
                    <td className="px-6 py-1 whitespace-nowrap font-mono">{row.op_str}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
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
}

export default DecompilerTab; 
