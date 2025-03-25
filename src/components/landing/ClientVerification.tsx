
import React, { useState } from 'react';
import { User, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCrm } from '@/context/CrmContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

// Schema for client ID
const clientIdSchema = z.object({
  clientId: z.string().min(1, 'Il codice cliente è obbligatorio'),
});

// Schema for verification
const verificationSchema = z.object({
  code: z.string().length(6, 'Il codice di verifica deve essere di 6 cifre'),
});

interface ClientVerificationProps {
  onVerificationSuccess: (clientId: string) => void;
}

const ClientVerification: React.FC<ClientVerificationProps> = ({
  onVerificationSuccess,
}) => {
  const { getClient } = useCrm();
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'phone'>('email');
  const [clientInfo, setClientInfo] = useState<{ id: string; email: string; phone: string } | null>(null);
  const [step, setStep] = useState<'id' | 'verification'>('id');

  // Form for client ID
  const idForm = useForm<z.infer<typeof clientIdSchema>>({
    resolver: zodResolver(clientIdSchema),
    defaultValues: {
      clientId: '',
    },
  });

  // Form for verification code
  const verificationForm = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: '',
    },
  });

  // Handle client ID submission
  const onSubmitId = (values: z.infer<typeof clientIdSchema>) => {
    const client = getClient(values.clientId);
    
    if (!client) {
      idForm.setError('clientId', { message: 'Codice cliente non trovato' });
      return;
    }
    
    setClientInfo({
      id: client.id,
      email: client.email,
      phone: client.phone,
    });
    
    setStep('verification');
    
    // In a real app, this would send a verification code to the client's email or phone
    console.log(`Sending verification code to ${verificationMethod === 'email' ? client.email : client.phone}`);
  };

  // Handle verification code submission
  const onSubmitVerification = (values: z.infer<typeof verificationSchema>) => {
    // In a real app, this would verify the code against what was sent
    // For demo purposes, we'll accept any 6-digit code
    if (values.code.length === 6 && clientInfo) {
      onVerificationSuccess(clientInfo.id);
    }
  };

  // Obfuscate email for display
  const obfuscateEmail = (email: string) => {
    const parts = email.split('@');
    if (parts.length !== 2) return '***@***';
    
    const name = parts[0];
    const domain = parts[1];
    
    const obfuscatedName = name.length <= 3 
      ? name.charAt(0) + '***' 
      : name.charAt(0) + '***' + name.charAt(name.length - 1);
    
    return `${obfuscatedName}@${domain}`;
  };

  // Obfuscate phone for display
  const obfuscatePhone = (phone: string) => {
    return phone.slice(0, 3) + '****' + phone.slice(-3);
  };

  return (
    <div className="space-y-6">
      {step === 'id' ? (
        <div>
          <div className="mb-6 text-center">
            <User className="h-12 w-12 mx-auto text-primary" />
            <h2 className="text-lg font-semibold mt-4">Accedi all'Area Clienti</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Inserisci il tuo codice cliente per accedere
            </p>
          </div>

          <Form {...idForm}>
            <form onSubmit={idForm.handleSubmit(onSubmitId)} className="space-y-4">
              <FormField
                control={idForm.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Codice Cliente</FormLabel>
                    <FormControl>
                      <Input placeholder="Inserisci il tuo codice cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Continua
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div>
          <div className="mb-6 text-center">
            <CheckCircle2 className="h-12 w-12 mx-auto text-primary" />
            <h2 className="text-lg font-semibold mt-4">Verifica la tua identità</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Abbiamo inviato un codice di verifica
            </p>
          </div>

          <Tabs
            defaultValue={verificationMethod}
            onValueChange={(v) => setVerificationMethod(v as 'email' | 'phone')}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Telefono</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="mt-4">
              {clientInfo && (
                <p className="text-sm text-center mb-4">
                  Abbiamo inviato un codice a {obfuscateEmail(clientInfo.email)}
                </p>
              )}
            </TabsContent>
            
            <TabsContent value="phone" className="mt-4">
              {clientInfo && (
                <p className="text-sm text-center mb-4">
                  Abbiamo inviato un SMS a {obfuscatePhone(clientInfo.phone)}
                </p>
              )}
            </TabsContent>
          </Tabs>

          <Form {...verificationForm}>
            <form onSubmit={verificationForm.handleSubmit(onSubmitVerification)} className="space-y-6 mt-4">
              <FormField
                control={verificationForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="mx-auto max-w-xs">
                    <FormLabel>Codice di Verifica</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Button type="submit" className="w-full">
                  Verifica
                </Button>
                
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full text-sm"
                  onClick={() => setStep('id')}
                >
                  Torna indietro
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ClientVerification;
