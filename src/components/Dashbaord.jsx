import { useState } from 'react';

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { mockAnalysis } from '../data/mockData';


function Dashbaord() {
    const [selectedFunction, setSelectedFunction] = useState<any>(null);

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/login'; // Redirect to login after signout
    };
    
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <Header onFileUpload={handleFileUpload} onSignOut={handleSignOut} />
            <div className="flex-1 overflow-hidden">
                <PanelGroup direction="vertical">
                    {/* First Row - Two Columns */}
                    <Panel defaultSize={60} minSize={40}>
                        <PanelGroup direction="horizontal">
                            {/* Sidebar */}
                            <Panel defaultSize={20} minSize={15}>
                                <Sidebar
                                    mockAnalysis={mockAnalysis}
                                    onFunctionSelect={setSelectedFunction}
                                />
                            </Panel>

                            <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-blue-500 transition-colors" />

                            {/* Code View */}
                            <Panel defaultSize={50} minSize={30}>
                                <div className="h-full bg-white p-4 overflow-auto">
                                    <h2 className="text-lg text-gray-700 font-semibold mb-4">Code View</h2>
                                    <div className="font-mono text-sm bg-gray-50 p-4 rounded h-[45vh]">
                                        <pre>
                                            {`int main() {
printf("Hello World");
return 0;
}`}
                                        </pre>
                                    </div>
                                </div>
                            </Panel>

                            <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-blue-500 transition-colors" />

                            {/* Additional Panel */}
                            <Panel defaultSize={50} minSize={30}>
                                <div className="h-full bg-white p-4 overflow-auto">
                                    <h2 className="text-lg text-gray-700 font-semibold mb-4">Gen Ai Editor</h2>
                                    <div className="font-mono text-sm bg-blue-50 p-4 rounded opacity-1 h-[45vh]">
                                        <pre>
                                            {`int main() {
printf("Hello World");
return 0;
}`}
                                        </pre>
                                    </div>
                                </div>
                            </Panel>
                        </PanelGroup>
                    </Panel>

                    <PanelResizeHandle className="h-1 bg-gray-200 hover:bg-blue-500 transition-colors" />

                    {/* Second Row - Full Width Panel */}
                    <Panel defaultSize={45} minSize={10}>
                        <MainContent selectedFunction={selectedFunction} />
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    )
}

export default Dashbaord
