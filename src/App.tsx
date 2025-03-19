
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
import Index from "./pages/Index";
import Clients from "./pages/Clients";
import Appointments from "./pages/Appointments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <CrmProvider>
        <TooltipProvider>
          <Toaster />
          <SonnerToaster position="top-right" richColors closeButton />
          
          <BrowserRouter>
            <div className="min-h-screen bg-background flex">
              <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
              
              <div className="flex-1 relative flex flex-col">
                <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                
                <main className="flex-1 overflow-auto pt-16">
                  <div className="container px-4 py-6 md:px-6 md:py-8">
                    <AnimatePresence mode="wait">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/clients" element={<Clients />} />
                        <Route path="/clients/:id" element={<Clients />} />
                        <Route path="/clients/new" element={<Clients action="new" />} />
                        <Route path="/clients/edit/:id" element={<Clients action="edit" />} />
                        <Route path="/appointments" element={<Appointments />} />
                        <Route path="/appointments/:id" element={<Appointments />} />
                        <Route path="/appointments/new" element={<Appointments action="new" />} />
                        <Route path="/appointments/edit/:id" element={<Appointments action="edit" />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </AnimatePresence>
                  </div>
                </main>
              </div>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </CrmProvider>
    </QueryClientProvider>
  );
};

export default App;
