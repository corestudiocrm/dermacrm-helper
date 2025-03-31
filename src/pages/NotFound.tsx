
import { useLocation, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Check authentication status
    const loginTime = localStorage.getItem('loginTime');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true' && loginTime) {
      const now = new Date().getTime();
      const loginTimeValue = parseInt(loginTime, 10);
      const fifteenMinutesInMs = 15 * 60 * 1000;
      
      if (now - loginTimeValue < fifteenMinutesInMs) {
        setIsAuthenticated(true);
      }
    }
  }, [location.pathname]);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <Link to="/index" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
