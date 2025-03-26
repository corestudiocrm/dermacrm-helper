
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Index from './pages/Index';
import Clients from './pages/Clients';
import ClientDetail from './pages/ClientDetail';
import Appointments from './pages/Appointments';
import NotFound from './pages/NotFound';
import ClientsOverview from './pages/ClientsOverview';

import WhatsAppReminders from './pages/WhatsAppReminders';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
  <Route path="/" element={<Login />} /> {/* ora la root è il login */}
  <Route path="/login" element={<Login />} />
  <Route path="/index" element={<Index />} /> {/* se vuoi accedere a Index altrove */}
  <Route path="/clients" element={<Clients />} />
  <Route path="/clients/:id" element={<ClientDetail />} />
  <Route path="/appointments" element={<Appointments />} />
  <Route path="/clients-overview" element={<ClientsOverview />} />
  <Route path="/whatsapp-reminders" element={<WhatsAppReminders />} />
  <Route path="*" element={<NotFound />} />
</Routes>

  );
};

export default AppRoutes;
