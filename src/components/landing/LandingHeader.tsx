
import React from 'react';
import { Link } from 'react-router-dom';

interface LandingHeaderProps {
  title?: string;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ title }) => {
  return (
    <header className="py-4 px-6 border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-semibold text-primary">
            Studio Dermatologico
          </Link>
          {title && (
            <>
              <span className="mx-2 text-muted-foreground">/</span>
              <h1 className="text-lg font-medium">{title}</h1>
            </>
          )}
        </div>
        
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/landing/new" className="text-sm font-medium hover:text-primary">
            Nuovo Appuntamento
          </Link>
          <Link to="/landing/login" className="text-sm font-medium hover:text-primary">
            Area Clienti
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default LandingHeader;
