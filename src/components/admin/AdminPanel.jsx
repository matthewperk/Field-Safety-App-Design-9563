import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import UserManagement from './UserManagement';
import Reports from './Reports';
import SystemSettings from './SystemSettings';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiFileText, FiSettings, FiMenu, FiX, FiLogOut, FiUser } = FiIcons;

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { id: 'users', label: 'User Management', icon: FiUsers },
    { id: 'reports', label: 'Reports', icon: FiFileText },
    { id: 'settings', label: 'System Settings', icon: FiSettings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <UserManagement />;
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
            <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-gray-900">{user?.name}</div>
              <div className="text-xs text-gray-500">{user?.department}</div>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiUser} className="text-purple-600 text-sm" />
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
                    ? 'bg-purple-50 text-purple-700 border-r-4 border-purple-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                } transition-colors`}
              >
                <SafeIcon icon={tab.icon} className={activeTab === tab.id ? 'text-purple-600' : 'text-gray-400'} />
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
                    ? 'text-purple-700 border-b-2 border-purple-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                } transition-colors`}
              >
                <SafeIcon icon={tab.icon} className={activeTab === tab.id ? 'text-purple-600' : 'text-gray-400'} />
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
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUser} className="text-purple-600" />
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
                    ? 'bg-purple-50 text-purple-700 border-r-4 border-purple-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                } transition-colors`}
              >
                <SafeIcon icon={tab.icon} className={activeTab === tab.id ? 'text-purple-600' : 'text-gray-400'} />
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

export default AdminPanel;