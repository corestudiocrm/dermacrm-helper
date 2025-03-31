
import { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Check if user is authenticated
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      // Redirect to login after a brief delay if not authenticated
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Pagina non trovata</p>
        <Link 
          to={localStorage.getItem('isLoggedIn') === 'true' ? "/index" : "/login"} 
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Torna alla Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
