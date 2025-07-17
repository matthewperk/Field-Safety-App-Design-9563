import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from '../../contexts/LocationContext';
import { useCalendar } from '../../contexts/CalendarContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheckCircle, FiClock, FiMapPin, FiMessageSquare } = FiIcons;

const CheckInPanel = ({ onCheckIn, lastCheckIn, currentEvent }) => {
  const { currentLocation, getCurrentPosition } = useLocation();
  const { getCheckInFrequency } = useCalendar();
  const [notes, setNotes] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [timeUntilNext, setTimeUntilNext] = useState(null);

  const checkInFrequency = currentEvent 
    ? getCheckInFrequency(currentEvent.type) 
    : 60; // Default 60 minutes

  useEffect(() => {
    if (lastCheckIn) {
      const interval = setInterval(() => {
        const timeSince = Date.now() - new Date(lastCheckIn).getTime();
        const nextCheckIn = checkInFrequency * 60 * 1000; // Convert to milliseconds
        const timeLeft = nextCheckIn - timeSince;
        
        if (timeLeft > 0) {
          setTimeUntilNext(Math.ceil(timeLeft / 60000)); // Convert to minutes
        } else {
          setTimeUntilNext(0);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lastCheckIn, checkInFrequency]);

  const handleCheckIn = async () => {
    setIsChecking(true);
    
    try {
      const location = currentLocation || await getCurrentPosition();
      onCheckIn(location, notes);
      setNotes('');
    } catch (error) {
      console.error('Check-in failed:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const getCheckInStatus = () => {
    if (!lastCheckIn) return { color: 'yellow', text: 'No check-in yet' };
    
    const timeSince = Date.now() - new Date(lastCheckIn).getTime();
    const maxInterval = checkInFrequency * 60 * 1000;
    
    if (timeSince < maxInterval * 0.8) {
      return { color: 'green', text: 'On schedule' };
    } else if (timeSince < maxInterval) {
      return { color: 'yellow', text: 'Check-in due soon' };
    } else {
      return { color: 'red', text: 'Overdue' };
    }
  };

  const status = getCheckInStatus();

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Check-In Status</h3>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          status.color === 'green' ? 'bg-green-100 text-green-800' :
          status.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status.text}
        </div>
      </div>

      {lastCheckIn && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <SafeIcon icon={FiClock} />
            <span>
              Last check-in: {new Date(lastCheckIn).toLocaleTimeString()}
            </span>
          </div>
          {timeUntilNext !== null && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
              <SafeIcon icon={FiCheckCircle} />
              <span>
                {timeUntilNext > 0 
                  ? `Next check-in in ${timeUntilNext} minutes`
                  : 'Check-in overdue'
                }
              </span>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <div className="relative">
            <SafeIcon 
              icon={FiMessageSquare} 
              className="absolute left-3 top-3 text-gray-400" 
            />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about your current status..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="2"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCheckIn}
          disabled={isChecking || !currentLocation}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isChecking ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Checking In...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <SafeIcon icon={FiCheckCircle} />
              <span>Check In Now</span>
            </div>
          )}
        </motion.button>

        {currentLocation && (
          <div className="flex items-center space-x-2 text-xs text-gray-500 justify-center">
            <SafeIcon icon={FiMapPin} />
            <span>
              Location: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckInPanel;