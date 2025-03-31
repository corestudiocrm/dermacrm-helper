
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
  
  // Use regular state instead of constantly checking localStorage
  // This prevents excessive re-renders
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Function to check authentication
    const checkAuth = () => {
      const loginTime = localStorage.getItem('loginTime');
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      
      if (isLoggedIn === 'true' && loginTime) {
        const now = new Date().getTime();
        const loginTimeValue = parseInt(loginTime, 10);
        const fifteenMinutesInMs = 15 * 60 * 1000;
        
        if (now - loginTimeValue < fifteenMinutesInMs) {
          setIsAuthenticated(true);
        } else {
          // Session expired
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('loginTime');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    // Check auth on mount
    checkAuth();

    // Set up interval to periodically check auth status
    // This is more efficient than checking on every render
    const authInterval = setInterval(checkAuth, 60000); // Check every minute

    return () => clearInterval(authInterval);
  }, []);

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
              
              <Route path="/clients" element={
                isAuthenticated ? 
                <MainLayout>
                  <Clients />
                </MainLayout> : 
                <Navigate to="/login" />
              } />
              
              {/* Client Routes */}
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
              
              {/* Appointment Routes */}
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
