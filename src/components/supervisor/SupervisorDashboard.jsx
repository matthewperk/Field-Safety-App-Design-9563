import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import TeamStatus from './TeamStatus';
import LiveMap from './LiveMap';
import AlertsPanel from './AlertsPanel';
import MessagingCenter from './MessagingCenter';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiMap, FiAlertTriangle, FiMessageCircle, FiMenu, FiX, FiLogOut, FiUser } = FiIcons;

const SupervisorDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('team');
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { id: 'team', label: 'Team Status', icon: FiUsers },
    { id: 'map', label: 'Live Map', icon: FiMap },
    { id: 'alerts', label: 'Alerts', icon: FiAlertTriangle },
    { id: 'messages', label: 'Messages', icon: FiMessageCircle }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'team':
        return <TeamStatus />;
      case 'map':
        return <LiveMap />;
      case 'alerts':
        return <AlertsPanel />;
      case 'messages':
        return <MessagingCenter />;
      default:
        return <TeamStatus />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiMenu} className="text-gray-600" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">Supervisor Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-gray-900">{user?.name}</div>
              <div className="text-xs text-gray-500">{user?.department}</div>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiUser} className="text-blue-600 text-sm" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar - Desktop */}
        <div className="hidden md:flex md:w-64 bg-white border-r border-gray-200 flex-col">
          <nav className="flex-1 pt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left ${
                  activeTab === tab.id 
                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                } transition-colors`}
              >
                <SafeIcon icon={tab.icon} className={activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiLogOut} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="bg-white border-b border-gray-200 md:hidden">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center py-3 px-4 ${
                  activeTab === tab.id 
                    ? 'text-blue-700 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                } transition-colors`}
              >
                <SafeIcon icon={tab.icon} className={activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'} />
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 overflow-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: menuOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl md:hidden"
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiX} className="text-gray-600" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUser} className="text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{user?.name}</div>
                <div className="text-sm text-gray-500">{user?.department}</div>
              </div>
            </div>
          </div>
          
          <nav className="pt-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left ${
                  activeTab === tab.id 
                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                } transition-colors`}
              >
                <SafeIcon icon={tab.icon} className={activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
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
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}
    </div>
  );
};

export default SupervisorDashboard;