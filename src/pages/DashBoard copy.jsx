import { useState, useEffect, useRef } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import { mockAnalysis } from '../data/mockData';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAiAnalysis } from '../services/operations/service';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const components = {
    p: ({ node, ...props }) => <p {...props} />,
    code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '');
        return !inline && match ? (
            <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        );
    }
};

function DashBoard() {
    const [selectedFunction, setSelectedFunction] = useState(null);
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const aiLoading = useSelector(state => state.aiData.loading);
    const aiError = useSelector(state => state.aiData.error);
    const aiData = useSelector(state => state.aiData.aiData);
    const [displayedOutput, setDisplayedOutput] = useState('');
    const outputRef = useRef(null);
    const [autoScroll, setAutoScroll] = useState(true);
    const lastScrollPosition = useRef(0);
    const userScrolling = useRef(false);
    const scrollTimeout = useRef(null);

    const handleSignOut = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('gD');
        sessionStorage.removeItem('fD');
        window.location.href = '/login';
    };

    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            // console.log("File selected:", file.name);
        }
    };

    useEffect(() => {
        const output = outputRef.current;
        if (!output) return;

        const handleScroll = () => {
            userScrolling.current = true;
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
            scrollTimeout.current = setTimeout(() => {
                userScrolling.current = false;
            }, 1000);
        };

        output.addEventListener('scroll', handleScroll);
        return () => {
            output.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, []);

    const typeText = (text) => {
        let index = 0;
        const minDelay = 10;
        const maxDelay = 30;

        const scrollToBottom = () => {
            if (outputRef.current && !userScrolling.current) {
                const output = outputRef.current;
                output.scrollTo({
                    top: output.scrollHeight,
                    behavior: 'smooth'
                });
            }
        };

        const typeNextCharacter = () => {
            if (index < text.length) {
                setDisplayedOutput(prev => {
                    const newText = text.substring(0, index + 1);
                    setTimeout(scrollToBottom, 0);
                    return newText;
                });

                index++;
                const delay = Math.random() * (maxDelay - minDelay) + minDelay;
                const nextChar = text[index];
                const extraDelay = /[.,!?]/.test(nextChar) ? 150 : 0;

                setTimeout(typeNextCharacter, delay + extraDelay);
            }
        };

        typeNextCharacter();
    };

    useEffect(() => {
        if (aiData) {
            setAutoScroll(true);
            setDisplayedOutput('');
            typeText(aiData);
        }
    }, [aiData]);

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
                                <Sidebar mockAnalysis={mockAnalysis} onFunctionSelect={setSelectedFunction} />
                            </Panel>

                            <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-blue-500 transition-colors" />

                            {/* Code View */}
                            <Panel defaultSize={50} minSize={30}>
                                <div className="h-full bg-white p-4 overflow-auto">
                                    <h2 className="text-lg text-gray-700 font-semibold mb-4">Code View</h2>
                                    <div className="font-mono text-sm bg-blue-50 p-4 rounded">
                                        <pre className="text-gray-700" style={{ whiteSpace: 'pre-wrap' }}>
                                            {selectedFunction
                                                ? (typeof selectedFunction === "string" ? selectedFunction : JSON.stringify(selectedFunction, null, 2))
                                                : "Select a function to view details"}
                                        </pre>
                                    </div>
                                </div>
                            </Panel>

                            <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-blue-500 transition-colors" />

                            {/* AI Analysis Output */}
                            <Panel defaultSize={50} minSize={30}>
                                <div className="h-full bg-white p-4 overflow-auto">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg text-gray-700 font-semibold">Gen AI Editor</h2>
                                        <button
                                            onClick={() => {
                                                if (selectedFunction) {
                                                    const payload = { code: selectedFunction };
                                                    dispatch(fetchAiAnalysis(payload, token, dispatch));
                                                }
                                            }}
                                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300"
                                            disabled={!selectedFunction}
                                        >
                                            Analyze Code
                                        </button>
                                    </div>
                                    <div
                                        ref={outputRef}
                                        className="font-mono text-sm bg-blue-50 p-4 rounded overflow-auto smooth-scroll"
                                        style={{
                                            scrollBehavior: 'smooth',
                                            maxHeight: '500px' 
                                        }}
                                    >
                                        {aiLoading ? (
                                            <div className="text-center">Analyzing...</div>
                                        ) : aiError ? (
                                            <div className="text-red-500">{aiError}</div>
                                        ) : displayedOutput ? (
                                            <div className="prose max-w-none">
                                                <ReactMarkdown components={components}>
                                                    {displayedOutput}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            <div>Click 'Analyze Code' to get AI insights</div>
                                        )}
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
    );
}

export default DashBoard;
