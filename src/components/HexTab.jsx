import {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHexData } from '../services/operations/service';

const HexTab = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const hexData = useSelector((state) => state.hex.data);
    const loading = useSelector((state) => state.hex.loading);
    const error = useSelector((state) => state.hex.error);
    const [itemsPerPage, setItemsPerPage] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (token) {
            fetchHexData(1, 50, token, dispatch);
        }
    }, [dispatch, token]);
    

    if (loading) {
        return (
            <div className="p-4">
                <div className="animate-pulse space-y-4">
                    {[...Array(5)].map((_, idx) => (
                        <div key={idx} className="h-4 bg-gray-300 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-600">
                Error loading hex data: {error}
            </div>
        );
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchHexData(newPage, itemsPerPage, token, dispatch);
    };


    const formatHexBytes = (hexArray) => {
        if (!hexArray) return '';
        return Array.isArray(hexArray) ? hexArray.join(' ') : String(hexArray);
    };

    // Ensure hexData is an array and has items
    const validHexData = Array.isArray(hexData) ? hexData : [];

    if (!validHexData || validHexData.length === 0) {
        return <div className="px-6 py-4 text-center text-gray-500">No data found</div>;
    }

    return (
        <div className="p-4 space-y-4 mb-12 bg-gray-50">
            <div className="border rounded-lg shadow-sm">
                <div className="max-h-[600px] overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Address</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Hex Values</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">ASCII</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {validHexData.map((data, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-2 whitespace-nowrap font-mono text-sm text-gray-600">
                                        {data.address || ''}
                                    </td>
                                    <td className="px-6 py-2 whitespace-nowrap font-mono text-sm">
                                        <span className="text-blue-600">{formatHexBytes(data.hex)}</span>
                                    </td>
                                    <td className="px-6 py-2 whitespace-nowrap font-mono text-sm text-gray-800">
                                        {data.ascii || ''}
                                    </td>
                                </tr>
                            ))}
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
};

export default HexTab;
