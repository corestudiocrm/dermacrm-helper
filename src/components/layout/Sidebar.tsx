
import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Calendar, UserPlus, CalendarPlus, Home, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const mainNavItems = [
    { to: '/', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { to: '/clients', label: 'Clienti', icon: <User className="h-5 w-5" /> },
    { to: '/appointments', label: 'Appuntamenti', icon: <Calendar className="h-5 w-5" /> },
  ];

  const quickActions = [
    { to: '/clients/new', label: 'Nuovo Cliente', icon: <UserPlus className="h-5 w-5" /> },
    { to: '/appointments/new', label: 'Nuovo Appuntamento', icon: <CalendarPlus className="h-5 w-5" /> },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 border-r border-core-100 bg-white transition-transform duration-300 ease-in-out md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
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
            className="md:hidden"
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
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setOpen(false);
                      }
                    }}
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
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setOpen(false);
                      }
                    }}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </NavLink>
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
  );
};

export default Sidebar;
