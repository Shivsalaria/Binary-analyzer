import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { isLoggedIn } from './utils/isLogedin';
import ProtectedRoute from './utils/PrivateRoute';
import { Toaster } from 'react-hot-toast';

const Dashboard = React.lazy(() => import('./pages/DashBoard'));
const Login = React.lazy(() => import('./pages/Login'));
const Home = React.lazy(() => import('./pages/Home'));


const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isLoggedIn();
        setIsAuthenticated(authenticated);
        if (authenticated && location.pathname === '/login') {
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        // console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [location.pathname, navigate]);

  if (isAuthenticated === null) {
    return <LoadingSpinner />; 
  }


  useEffect(() => {
    const handleBackButton = (event) => {
      if (isAuthenticated && location.pathname !== "/dashboard") {
        event.preventDefault();
        navigate("/dashboard", { replace: true });
      }
    };

    window.addEventListener("popstate", handleBackButton);
    return () => window.removeEventListener("popstate", handleBackButton);
  }, [isAuthenticated, location, navigate]);



  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Suspense fallback={<LoadingSpinner />}><Home /></Suspense>} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Suspense fallback={<LoadingSpinner />}><Login /></Suspense>} />
        <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Suspense fallback={<LoadingSpinner />}><Dashboard /></Suspense></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
