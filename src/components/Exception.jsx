'use client'

function Exception() {

  const fileHeaderData = [
    {
      offset: '0xf8',
      name: 'File Header',
      value: 'MACHINE_TYPES.AMD64',
      meaning: 'MACHINE_TYPES.AMD64',
    },
    {
      offset: '0xf8',
      name: 'File Header',
      value: 'MACHINE_TYPES.AMD64',
      meaning: 'MACHINE_TYPES.AMD64',
    },
    {
      offset: '0xf8',
      name: 'File Header',
      value: 'MACHINE_TYPES.AMD64',
      meaning: 'MACHINE_TYPES.AMD64',
    },
    {
      offset: '0xf8',
      name: 'File Header',
      value: 'MACHINE_TYPES.AMD64',
      meaning: 'MACHINE_TYPES.AMD64',
    },
    {
      offset: '0xf8',
      name: 'File Header',
      value: 'MACHINE_TYPES.AMD64',
      meaning: 'MACHINE_TYPES.AMD64',
    },
    {
      offset: '0xf8',
      name: 'File Header',
      value: 'MACHINE_TYPES.AMD64',
      meaning: 'MACHINE_TYPES.AMD64',
    },
    {
      offset: '0xf8',
      name: 'File Header',
      value: 'MACHINE_TYPES.AMD64',
      meaning: 'MACHINE_TYPES.AMD64',
    },
    {
      offset: '0xf8',
      name: 'File Header',
      value: 'MACHINE_TYPES.AMD64',
      meaning: 'MACHINE_TYPES.AMD64',
    },
    {
      offset: '0xf8',
      name: 'File Header',
      value: 'MACHINE_TYPES.AMD64',
      meaning: 'MACHINE_TYPES.AMD64',
    },
    {
      offset: '0xf8',
      name: 'File Header',
      value: 'MACHINE_TYPES.AMD64',
      meaning: 'MACHINE_TYPES.AMD64',
    },
    {
      offset: '0xf8',
      name: 'File Header',
      value: 'MACHINE_TYPES.AMD64',
      meaning: 'MACHINE_TYPES.AMD64',
    },
   
  ];

  return (
    <div className="w-full max-w-9xl mb-12 mx-auto bg-white rounded-sm shadow p-4">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Offset</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Name</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Value</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">Meaning</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {fileHeaderData.map((data, index) => (
            <tr key={index} className="bg-white">
              <td className="px-4 py-2 text-sm text-gray-700">{data.offset}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{data.name}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{data.value}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{data.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Exception; 