import { useState } from 'react';
import { Shield, FileText, Cpu, Upload, ArrowRight, CheckCircle, AlertTriangle, Code, Lock } from 'lucide-react';

const Home = () => {
  const [darkMode, setDarkMode] = useState(true);

  // Theme classes
  const mainBg = darkMode ? 'bg-[#1f2937]' : 'bg-gray-50';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const cardBg = darkMode ? 'bg-[#1f2937]' : 'bg-white';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const accentColor = 'bg-indigo-600 hover:bg-indigo-700';
  const mutedText = darkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className={`${mainBg} ${textColor} min-h-screen font-sans`}>
      {/* Navbar */}
      <nav className={`${darkMode ? 'bg-[#1f2937]' : 'bg-white'} border-b ${borderColor}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center flex-col sm:flex-row">
              <div className="flex items-center">
                <Shield className="h-10 w-10 text-indigo-500" />
                <span className="ml-2 text-xl font-bold">Malware Analysis <br /><span className="text-sm font-thin">by secure thread</span></span>
              </div>
            </div>

            <div className="flex items-center">
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-md">
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              <a href="/login" className={`ml-4 px-4 py-2 rounded ${accentColor} text-white font-medium`}>
                Sign In
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden h-[95vh]">
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-100/30'}`}></div>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-purple-600/20"></div>
          <div className="absolute w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute rounded-full ${darkMode ? 'bg-blue-500/10' : 'bg-indigo-500/10'}`}
                style={{
                  width: `${Math.random() * 300}px`,
                  height: `${Math.random() * 300}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="relative max-w-[90rem] mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Advanced <span className="text-indigo-500">Malware Analysis</span> Lab
            </h1>
            <p className={`text-xl ${mutedText} mb-8 max-w-2xl`}>
              Leverage AI-powered binary code review and static file analysis to detect threats and vulnerabilities within your software ecosystem.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className={`${accentColor} text-white px-6 py-3 rounded-lg text-lg font-medium flex items-center`}>
                Try Analysis Lab <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className={`border ${borderColor} ${cardBg} px-6 py-3 rounded-lg text-lg font-medium flex items-center`}>
                Learn More
              </button>
            </div>

            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${['bg-indigo-500', 'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-pink-500'][i]} border-2 ${darkMode ? 'border-gray-800' : 'border-white'} flex items-center justify-center text-white text-xs font-bold`}>
                    {['JD', 'TS', 'AM', 'RK', 'PL'][i]}
                  </div>
                ))}
              </div>
              <p className={`ml-4 ${mutedText}`}>Trusted by <span className="font-semibold">500+</span> security researchers</p>
            </div>
          </div>

          <div className={`lg:w-1/2 mt-12 ${cardBg} rounded-xl border ${borderColor} shadow-xl overflow-hidden`}>
            <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'} border-b ${borderColor} py-3 px-4 flex items-center`}>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4 text-sm font-medium">Malware Analysis Console</div>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-6">
                <div className={`border ${borderColor} rounded-lg p-4 flex flex-col gap-4`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Upload className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="font-medium">Upload File for Analysis</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-800'}`}>Step 1</span>
                  </div>
                  <div className={`border-2 border-dashed ${borderColor} rounded-lg p-8 flex flex-col items-center justify-center`}>
                    <FileText className={`h-12 w-12 ${mutedText} mb-4`} />
                    <p className="font-medium mb-2">Drag files here or click to browse</p>
                    <p className={`text-sm ${mutedText} mb-4 text-center`}>
                      Support for executables, DLLs, scripts, documents with macros
                    </p>
                    <button className={`${accentColor} text-white px-4 py-2 rounded-lg`}>
                      Select Files
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`border ${borderColor} rounded-lg p-4`}>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-500 mr-2" />
                        <span className="font-medium">Static File Analysis</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>Step 2</span>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">File structure analysis</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Signature-based detection</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Heuristic analysis</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Entropy visualization</span>
                      </li>
                    </ul>
                  </div>

                  <div className={`border ${borderColor} rounded-lg p-4`}>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <Cpu className="h-5 w-5 text-purple-500 mr-2" />
                        <span className="font-medium">AI Binary Code Review</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>Step 3</span>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Neural pattern recognition</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Behavior prediction</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Disassembly enhancement</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Vulnerability detection</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className={`py-16 ${darkMode ? 'bg-[#1f2937]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Core Analysis Features</h2>
            <p className={`max-w-2xl mx-auto ${mutedText}`}>
              Our specialized toolset focuses exclusively on advanced static analysis and AI-powered code review
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Static Analysis Feature */}
            <div className={`${cardBg} border ${borderColor} rounded-xl overflow-hidden shadow-lg`}>
              <div className="p-6">
                <div className={`w-12 h-12 rounded-lg ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} flex items-center justify-center mb-6`}>
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Static File Analysis</h3>
                <p className={`${mutedText} mb-6`}>
                  Perform deep inspection of file contents without execution to identify malicious patterns and potential threats.
                </p>
                <div className={`rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4 mb-6`}>
                  <h4 className="font-medium mb-3">Key Capabilities:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                      </div>
                      <span>File header and structure analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                      </div>
                      <span>String extraction and analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                      </div>
                      <span>Import/export table examination</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                      </div>
                      <span>Signature and hash-based identification</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                      </div>
                      <span>Entropy analysis for packed/encrypted sections</span>
                    </li>
                  </ul>
                </div>
                <div className={`p-4 border ${borderColor} rounded-lg flex items-start`}>
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Our static analysis engine can process over 40 different file formats including PE, ELF, Mach-O, Office documents, PDFs, and scripts.
                  </p>
                </div>
              </div>
              <div className={`px-6 py-4 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'} border-t ${borderColor}`}>
                <a href="#" className="text-indigo-500 font-medium flex items-center">
                  Learn more about static analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* AI Binary Review Feature */}
            <div className={`${cardBg} border ${borderColor} rounded-xl overflow-hidden shadow-lg`}>
              <div className="p-6">
                <div className={`w-12 h-12 rounded-lg ${darkMode ? 'bg-purple-900' : 'bg-purple-100'} flex items-center justify-center mb-6`}>
                  <Cpu className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI-Powered Binary Code Review</h3>
                <p className={`${mutedText} mb-6`}>
                  Leverage machine learning models trained on millions of binary samples to identify sophisticated malware and zero-day threats.
                </p>
                <div className={`rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4 mb-6`}>
                  <h4 className="font-medium mb-3">Advanced Capabilities:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-purple-400' : 'bg-purple-600'}`}></div>
                      </div>
                      <span>Neural pattern recognition of malicious code</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-purple-400' : 'bg-purple-600'}`}></div>
                      </div>
                      <span>Predictive behavior analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-purple-400' : 'bg-purple-600'}`}></div>
                      </div>
                      <span>Assembly code semantic understanding</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-purple-400' : 'bg-purple-600'}`}></div>
                      </div>
                      <span>Similarity comparison with known malware families</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-purple-400' : 'bg-purple-600'}`}></div>
                      </div>
                      <span>Automated vulnerability detection and classification</span>
                    </li>
                  </ul>
                </div>
                <div className={`p-4 border ${borderColor} rounded-lg flex items-start`}>
                  <Code className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Our neural models are trained on over 10 million samples and can detect obfuscated malware with 97.8% accuracy.
                  </p>
                </div>
              </div>
              <div className={`px-6 py-4 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'} border-t ${borderColor}`}>
                <a href="#" className="text-indigo-500 font-medium flex items-center">
                  Explore AI capabilities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 ${darkMode ? 'bg-indigo-900/20' : 'bg-indigo-100/50'}`}></div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Lock className="h-12 w-12 mx-auto mb-6 text-indigo-500" />
          <h2 className="text-3xl font-bold mb-4">Secure Your Software Today</h2>
          <p className={`max-w-2xl mx-auto mb-8 text-lg ${mutedText}`}>
            Join security professionals worldwide using our advanced malware analysis tools to protect their systems.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className={`${accentColor} text-white px-8 py-4 rounded-lg text-lg font-medium`}>
              Start Free Analysis
            </button>
            <button className={`border ${borderColor} ${cardBg} px-8 py-4 rounded-lg text-lg font-medium`}>
              Schedule Demo
            </button>
          </div>
          <p className={`mt-6 text-sm ${mutedText}`}>
            No credit card required. Analyze up to 10 files for free.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-[#1f2937]' : 'bg-gray-100'} border-t ${borderColor} py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Shield className="h-8 w-8 text-indigo-500" />
              <span className="ml-2 text-xl font-bold">SecureThread</span>
            </div>
            <div className={`text-sm ${mutedText}`}>
              © 2025 SecureThread.io All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;