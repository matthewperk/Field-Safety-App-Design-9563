import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCamera, FiMic, FiFileText, FiAlertCircle } = FiIcons;

const QuickActions = () => {
  const [activeAction, setActiveAction] = useState(null);

  const actions = [
    {
      id: 'photo',
      icon: FiCamera,
      label: 'Take Photo',
      color: 'blue',
      action: () => {
        // Trigger camera
        console.log('Opening camera...');
      }
    },
    {
      id: 'voice',
      icon: FiMic,
      label: 'Voice Note',
      color: 'green',
      action: () => {
        // Start voice recording
        console.log('Starting voice recording...');
      }
    },
    {
      id: 'incident',
      icon: FiAlertCircle,
      label: 'Report Incident',
      color: 'orange',
      action: () => {
        // Open incident report
        console.log('Opening incident report...');
      }
    },
    {
      id: 'notes',
      icon: FiFileText,
      label: 'Quick Notes',
      color: 'purple',
      action: () => {
        // Open notes
        console.log('Opening notes...');
      }
    }
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <motion.button
            key={action.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.action}
            className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
              action.color === 'blue' ? 'border-blue-200 hover:border-blue-300 hover:bg-blue-50' :
              action.color === 'green' ? 'border-green-200 hover:border-green-300 hover:bg-green-50' :
              action.color === 'orange' ? 'border-orange-200 hover:border-orange-300 hover:bg-orange-50' :
              'border-purple-200 hover:border-purple-300 hover:bg-purple-50'
            }`}
          >
            <SafeIcon 
              icon={action.icon} 
              className={`text-2xl mx-auto mb-2 ${
                action.color === 'blue' ? 'text-blue-600' :
                action.color === 'green' ? 'text-green-600' :
                action.color === 'orange' ? 'text-orange-600' :
                'text-purple-600'
              }`} 
            />
            <div className="text-sm font-medium text-gray-900">
              {action.label}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;