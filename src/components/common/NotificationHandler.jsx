import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const NotificationHandler = () => {
  const { user } = useAuth();

  useEffect(() => {
    if ('Notification' in window && user) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, [user]);

  const showNotification = (title, options = {}) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        ...options
      });
    }
  };

  // Listen for various events that should trigger notifications
  useEffect(() => {
    const handleEmergencyAlert = () => {
      showNotification('Emergency Alert', {
        body: 'A field worker has activated an emergency alert',
        tag: 'emergency',
        requireInteraction: true
      });
    };

    const handleMissedCheckIn = () => {
      showNotification('Missed Check-in', {
        body: 'A field worker has missed their scheduled check-in',
        tag: 'missed-checkin'
      });
    };

    // Add event listeners for custom events
    window.addEventListener('emergency-alert', handleEmergencyAlert);
    window.addEventListener('missed-checkin', handleMissedCheckIn);

    return () => {
      window.removeEventListener('emergency-alert', handleEmergencyAlert);
      window.removeEventListener('missed-checkin', handleMissedCheckIn);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default NotificationHandler;