import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { format, addHours, addDays } from 'date-fns';

const CalendarContext = createContext();

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};

export const CalendarProvider = ({ children }) => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // Mock calendar events
  useEffect(() => {
    if (user && user.role === 'field_worker') {
      const now = new Date();
      const mockEvents = [
        {
          id: 'event-1',
          title: 'Building Inspection - 123 Main St',
          location: '123 Main Street, City Center',
          startTime: format(addHours(now, 1), "yyyy-MM-dd'T'HH:mm:ss"),
          endTime: format(addHours(now, 2), "yyyy-MM-dd'T'HH:mm:ss"),
          type: 'inspection',
          description: 'Annual building safety inspection',
          coordinates: { lat: -37.8136, lng: 144.9631 }
        },
        {
          id: 'event-2',
          title: 'Park Maintenance - Central Park',
          location: 'Central Park, 456 Park Ave',
          startTime: format(addHours(now, 3), "yyyy-MM-dd'T'HH:mm:ss"),
          endTime: format(addHours(now, 5), "yyyy-MM-dd'T'HH:mm:ss"),
          type: 'maintenance',
          description: 'Routine maintenance and cleanup',
          coordinates: { lat: -37.8140, lng: 144.9633 }
        },
        {
          id: 'event-3',
          title: 'Site Assessment - New Development',
          location: '789 Development Road',
          startTime: format(addDays(now, 1), "yyyy-MM-dd'T'09:00:00"),
          endTime: format(addDays(now, 1), "yyyy-MM-dd'T'11:00:00"),
          type: 'assessment',
          description: 'Environmental impact assessment',
          coordinates: { lat: -37.8145, lng: 144.9640 }
        }
      ];
      setEvents(mockEvents);
    }
  }, [user]);

  // Update current and upcoming events
  useEffect(() => {
    const now = new Date();
    const current = events.find(event => {
      const start = new Date(event.startTime);
      const end = new Date(event.endTime);
      return now >= start && now <= end;
    });

    const upcoming = events
      .filter(event => new Date(event.startTime) > now)
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
      .slice(0, 3);

    setCurrentEvent(current);
    setUpcomingEvents(upcoming);
  }, [events]);

  const getCheckInFrequency = (eventType) => {
    const frequencies = {
      inspection: 30, // 30 minutes
      maintenance: 60, // 1 hour
      assessment: 45, // 45 minutes
      default: 60
    };
    return frequencies[eventType] || frequencies.default;
  };

  const getEventContext = (eventId) => {
    return events.find(event => event.id === eventId);
  };

  const value = {
    events,
    currentEvent,
    upcomingEvents,
    getCheckInFrequency,
    getEventContext
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};