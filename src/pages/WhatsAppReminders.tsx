
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addDays, subDays } from 'date-fns';
import { it } from 'date-fns/locale';
import { useCrm } from '@/context/CrmContext';
import PageTransition from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar as CalendarIcon, Loader2, Check, Send, Bell } from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const WhatsAppReminders: React.FC = () => {
  const { appointments, getClient } = useCrm();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [reminderFrequency, setReminderFrequency] = useState("1");
  const [autoReminderEnabled, setAutoReminderEnabled] = useState(false);
  
  const navigate = useNavigate();
  
  // Filter appointments for selected date
  const todayAppointments = selectedDate 
    ? appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate.getDate() === selectedDate.getDate() &&
               appointmentDate.getMonth() === selectedDate.getMonth() &&
               appointmentDate.getFullYear() === selectedDate.getFullYear();
      })
    : [];
    
  const handleSendReminders = () => {
    if (todayAppointments.length === 0) {
      toast.error('Non ci sono appuntamenti per questa data');
      return;
    }
    
    setIsSending(true);
    setTimeout(() => {
      toast.success(`Inviati ${todayAppointments.length} reminder WhatsApp per gli appuntamenti del ${format(selectedDate as Date, 'd MMMM yyyy', { locale: it })}`);
      setIsSending(false);
    }, 2000);
  };
  
  const handleToggleAutoReminder = (checked: boolean) => {
    setAutoReminderEnabled(checked);
    toast.success(checked 
      ? `Reminder automatici attivati per ogni ${reminderFrequency === "1" ? "settimana" : reminderFrequency === "2" ? "2 settimane" : "mese"}` 
      : 'Reminder automatici disattivati');
  };
  
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Reminder WhatsApp</h1>
        </div>
        
        <Tabs defaultValue="manual" className="space-y-4">
          <TabsList>
            <TabsTrigger value="manual">Invio Manuale</TabsTrigger>
            <TabsTrigger value="automatic">Configurazione Automatica</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Invia reminder per data</CardTitle>
                <CardDescription>
                  Seleziona una data e invia reminder WhatsApp a tutti i pazienti che hanno un appuntamento in quella data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start text-left font-normal w-full md:w-[240px]"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                          format(selectedDate, 'PPP', { locale: it })
                        ) : (
                          <span>Seleziona una data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setIsDatePickerOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Button 
                    onClick={handleSendReminders}
                    disabled={isSending || !selectedDate || todayAppointments.length === 0}
                    className="space-x-2"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Invio in corso...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Invia reminder</span>
                      </>
                    )}
                  </Button>
                </div>
                
                {selectedDate && (
                  <Card className="border border-muted">
                    <CardHeader className="py-2">
                      <CardTitle className="text-sm font-medium">
                        Appuntamenti per {format(selectedDate, 'd MMMM yyyy', { locale: it })}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {todayAppointments.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-4 text-center">
                          Non ci sono appuntamenti per questa data
                        </p>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Orario</TableHead>
                              <TableHead>Paziente</TableHead>
                              <TableHead>Trattamento</TableHead>
                              <TableHead>Dottore</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {todayAppointments.map((appointment) => {
                              const client = getClient(appointment.clientId);
                              return (
                                <TableRow key={appointment.id}>
                                  <TableCell className="font-medium">
                                    {format(new Date(appointment.date), 'HH:mm')}
                                  </TableCell>
                                  <TableCell>
                                    {client?.firstName} {client?.lastName}
                                  </TableCell>
                                  <TableCell>{appointment.treatment}</TableCell>
                                  <TableCell>{appointment.doctor}</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="automatic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reminder automatici</CardTitle>
                <CardDescription>
                  Configura l'invio automatico di reminder WhatsApp ai pazienti
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="auto-reminder" 
                    checked={autoReminderEnabled}
                    onCheckedChange={handleToggleAutoReminder}
                  />
                  <Label htmlFor="auto-reminder">Abilita invio automatico dei reminder</Label>
                </div>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="reminder-frequency">Frequenza di invio</Label>
                    <Select
                      disabled={!autoReminderEnabled}
                      value={reminderFrequency}
                      onValueChange={setReminderFrequency}
                    >
                      <SelectTrigger id="reminder-frequency">
                        <SelectValue placeholder="Seleziona la frequenza" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Ogni settimana</SelectItem>
                        <SelectItem value="2">Ogni 2 settimane</SelectItem>
                        <SelectItem value="4">Ogni mese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reminder-days">Giorni prima dell'appuntamento</Label>
                    <Select disabled={!autoReminderEnabled} defaultValue="1">
                      <SelectTrigger id="reminder-days">
                        <SelectValue placeholder="Seleziona i giorni" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 giorno prima</SelectItem>
                        <SelectItem value="2">2 giorni prima</SelectItem>
                        <SelectItem value="3">3 giorni prima</SelectItem>
                        <SelectItem value="7">1 settimana prima</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="bg-muted rounded-md p-4 space-y-2">
                  <div className="flex items-start space-x-2">
                    <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Stato del sistema</p>
                      <p className="text-sm text-muted-foreground">
                        {autoReminderEnabled 
                          ? `I reminder verranno inviati automaticamente ogni ${
                              reminderFrequency === "1" ? "settimana" : 
                              reminderFrequency === "2" ? "2 settimane" : "mese"
                            }`
                          : "L'invio automatico dei reminder è disattivato"}
                      </p>
                    </div>
                  </div>
                  {autoReminderEnabled && (
                    <div className="flex items-center text-sm text-green-600 mt-2">
                      <Check className="h-4 w-4 mr-1" />
                      Sistema attivo
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default WhatsAppReminders;
