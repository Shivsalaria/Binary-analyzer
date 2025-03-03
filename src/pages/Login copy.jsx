import { Shield } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/slice/authSlice';
import { verifyToken } from '../services/operations/auth';


const AuthPages = () => {
    const [darkMode, setDarkMode] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleLogin = async () => {
        window.location.href = 'https://apimalwarelab.securethread.io/auth/login/google';
    };

    const handleAuthCallback = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            sessionStorage.setItem('token', token);
            dispatch(setToken(token));

            const isValidToken = await verifyToken(token);
            // console.log('Token verification:', isValidToken);

            if (isValidToken) {
                navigate('/dashboard', { replace: true });
            } else {
                sessionStorage.removeItem('token'); 
                dispatch(setToken(null));
                navigate('/login', { replace: true });
            }
        } else {
            // console.log('No token found in URL parameters');
            navigate('/login', { replace: true });
        }
    };


    useEffect(() => {
        handleAuthCallback();
    }, []);

    // Theme classes
    const mainBg = darkMode ? 'bg-[#1f2937]' : 'bg-gray-50';
    const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
    const mutedText = darkMode ? 'text-gray-400' : 'text-gray-500';
    const cardBg = darkMode ? 'bg-[#2d3a4d]' : 'bg-white';
    const linkColor = darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800';


    return (
        <div className={`${mainBg} ${textColor} min-h-screen font-sans`}>
            {/* Navbar */}
            <nav className={`${darkMode ? 'bg-[#1f2937]' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center">
                                <Shield className="h-10 w-10 text-indigo-500" />
                                <span className="ml-2 text-xl font-bold">
                                    Malware Analysis <br />
                                    <span className="text-sm font-thin">by Secure Thread</span>
                                </span>
                            </Link>
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
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-64px)]">
                <div className={`w-full max-w-md ${cardBg} rounded-xl shadow-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    {/* Form */}
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4">
                                <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h2 className="text-2xl font-bold">Welcome Back</h2>
                            <p className={`mt-2 ${mutedText}`}>Sign in to access the malware analysis</p>
                        </div>

                        <div>
                            <button
                                type="button"
                                className={`w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-700'} hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-500`}
                                onClick={handleGoogleLogin}
                            >
                                <FcGoogle className="h-5 w-5 mr-2" />
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className={`text-sm ${mutedText}`}>
                        Need help? <a href="#" className={linkColor}>Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPages;