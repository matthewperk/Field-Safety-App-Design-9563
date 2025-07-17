import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiMapPin, FiClock, FiAlertTriangle, FiCheckCircle, FiPhoneCall } = FiIcons;

const TeamStatus = () => {
  const [selectedWorker, setSelectedWorker] = useState(null);
  
  // Mock team data
  const teamMembers = [
    {
      id: 'worker-1',
      name: 'John Smith',
      role: 'Field Inspector',
      status: 'active',
      lastCheckIn: '2023-11-20T14:35:00',
      nextCheckInDue: '2023-11-20T15:35:00',
      location: {
        address: '123 Main Street, City Center',
        coordinates: { lat: -37.8136, lng: 144.9631 },
        lastUpdated: '2023-11-20T14:35:00'
      },
      currentTask: {
        title: 'Building Inspection - 123 Main St',
        startTime: '2023-11-20T14:00:00',
        endTime: '2023-11-20T16:00:00',
        type: 'inspection'
      }
    },
    {
      id: 'worker-2',
      name: 'Sarah Johnson',
      role: 'Maintenance Worker',
      status: 'warning',
      lastCheckIn: '2023-11-20T13:15:00',
      nextCheckInDue: '2023-11-20T14:15:00',
      location: {
        address: 'Central Park, 456 Park Ave',
        coordinates: { lat: -37.8140, lng: 144.9633 },
        lastUpdated: '2023-11-20T13:15:00'
      },
      currentTask: {
        title: 'Park Maintenance - Central Park',
        startTime: '2023-11-20T12:00:00',
        endTime: '2023-11-20T15:00:00',
        type: 'maintenance'
      }
    },
    {
      id: 'worker-3',
      name: 'Mike Wilson',
      role: 'Environmental Officer',
      status: 'inactive',
      lastCheckIn: '2023-11-20T09:45:00',
      nextCheckInDue: '2023-11-20T10:45:00',
      location: {
        address: '789 Development Road',
        coordinates: { lat: -37.8145, lng: 144.9640 },
        lastUpdated: '2023-11-20T09:45:00'
      },
      currentTask: null
    }
  ];
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'inactive': return 'bg-gray-400';
      case 'emergency': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };
  
  const getCheckInStatus = (worker) => {
    if (!worker.nextCheckInDue) return { color: 'text-gray-500', text: 'No scheduled check-in' };
    
    const now = new Date();
    const nextCheckIn = new Date(worker.nextCheckInDue);
    const timeDiff = nextCheckIn - now;
    
    if (timeDiff < 0) {
      return { color: 'text-red-600', text: 'Overdue' };
    } else if (timeDiff < 15 * 60 * 1000) { // Less than 15 minutes
      return { color: 'text-yellow-600', text: 'Due soon' };
    } else {
      return { 
        color: 'text-green-600', 
        text: `Due ${Math.floor(timeDiff / (60 * 1000))} minutes` 
      };
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Team List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {teamMembers.map((worker) => (
              <button
                key={worker.id}
                onClick={() => setSelectedWorker(worker)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  selectedWorker?.id === worker.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiUser} className="text-gray-600" />
                    </div>
                    <span 
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(worker.status)}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{worker.name}</div>
                    <div className="text-sm text-gray-500">{worker.role}</div>
                  </div>
                  {worker.status === 'warning' && (
                    <SafeIcon 
                      icon={FiAlertTriangle} 
                      className="text-yellow-500" 
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Worker Details */}
      <div className="lg:col-span-2">
        {selectedWorker ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiUser} className="text-gray-600 text-2xl" />
                  </div>
                  <span 
                    className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(selectedWorker.status)}`}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedWorker.name}</h2>
                  <div className="text-gray-500">{selectedWorker.role}</div>
                </div>
              </div>
              
              <div className="space-x-2">
                <button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  <SafeIcon icon={FiPhoneCall} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <SafeIcon icon={FiMapPin} className="text-blue-600 mr-2" />
                  Current Location
                </h3>
                <p className="text-gray-700 mb-2">{selectedWorker.location.address}</p>
                <p className="text-xs text-gray-500">
                  Last updated: {new Date(selectedWorker.location.lastUpdated).toLocaleTimeString()}
                </p>
              </div>
              
              {/* Check-in Status */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <SafeIcon icon={FiCheckCircle} className="text-blue-600 mr-2" />
                  Check-in Status
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Last check-in:</span>
                    <span className="font-medium">
                      {new Date(selectedWorker.lastCheckIn).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Next check-in:</span>
                    <span className={`font-medium ${getCheckInStatus(selectedWorker).color}`}>
                      {getCheckInStatus(selectedWorker).text}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Current Task */}
              <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <SafeIcon icon={FiClock} className="text-blue-600 mr-2" />
                  Current Activity
                </h3>
                
                {selectedWorker.currentTask ? (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900">{selectedWorker.currentTask.title}</div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedWorker.currentTask.type === 'inspection' 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {selectedWorker.currentTask.type}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(selectedWorker.currentTask.startTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })} - 
                      {new Date(selectedWorker.currentTask.endTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500">No active task</div>
                )}
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Full History
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center h-full min-h-[300px]">
            <SafeIcon icon={FiUser} className="text-gray-300 text-5xl mb-4" />
            <h3 className="text-lg font-medium text-gray-700">Select a team member</h3>
            <p className="text-gray-500 text-center mt-2">
              Click on a team member to view their details and status
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamStatus;