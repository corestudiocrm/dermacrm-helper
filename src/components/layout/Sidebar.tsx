
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, Calendar, UserPlus, CalendarPlus, Home, ChevronLeft, Globe, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import SocialIntegrationDialog from '@/components/social/SocialIntegrationDialog';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const [socialDialogOpen, setSocialDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const mainNavItems = [
    { to: '/', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { to: '/clients', label: 'Clienti', icon: <User className="h-5 w-5" /> },
    { to: '/appointments', label: 'Appuntamenti', icon: <Calendar className="h-5 w-5" /> },
    { to: '/whatsapp-reminders', label: 'Reminder WhatsApp', icon: <Bell className="h-5 w-5" /> },
  ];

  const quickActions = [
    { to: '/clients/new', label: 'Nuovo Cliente', icon: <UserPlus className="h-5 w-5" /> },
    { to: '/appointments/new', label: 'Nuovo Appuntamento', icon: <CalendarPlus className="h-5 w-5" /> },
  ];
  
  const otherActions = [
    { 
      action: () => setSocialDialogOpen(true), 
      label: 'Integra i tuoi social', 
      icon: <Globe className="h-5 w-5" /> 
    },
  ];

  // If sidebar is not open, don't render anything 
  if (!open) {
    return null;
  }

  return (
    <>
      {/* Backdrop overlay for mobile */}
      <div 
        className="fixed inset-0 bg-black/30 z-30"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      
      <div
        className="fixed inset-y-0 left-0 z-40 w-64 border-r border-core-100 bg-white transition-transform duration-300 ease-in-out translate-x-0"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4 border-b border-core-100">
            <span className="text-lg font-semibold bg-gradient-to-r from-core-800 to-core-600 bg-clip-text text-transparent">
              CoreStudio CRM
            </span>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setOpen(false)}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          
          <ScrollArea className="flex-1 py-4">
            <div className="px-3 space-y-6">
              <div className="space-y-1">
                <h3 className="px-3 text-xs font-medium uppercase tracking-wider text-core-500">
                  Navigazione
                </h3>
                <nav className="space-y-1">
                  {mainNavItems.map((item, index) => (
                    <NavLink
                      key={index}
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) => cn(
                        "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                        isActive 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "text-core-600 hover:bg-core-50"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
              
              <div className="space-y-1">
                <h3 className="px-3 text-xs font-medium uppercase tracking-wider text-core-500">
                  Azioni rapide
                </h3>
                <nav className="space-y-1">
                  {quickActions.map((item, index) => (
                    <NavLink
                      key={index}
                      to={item.to}
                      className={({ isActive }) => cn(
                        "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                        isActive 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "text-core-600 hover:bg-core-50"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
              
              <div className="space-y-1">
                <h3 className="px-3 text-xs font-medium uppercase tracking-wider text-core-500">
                  Funzionalità
                </h3>
                <nav className="space-y-1">
                  {otherActions.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.action();
                        setOpen(false);
                      }}
                      className="flex w-full items-center px-3 py-2 rounded-md text-sm transition-colors text-core-600 hover:bg-core-50"
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t border-core-100">
            <div className="rounded-md bg-core-50 p-3">
              <p className="text-xs text-core-600">
                Benvenuto in CoreStudio CRM, il tuo assistente per la gestione dei pazienti e degli appuntamenti
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Social Integration Dialog */}
      <SocialIntegrationDialog 
        open={socialDialogOpen} 
        onOpenChange={setSocialDialogOpen} 
      />
    </>
  );
};

export default Sidebar;
