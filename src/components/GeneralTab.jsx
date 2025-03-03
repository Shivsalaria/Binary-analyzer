import FileInfo from './FileInfo';
import { useSelector } from 'react-redux';

const GeneralTab = () => {
  const generalData = useSelector((state) => state.general.data);
  // console.log("Redux generalData:", generalData);

  const fileData = {
    file_size: generalData?.file_size || "",
    loaded_size: generalData?.loaded_size || "",
    file_alignment: generalData?.file_alignment || "",
    imphash: generalData?.imphash || "",
    rich_header_hash: generalData?.rich_header_hash || "",
    checksum: generalData?.checksum || "",
    md5: generalData?.md5 || "",
    sha1: generalData?.sha1 || "",
    sha256: generalData?.sha256 || ""
  };
  
  return <FileInfo fileData={fileData} />;
};

export default GeneralTab; 