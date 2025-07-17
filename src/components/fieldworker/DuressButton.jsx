import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAlertTriangle, FiPhone, FiEyeOff } = FiIcons;

const DuressButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  const handleEmergencyAlert = (type) => {
    setAlertSent(true);
    // Send emergency alert
    console.log(`Emergency alert sent: ${type}`);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setAlertSent(false);
      setShowOptions(false);
    }, 3000);
  };

  if (alertSent) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-red-600 text-white p-6 rounded-xl shadow-lg text-center"
      >
        <SafeIcon icon={FiAlertTriangle} className="text-4xl mx-auto mb-2" />
        <h3 className="text-lg font-bold mb-1">Emergency Alert Sent</h3>
        <p className="text-sm opacity-90">
          Help is on the way. Stay safe.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowOptions(!showOptions)}
        className="w-full bg-red-600 hover:bg-red-700 text-white p-6 rounded-xl shadow-lg font-bold text-lg transition-colors"
      >
        <SafeIcon icon={FiAlertTriangle} className="text-3xl mx-auto mb-2" />
        EMERGENCY
      </motion.button>

      {showOptions && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-10"
        >
          <button
            onClick={() => handleEmergencyAlert('panic')}
            className="w-full p-4 text-left hover:bg-red-50 transition-colors border-b border-gray-100"
          >
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiPhone} className="text-red-600" />
              <div>
                <div className="font-medium text-gray-900">Panic Alert</div>
                <div className="text-sm text-gray-500">
                  Immediate help needed - calls emergency services
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleEmergencyAlert('silent')}
            className="w-full p-4 text-left hover:bg-orange-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiEyeOff} className="text-orange-600" />
              <div>
                <div className="font-medium text-gray-900">Silent Duress</div>
                <div className="text-sm text-gray-500">
                  Discreet alert to supervisor only
                </div>
              </div>
            </div>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default DuressButton;