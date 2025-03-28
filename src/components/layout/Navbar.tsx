
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, User, Calendar, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const navItems = [
    { to: '/dashboard', label: 'Home', icon: <Home className="h-4 w-4 mr-2" /> },
    { to: '/clients', label: 'Clienti', icon: <User className="h-4 w-4 mr-2" /> },
    { to: '/appointments', label: 'Appuntamenti', icon: <Calendar className="h-4 w-4 mr-2" /> },
  ];

  return (
    <div className="glass fixed w-full z-50 top-0 border-b border-slate-200/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              className="mr-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <NavLink to="/dashboard" className="flex items-center">
              <span className="text-lg font-semibold bg-gradient-to-r from-core-800 to-core-600 bg-clip-text text-transparent">CoreStudio CRM</span>
            </NavLink>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-core-600 hover:bg-core-50"
                )}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {showMobileMenu ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {showMobileMenu && (
        <div className="md:hidden glass animate-fade-in border-t border-slate-200/50">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => cn(
                    "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                    isActive 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-core-600 hover:bg-core-50"
                  )}
                  onClick={() => setShowMobileMenu(false)}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
