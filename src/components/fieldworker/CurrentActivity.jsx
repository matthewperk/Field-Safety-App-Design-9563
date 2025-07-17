import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMapPin, FiClock, FiFileText, FiCalendar } = FiIcons;

const CurrentActivity = ({ event }) => {
  if (!event) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="text-center py-8">
          <SafeIcon icon={FiCalendar} className="text-gray-400 text-3xl mx-auto mb-2" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Current Activity</h3>
          <p className="text-gray-500">
            No scheduled activities at this time
          </p>
        </div>
      </div>
    );
  }

  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);
  const now = new Date();
  const progress = Math.min(100, Math.max(0, 
    ((now - startTime) / (endTime - startTime)) * 100
  ));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Current Activity
          </h3>
          <h4 className="text-lg font-medium text-blue-600">
            {event.title}
          </h4>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          event.type === 'inspection' ? 'bg-orange-100 text-orange-800' :
          event.type === 'maintenance' ? 'bg-green-100 text-green-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {event.type}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <SafeIcon icon={FiMapPin} />
          <span>{event.location}</span>
        </div>

        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <SafeIcon icon={FiClock} />
          <span>
            {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
            {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {event.description && (
          <div className="flex items-start space-x-3 text-sm text-gray-600">
            <SafeIcon icon={FiFileText} className="mt-0.5" />
            <span>{event.description}</span>
          </div>
        )}

        <div className="pt-2">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="bg-blue-500 h-2 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentActivity;