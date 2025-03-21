
import React from 'react';
import { motion } from 'framer-motion';
import { isToday } from 'date-fns';

import SearchToolbar from './list/SearchToolbar';
import EmptyState from './list/EmptyState';
import DailyView from './list/DailyView';
import AllAppointmentsView from './list/AllAppointmentsView';
import { useAppointmentsFiltering } from './list/useAppointmentsFiltering';

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
    isToday: currentDateIsToday
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
      <SearchToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        currentDate={currentDate}
        onPreviousDay={handlePreviousDay}
        onNextDay={handleNextDay}
        onToday={handleToday}
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
    </div>
  );
};

export default AppointmentsList;
