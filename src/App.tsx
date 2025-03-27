
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { CrmProvider } from "./context/CrmContext";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import AppRoutes from "./routes";

const queryClient = new QueryClient();

const App = () => {
  // Setting sidebar closed by default
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <CrmProvider>
        <TooltipProvider>
          <Toaster />
          <SonnerToaster position="top-right" richColors closeButton />
          
          <BrowserRouter>
            <Routes>
              {/* Login Page (no sidebar/navbar) */}
              <Route path="/login" element={<AppRoutes />} />
              
              {/* Landing Pages (no sidebar/navbar) */}
              <Route path="/landing/*" element={<AppRoutes />} />

              {/* Main Application Routes */}
              <Route path="*" element={
                <div className="min-h-screen bg-background flex">
                  <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                  
                  <div className="flex-1 relative flex flex-col">
                    <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    
                    <main className="flex-1 overflow-auto pt-16">
                      <div className="container px-4 py-6 md:px-6 md:py-8">
                        <AnimatePresence mode="wait">
                          <AppRoutes />
                        </AnimatePresence>
                      </div>
                    </main>
                  </div>
                </div>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CrmProvider>
    </QueryClientProvider>
  );
};

export default App;
