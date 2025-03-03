

/**
 * @typedef {Object} FileInfoProps
 * @property {Object} fileData
 * @property {string} fileData.path
 * @property {string} fileData.isTruncated
 * @property {string} fileData.fileSize
 * @property {string} fileData.loadedSize
 * @property {string} fileData.fileAlignmentUnits
 * @property {string} fileData.impHash
 * @property {string} fileData.richHeaderHash
 * @property {string} fileData.checksum
 * @property {string} fileData.md5
 * @property {string} fileData.sha1
 * @property {string} fileData.sha256
 */

import PropTypes from 'prop-types';

function FileInfo({ fileData }) {
  if (!fileData || typeof fileData !== 'object') {
    return <p className="text-red-500">Invalid file data provided.</p>;
  }

  return (
    <div className="w-full max-w-9xl mx-auto bg-white rounded-sm shadow">
      <div className="overflow-hidden">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <tbody className="divide-y divide-gray-200">
            {Object.entries(fileData).map(([key, value], index) => (
              <tr key={key} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-4 py-2 text-sm font-medium text-gray-900 align-top w-48 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 font-mono break-all">
                  {value || <span className="text-gray-400">N/A</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

FileInfo.propTypes = {
  fileData: PropTypes.shape({
    path: PropTypes.string,
    isTruncated: PropTypes.string,
    fileSize: PropTypes.string,
    loadedSize: PropTypes.string,
    fileAlignmentUnits: PropTypes.string,
    impHash: PropTypes.string,
    richHeaderHash: PropTypes.string,
    checksum: PropTypes.string,
    md5: PropTypes.string,
    sha1: PropTypes.string,
    sha256: PropTypes.string,
  }).isRequired,
};

export default FileInfo;