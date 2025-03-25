
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { isToday, format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';

import SearchToolbar from './list/SearchToolbar';
import EmptyState from './list/EmptyState';
import DailyView from './list/DailyView';
import AllAppointmentsView from './list/AllAppointmentsView';
import CalendarView from './list/CalendarView';
import { useAppointmentsFiltering } from './list/useAppointmentsFiltering';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AppointmentsList: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    currentDate,
    viewMode,
    setViewMode,
    handlePreviousDay,
    handleNextDay,
    handleToday,
    sortedAppointments,
    isToday: currentDateIsToday,
    selectedDoctorId,
    setSelectedDoctorId,
    selectedStatus,
    setSelectedStatus
  } = useAppointmentsFiltering();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4 w-full sm:w-auto">
          <TabsTrigger value="list">Vista Lista</TabsTrigger>
          <TabsTrigger value="calendar">Vista Calendario</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-6">
          <SearchToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            currentDate={currentDate}
            onPreviousDay={handlePreviousDay}
            onNextDay={handleNextDay}
            onToday={handleToday}
            selectedDoctorId={selectedDoctorId}
            onDoctorChange={setSelectedDoctorId}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />

          {sortedAppointments.length === 0 ? (
            <EmptyState 
              isDayView={viewMode === 'day'} 
              hasSearchQuery={searchQuery.length > 0}
              currentDateIsToday={currentDateIsToday}
            />
          ) : (
            <motion.div 
              className="space-y-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {viewMode === 'day' ? (
                <DailyView appointments={sortedAppointments} />
              ) : (
                <AllAppointmentsView appointments={sortedAppointments} />
              )}
            </motion.div>
          )}
        </TabsContent>
        
        <TabsContent value="calendar">
          <CalendarView 
            selectedDoctorId={selectedDoctorId}
            onDoctorChange={setSelectedDoctorId}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentsList;
