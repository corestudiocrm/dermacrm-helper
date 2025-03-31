
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { CrmProvider } from "./context/CrmContext";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import Appointments from "./pages/Appointments";
import NotFound from "./pages/NotFound";
import ClientsOverview from "./pages/ClientsOverview";
import WhatsAppReminders from "./pages/WhatsAppReminders";
import LandingPage from "./pages/landing/LandingPage";
import NewClientLanding from "./pages/landing/NewClientLanding";
import ExistingClientLanding from "./pages/landing/ExistingClientLanding";

const queryClient = new QueryClient();

const App = () => {
  // Setting sidebar closed by default
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Use state for authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to check if the user is authenticated
  const checkAuthentication = () => {
    const loginTime = localStorage.getItem('loginTime');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true' && loginTime) {
      const now = new Date().getTime();
      const loginTimeValue = parseInt(loginTime, 10);
      const fifteenMinutesInMs = 15 * 60 * 1000;
      
      // Check if the login time is within the past 15 minutes
      if (now - loginTimeValue < fifteenMinutesInMs) {
        setIsAuthenticated(true);
        return true;
      } else {
        // Session expired
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loginTime');
        setIsAuthenticated(false);
        return false;
      }
    }
    
    setIsAuthenticated(false);
    return false;
  };

  // Check authentication on component mount and set up interval
  useEffect(() => {
    // Check authentication status immediately on load
    checkAuthentication();
    
    // Set up an activity listener to refresh the session timer
    const updateLoginTime = () => {
      if (isAuthenticated) {
        localStorage.setItem('loginTime', new Date().getTime().toString());
      }
    };
    
    // Add event listeners for user activity
    window.addEventListener('mousemove', updateLoginTime);
    window.addEventListener('keydown', updateLoginTime);
    window.addEventListener('click', updateLoginTime);
    
    // Set up interval to check authentication status periodically
    const authInterval = setInterval(checkAuthentication, 60000); // Check every minute
    
    return () => {
      // Clean up event listeners and interval
      window.removeEventListener('mousemove', updateLoginTime);
      window.removeEventListener('keydown', updateLoginTime);
      window.removeEventListener('click', updateLoginTime);
      clearInterval(authInterval);
    };
  }, [isAuthenticated]);

  const MainLayout = ({ children }) => (
    <div className="min-h-screen bg-background flex">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 relative flex flex-col">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto pt-16">
          <div className="container px-4 py-6 md:px-6 md:py-8">
            <AnimatePresence mode="wait">
              {children}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <CrmProvider>
        <TooltipProvider>
          <Toaster />
          <SonnerToaster position="top-right" richColors closeButton />
          
          <BrowserRouter>
            <Routes>
              {/* Login Route */}
              <Route path="/login" element={isAuthenticated ? <Navigate to="/index" /> : <Login setAuth={setIsAuthenticated} />} />
              
              {/* Default Route - Redirect based on auth status */}
              <Route path="/" element={<Navigate to={isAuthenticated ? "/index" : "/login"} />} />
              
              {/* Main Application Routes - Protected */}
              <Route path="/index" element={
                isAuthenticated ? 
                <MainLayout>
                  <Index />
                </MainLayout> : 
                <Navigate to="/login" />
              } />
              
              {/* Protected Routes */}
              <Route path="/clients" element={
                isAuthenticated ? 
                <MainLayout>
                  <Clients />
                </MainLayout> : 
                <Navigate to="/login" />
              } />
              
              <Route path="/clients/new" element={
                isAuthenticated ? 
                <MainLayout>
                  <Clients />
                </MainLayout> : 
                <Navigate to="/login" />
              } />
              
              <Route path="/clients/:id" element={
                isAuthenticated ? 
                <MainLayout>
                  <ClientDetail />
                </MainLayout> : 
                <Navigate to="/login" />
              } />
              
              <Route path="/clients/:id/edit" element={
                isAuthenticated ? 
                <MainLayout>
                  <Clients />
                </MainLayout> : 
                <Navigate to="/login" />
              } />
              
              <Route path="/appointments" element={
                isAuthenticated ? 
                <MainLayout>
                  <Appointments />
                </MainLayout> : 
                <Navigate to="/login" />
              } />
              
              <Route path="/appointments/new" element={
                isAuthenticated ? 
                <MainLayout>
                  <Appointments />
                </MainLayout> : 
                <Navigate to="/login" />
              } />

              <Route path="/appointments/:id" element={
                isAuthenticated ? 
                <MainLayout>
                  <Appointments />
                </MainLayout> : 
                <Navigate to="/login" />
              } />
              
              <Route path="/clients-overview" element={
                isAuthenticated ? 
                <MainLayout>
                  <ClientsOverview />
                </MainLayout> : 
                <Navigate to="/login" />
              } />
              
              <Route path="/whatsapp-reminders" element={
                isAuthenticated ? 
                <MainLayout>
                  <WhatsAppReminders />
                </MainLayout> : 
                <Navigate to="/login" />
              } />
              
              {/* Landing Pages - Publicly accessible */}
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/landing/new" element={<NewClientLanding />} />
              <Route path="/landing/login" element={<ExistingClientLanding />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CrmProvider>
    </QueryClientProvider>
  );
};

export default App;
