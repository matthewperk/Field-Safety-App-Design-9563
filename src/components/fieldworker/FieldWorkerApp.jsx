import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from '../../contexts/LocationContext';
import { useCalendar } from '../../contexts/CalendarContext';
import { useMessages } from '../../contexts/MessageContext';
import SafeIcon from '../common/SafeIcon';
import DuressButton from './DuressButton';
import CheckInPanel from './CheckInPanel';
import MessagingInterface from './MessagingInterface';
import CurrentActivity from './CurrentActivity';
import QuickActions from './QuickActions';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiLogOut, FiUser, FiMapPin, FiClock } = FiIcons;

const FieldWorkerApp = () => {
  const { user, logout } = useAuth();
  const { currentLocation, isTracking } = useLocation();
  const { currentEvent, upcomingEvents } = useCalendar();
  const { unreadCount } = useMessages();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastCheckIn, setLastCheckIn] = useState(null);

  useEffect(() => {
    // Check for missed check-ins
    const checkInInterval = setInterval(() => {
      if (lastCheckIn) {
        const timeSinceCheckIn = Date.now() - new Date(lastCheckIn).getTime();
        const maxInterval = 60 * 60 * 1000; // 1 hour
        if (timeSinceCheckIn > maxInterval) {
          // Trigger missed check-in alert
          console.log('Missed check-in detected');
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkInInterval);
  }, [lastCheckIn]);

  const handleCheckIn = (location, notes = '') => {
    setLastCheckIn(new Date().toISOString());
    // Send check-in to server
    console.log('Check-in:', {
      location,
      notes,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiMenu} className="text-gray-600" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{user?.name}</div>
              <div className="text-xs text-gray-500">{user?.department}</div>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiUser} className="text-gray-600 text-sm" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Emergency Button - Always Visible */}
        <DuressButton />

        {/* Status Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${isTracking ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm font-medium">
                {isTracking ? 'Location Tracking Active' : 'Location Tracking Off'}
              </span>
            </div>
            {currentLocation && (
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <SafeIcon icon={FiMapPin} />
                <span>±{currentLocation.accuracy}m</span>
              </div>
            )}
          </div>
        </div>

        {/* Current Activity */}
        <CurrentActivity event={currentEvent} />

        {/* Check-in Panel */}
        <CheckInPanel
          onCheckIn={handleCheckIn}
          lastCheckIn={lastCheckIn}
          currentEvent={currentEvent}
        />

        {/* Quick Actions */}
        <QuickActions />

        {/* Upcoming Events */}
        {upcomingEvents && upcomingEvents.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Upcoming Activities
            </h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <SafeIcon icon={FiClock} className="text-gray-400" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{event.title}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl"
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiX} className="text-gray-600" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <MessagingInterface />
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiLogOut} />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.div>

      {/* Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      {/* Message Badge */}
      {unreadCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-4 right-4 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg"
        >
          {unreadCount}
        </motion.div>
      )}
    </div>
  );
};

export default FieldWorkerApp;