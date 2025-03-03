import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Binary,
  FileText,
  Table,
  Info,
  FileCode,
  Boxes,
  FileSearch,
  Shield,
  Import,
  FolderOpen,
  ArrowUpDown,
  Bug,
  Code
} from 'lucide-react';

import GeneralTab from './GeneralTab';
import StringsTab from './StringsTab';
import DosTab from './DosTab';
import RichHdr from './RichHdr';
import FileHdr from './FileHdr';
import OptionalHdr from './OptionalHdr';
import SectionHdrs from './SectionHdrs';
import ImportsTab from './ImportsTab';
import ImportedFunctionsTab from './ImportedFunctionsTab';
import ExportedFunctionsTab from './exportedFunctionsTab';
import Resources from './Resources';
import Exception from './Exception';
import BaseReloc from './BaseReloc';
import Debug from './Debug';
import DataDirectory from './DataDirectory';
import {
  fetchStringsData,
  fetchDosHeaderData,
  fetchFileHeaderData,
  fetchResourcesData,
  fetchRichHeaderData,
  fetchDecompilerData,
  fetchHexData
} from '../services/operations/service';
import DecompilerTab from './DecompilerTab';
import HexTab from './HexTab';

export function MainContent({ selectedFunction }) {
  const [activeTab, setActiveTab] = useState('general');
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const stringsData = useSelector(state => state.strings.data);
  const dosHeaderData = useSelector(state => state.dosHeader.data);
  const fileHeaderData = useSelector(state => state.fileHeader.data);
  const optionalHeaderData = useSelector(state => state.fileHeader.data);
  const sectionHeaderData = useSelector(state => state.fileHeader.data);
  const importsData = useSelector(state => state.fileHeader.data);
  const importedFunctionsData = useSelector(state => state.fileHeader.data);
  const exportedFunctionsData = useSelector(state => state.fileHeader.data);
  const resourcesData = useSelector(state => state.resources.data);
  const richHeaderData = useSelector(state => state.richHeader.data);
  const decompilerData = useSelector(state => state.decompiler.decompilerData);
  const hexData = useSelector(state => state.hex.data);
  const dataDirectory = useSelector(state => state.resources.data);


  useEffect(() => {
    const fetchDataForTab = async () => {
      try {
        switch (activeTab) {
          case 'strings':
            if (!stringsData) {
              await fetchStringsData(token, dispatch);
            }
            break;
          case 'doshdr':
            if (!dosHeaderData) {
              await fetchDosHeaderData(token, dispatch);
            }
            break;
          case 'richhdr':
            if (!richHeaderData) {
              await fetchRichHeaderData(token, dispatch);
            }
            break;
          case 'filehdr':
            if (!fileHeaderData) {
              await fetchFileHeaderData(token, dispatch);
            }
            break;
          case 'optionalhdr':
            if (!optionalHeaderData) {
              await fetchFileHeaderData(token, dispatch);
            }
            break;
          case 'sectionhdrs':
            if (!sectionHeaderData) {
              await fetchFileHeaderData(token, dispatch);
            }
            break;
          case 'imports':
            if (!importsData) {
              await fetchFileHeaderData(token, dispatch);
            }
            break;
          case 'imported_functions':
            if (!importedFunctionsData) {
              await fetchFileHeaderData(token, dispatch);
            }
            break;
          case 'exported_functions':
            if (!exportedFunctionsData) {
              await fetchFileHeaderData(token, dispatch);
            }
            break;
          case 'resources':
            if (!resourcesData) {
              await fetchResourcesData(token, dispatch);
            }
            break;
          case 'dataDirectory':
            if (!dataDirectory) {
              await fetchResourcesData(token, dispatch);
            }
            break;
          case 'disasm':
            if (!decompilerData) {
              await fetchDecompilerData(token, dispatch);
            }
            break;
          case 'hex':
            if (!hexData) {
              await fetchHexData(1, 50, token, dispatch);
            }
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(`Error fetching data for ${activeTab}:`, error);
      }
    };

    fetchDataForTab();
  }, [activeTab, dispatch, token, stringsData, dosHeaderData, fileHeaderData, resourcesData, richHeaderData, decompilerData, hexData]);
  // console.log(activeTab,"jooooo")

  const tabs = [
    { id: 'general', label: 'General', icon: Info },
    { id: 'disasm', label: 'Decompiler', icon: Binary },
    { id: 'strings', label: 'Strings', icon: FileText },
    { id: 'hex', label: 'Hex', icon: Code },
    { id: 'doshdr', label: 'DOS Hdr', icon: FileCode },
    { id: 'richhdr', label: 'Rich Hdr', icon: Boxes },
    { id: 'filehdr', label: 'File Hdr', icon: FileSearch },
    { id: 'optionalhdr', label: 'Optional Hdr', icon: Shield },
    { id: 'sectionhdrs', label: 'Section Hdrs', icon: Table },
    { id: 'imports', label: 'Imports', icon: Import },
    { id: 'imported_functions', label: 'Imported Functions', icon: Import },
    { id: 'exported_functions', label: 'Exported Functions', icon: Import },
    { id: 'resources', label: 'Resources', icon: FolderOpen },
    { id: 'basereloc', label: 'BaseReloc', icon: ArrowUpDown },
    { id: 'debug', label: 'Debug', icon: Bug },
    { id: 'dataDirectory', label: 'Data Directory', icon: FolderOpen },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'disasm':
        return <DecompilerTab />;
      case 'general':
        return <GeneralTab />;
      case 'strings':
        return <StringsTab />;
      case 'doshdr':
        return <DosTab />;
      case 'richhdr':
        return <RichHdr />;
      case 'filehdr':
        return <FileHdr />;
      case 'optionalhdr':
        return <OptionalHdr />;
      case 'sectionhdrs':
        return <SectionHdrs />;
      case 'imports':
        return <ImportsTab />;
      case 'imported_functions':
        return <ImportedFunctionsTab />;
      case 'exported_functions':
        return <ExportedFunctionsTab />;
      case 'resources':
        return <Resources />;
      case 'exception':
        return <Exception />;
      case 'basereloc':
        return <BaseReloc />;
      case 'debug':
        return <Debug />;
      case 'dataDirectory':
        return <DataDirectory />;
      case 'hex':
        return <HexTab />;
      default:
        return (
          <div className="text-gray-500 text-sm">
            Content for {activeTab}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Horizontal Tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div
          role="tablist"
          aria-orientation="horizontal"
          className="flex overflow-x-auto scrollbar-hide"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              className={`
                flex items-center gap-2 px-4 py-2 text-[11px] text-left whitespace-nowrap
                transition-colors duration-150 outline-none
                hover:bg-gray-100 focus:bg-gray-100
                ${activeTab === tab.id ? 'bg-white border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}
              `}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                  e.preventDefault();
                  const currentIndex = tabs.findIndex(t => t.id === activeTab);
                  const nextIndex = e.key === 'ArrowUp'
                    ? (currentIndex - 1 + tabs.length) % tabs.length
                    : (currentIndex + 1) % tabs.length;
                  setActiveTab(tabs[nextIndex].id);
                }
              }}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-1 overflow-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            className="h-full transition-opacity duration-150"
            style={{ opacity: activeTab === tab.id ? 1 : 0 }}
          >
            {activeTab === tab.id && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  {selectedFunction ? selectedFunction.name : ''}
                </h2>
                {renderTabContent()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainContent;