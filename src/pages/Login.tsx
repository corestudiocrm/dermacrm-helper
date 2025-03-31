
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface LoginProps {
  setAuth?: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const navigate = useNavigate();

  // Check if already logged in - only on component mount
  useEffect(() => {
    const checkAuth = () => {
      const loginTime = localStorage.getItem('loginTime');
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      
      if (isLoggedIn === 'true' && loginTime) {
        const now = new Date().getTime();
        const loginTimeValue = parseInt(loginTime, 10);
        const fifteenMinutesInMs = 15 * 60 * 1000;
        
        if (now - loginTimeValue < fifteenMinutesInMs) {
          if (setAuth) {
            setAuth(true);
          }
          navigate('/index');
          return true;
        }
      }
      return false;
    };
    
    // Only check auth once on mount
    checkAuth();
  }, [navigate, setAuth]); // Add navigate and setAuth to dependency array

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Updated credentials
      if (username === 'admin' && password === 'corestudio') {
        // Set login state in localStorage with expiration time
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loginTime', new Date().getTime().toString());
        
        // Update authentication state in parent component
        if (setAuth) {
          setAuth(true);
        }
        
        toast.success('Login effettuato con successo');
        setShowWelcomeDialog(true);
      } else {
        toast.error('Credenziali non valide');
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleCloseWelcomeDialog = () => {
    setShowWelcomeDialog(false);
    navigate('/index');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-core-100 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              CoreStudio CRM
            </CardTitle>
            <CardDescription>
              Inserisci le tue credenziali per accedere
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="username"
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="pl-10"
                  />
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10"
                  />
                  <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Accesso in corso...' : 'Accedi'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            
          </CardFooter>
        </Card>
      </motion.div>

      {/* Welcome dialog */}
      <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ciao Doc!</DialogTitle>
            <DialogDescription>
              Questo ambiente è un ambiente di demo creato ad hoc per permetterti di testare le nostre funzionalità Basic.
              Per personalizzarlo e approfondire le funzionalità di CoreStudio compila il form sul nostro sito ufficiale
              <a href="https://corestudiocrm.it" target="_blank" rel="noopener noreferrer" className="text-primary ml-1">corestudiocrm.it</a>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={handleCloseWelcomeDialog}>Capito</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
