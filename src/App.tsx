
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loginTime = localStorage.getItem('loginTime');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true' && loginTime) {
      const now = new Date().getTime();
      const loginTimeValue = parseInt(loginTime, 10);
      const fifteenMinutesInMs = 15 * 60 * 1000; // Changed to 15 minutes
      
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
              <Route path="/login" element={isAuthenticated ? <Navigate to="/index" replace /> : <Login />} />
              <Route path="/" element={isAuthenticated ? <Navigate to="/index" replace /> : <Navigate to="/login" replace />} />
              
              {/* Main Application Routes - Protected */}
              <Route path="/index" element={
                isAuthenticated ? 
                <MainLayout>
                  <Index />
                </MainLayout> : 
                <Navigate to="/login" replace />
              } />
              
              <Route path="/clients" element={
                isAuthenticated ? 
                <MainLayout>
                  <Clients />
                </MainLayout> : 
                <Navigate to="/login" replace />
              } />
              
              {/* Client Routes */}
              <Route path="/clients/new" element={
                isAuthenticated ? 
                <MainLayout>
                  <Clients />
                </MainLayout> : 
                <Navigate to="/login" replace />
              } />
              
              <Route path="/clients/:id" element={
                isAuthenticated ? 
                <MainLayout>
                  <ClientDetail />
                </MainLayout> : 
                <Navigate to="/login" replace />
              } />
              
              <Route path="/clients/:id/edit" element={
                isAuthenticated ? 
                <MainLayout>
                  <Clients />
                </MainLayout> : 
                <Navigate to="/login" replace />
              } />
              
              {/* Appointment Routes */}
              <Route path="/appointments" element={
                isAuthenticated ? 
                <MainLayout>
                  <Appointments />
                </MainLayout> : 
                <Navigate to="/login" replace />
              } />
              
              <Route path="/appointments/new" element={
                isAuthenticated ? 
                <MainLayout>
                  <Appointments />
                </MainLayout> : 
                <Navigate to="/login" replace />
              } />

              <Route path="/appointments/:id" element={
                isAuthenticated ? 
                <MainLayout>
                  <Appointments />
                </MainLayout> : 
                <Navigate to="/login" replace />
              } />
              
              <Route path="/clients-overview" element={
                isAuthenticated ? 
                <MainLayout>
                  <ClientsOverview />
                </MainLayout> : 
                <Navigate to="/login" replace />
              } />
              
              <Route path="/whatsapp-reminders" element={
                isAuthenticated ? 
                <MainLayout>
                  <WhatsAppReminders />
                </MainLayout> : 
                <Navigate to="/login" replace />
              } />
              
              {/* Landing Pages */}
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
