import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiClock, FiAlertTriangle, FiMapPin, FiSliders, FiBell, FiUsers, FiLock } = FiIcons;

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    checkInFrequency: {
      inspection: 30,
      maintenance: 60,
      assessment: 45
    },
    locationTracking: {
      interval: 5,
      accuracyThreshold: 50
    },
    notifications: {
      emergencyAlerts: true,
      missedCheckIns: true,
      systemUpdates: false,
      emailAlerts: true
    },
    security: {
      passwordExpiry: 90,
      sessionTimeout: 30,
      twoFactorAuth: true
    }
  });
  
  const [activeTab, setActiveTab] = useState('check-in');
  
  const handleSettingChange = (category, setting, value) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: value
      }
    });
  };
  
  const saveSettings = () => {
    console.log('Saving settings:', settings);
    // In a real app, this would send the settings to the backend
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Settings Navigation */}
        <div className="md:w-64 bg-gray-50 p-4 md:border-r border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h2>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('check-in')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'check-in' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <SafeIcon icon={FiClock} className={activeTab === 'check-in' ? 'text-purple-600' : 'text-gray-400'} />
              <span>Check-in Settings</span>
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'location' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <SafeIcon icon={FiMapPin} className={activeTab === 'location' ? 'text-purple-600' : 'text-gray-400'} />
              <span>Location Tracking</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'notifications' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <SafeIcon icon={FiBell} className={activeTab === 'notifications' ? 'text-purple-600' : 'text-gray-400'} />
              <span>Notifications</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'security' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <SafeIcon icon={FiLock} className={activeTab === 'security' ? 'text-purple-600' : 'text-gray-400'} />
              <span>Security</span>
            </button>
          </nav>
        </div>
        
        {/* Settings Content */}
        <div className="flex-1 p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Check-in Settings */}
            {activeTab === 'check-in' && (
              <>
                <div className="flex items-center space-x-2 mb-6">
                  <SafeIcon icon={FiClock} className="text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Check-in Settings</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Check-in Frequency by Activity Type</h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Set how often field workers need to check in during different activities (in minutes)
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Inspection</label>
                        <input
                          type="number"
                          value={settings.checkInFrequency.inspection}
                          onChange={(e) => handleSettingChange('checkInFrequency', 'inspection', parseInt(e.target.value))}
                          min="5"
                          max="120"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Maintenance</label>
                        <input
                          type="number"
                          value={settings.checkInFrequency.maintenance}
                          onChange={(e) => handleSettingChange('checkInFrequency', 'maintenance', parseInt(e.target.value))}
                          min="5"
                          max="120"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Assessment</label>
                        <input
                          type="number"
                          value={settings.checkInFrequency.assessment}
                          onChange={(e) => handleSettingChange('checkInFrequency', 'assessment', parseInt(e.target.value))}
                          min="5"
                          max="120"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                      <SafeIcon icon={FiAlertTriangle} className="text-yellow-500" />
                      <span>Setting check-in frequencies too high may cause alert fatigue</span>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {/* Location Tracking Settings */}
            {activeTab === 'location' && (
              <>
                <div className="flex items-center space-x-2 mb-6">
                  <SafeIcon icon={FiMapPin} className="text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Location Tracking</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Update Interval (minutes)</label>
                      <input
                        type="number"
                        value={settings.locationTracking.interval}
                        onChange={(e) => handleSettingChange('locationTracking', 'interval', parseInt(e.target.value))}
                        min="1"
                        max="60"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500">How often to update worker location (in minutes)</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Accuracy Threshold (meters)</label>
                      <input
                        type="number"
                        value={settings.locationTracking.accuracyThreshold}
                        onChange={(e) => handleSettingChange('locationTracking', 'accuracyThreshold', parseInt(e.target.value))}
                        min="10"
                        max="200"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500">Minimum accuracy required for location updates</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                      <SafeIcon icon={FiAlertTriangle} className="text-yellow-500" />
                      <span>More frequent updates may impact battery life of worker devices</span>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <>
                <div className="flex items-center space-x-2 mb-6">
                  <SafeIcon icon={FiBell} className="text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">System Notifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700">Emergency Alerts</label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            checked={settings.notifications.emergencyAlerts}
                            onChange={(e) => handleSettingChange('notifications', 'emergencyAlerts', e.target.checked)}
                            className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-purple-600"
                          />
                          <label className={`block overflow-hidden h-6 rounded-full ${settings.notifications.emergencyAlerts ? 'bg-purple-300' : 'bg-gray-300'} cursor-pointer`} />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700">Missed Check-ins</label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            checked={settings.notifications.missedCheckIns}
                            onChange={(e) => handleSettingChange('notifications', 'missedCheckIns', e.target.checked)}
                            className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-purple-600"
                          />
                          <label className={`block overflow-hidden h-6 rounded-full ${settings.notifications.missedCheckIns ? 'bg-purple-300' : 'bg-gray-300'} cursor-pointer`} />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700">System Updates</label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            checked={settings.notifications.systemUpdates}
                            onChange={(e) => handleSettingChange('notifications', 'systemUpdates', e.target.checked)}
                            className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-purple-600"
                          />
                          <label className={`block overflow-hidden h-6 rounded-full ${settings.notifications.systemUpdates ? 'bg-purple-300' : 'bg-gray-300'} cursor-pointer`} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Email Notifications</h4>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-700">Send Email Alerts</label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          checked={settings.notifications.emailAlerts}
                          onChange={(e) => handleSettingChange('notifications', 'emailAlerts', e.target.checked)}
                          className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-purple-600"
                        />
                        <label className={`block overflow-hidden h-6 rounded-full ${settings.notifications.emailAlerts ? 'bg-purple-300' : 'bg-gray-300'} cursor-pointer`} />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {/* Security Settings */}
            {activeTab === 'security' && (
              <>
                <div className="flex items-center space-x-2 mb-6">
                  <SafeIcon icon={FiLock} className="text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Password Expiry (days)</label>
                      <input
                        type="number"
                        value={settings.security.passwordExpiry}
                        onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
                        min="30"
                        max="180"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500">Number of days before passwords expire</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                      <input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                        min="5"
                        max="120"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500">Minutes of inactivity before automatic logout</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">Two-factor Authentication</label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          checked={settings.security.twoFactorAuth}
                          onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                          className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-purple-600"
                        />
                        <label className={`block overflow-hidden h-6 rounded-full ${settings.security.twoFactorAuth ? 'bg-purple-300' : 'bg-gray-300'} cursor-pointer`} />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Require two-factor authentication for all users</p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
          
          <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
            <button
              onClick={saveSettings}
              className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <SafeIcon icon={FiSave} />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;