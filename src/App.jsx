import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoginScreen from './components/auth/LoginScreen';
import FieldWorkerApp from './components/fieldworker/FieldWorkerApp';

// Import placeholder components until the real ones are fully implemented
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LocationProvider } from './contexts/LocationContext';
import { MessageProvider } from './contexts/MessageContext';
import { CalendarProvider } from './contexts/CalendarContext';
import LoadingSpinner from './components/common/LoadingSpinner';
import NotificationHandler from './components/common/NotificationHandler';
import './App.css';

// Placeholder components until the real ones are fully implemented
const SupervisorDashboard = () => (
  <div className="min-h-screen bg-gray-100 p-4">
    <h1 className="text-2xl font-bold">Supervisor Dashboard</h1>
    <p>This component is under development.</p>
  </div>
);

const AdminPanel = () => (
  <div className="min-h-screen bg-gray-100 p-4">
    <h1 className="text-2xl font-bold">Admin Panel</h1>
    <p>This component is under development.</p>
  </div>
);

function AppContent() {
  const { user, loading } = useAuth();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  const getDefaultRoute = () => {
    switch (user.role) {
      case 'field_worker': return '/field-worker';
      case 'supervisor': return '/supervisor';
      case 'admin': return '/admin';
      default: return '/field-worker';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isOnline && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-red-600 text-white p-2 text-center text-sm font-medium"
        >
          You're offline. Some features may not work properly.
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
          <Route path="/field-worker" element={<FieldWorkerApp />} />
          <Route path="/supervisor" element={<SupervisorDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </AnimatePresence>

      <NotificationHandler />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <MessageProvider>
          <CalendarProvider>
            <Router>
              <AppContent />
            </Router>
          </CalendarProvider>
        </MessageProvider>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;