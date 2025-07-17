import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAlertTriangle, FiClock, FiMapPin, FiUser, FiPhone, FiMessageSquare, FiCheckCircle } = FiIcons;

const AlertsPanel = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filter, setFilter] = useState('all');

  // Mock alerts data
  const alerts = [
    {
      id: 'alert-1',
      type: 'emergency',
      worker: {
        id: 'worker-2',
        name: 'Sarah Johnson',
        role: 'Maintenance Worker',
        phone: '555-0123'
      },
      timestamp: '2023-11-20T14:25:00',
      location: {
        address: 'Central Park, 456 Park Ave',
        coordinates: { lat: -37.8140, lng: 144.9633 }
      },
      message: 'Panic button activated. Emergency assistance requested.',
      status: 'active'
    },
    {
      id: 'alert-2',
      type: 'check-in',
      worker: {
        id: 'worker-3',
        name: 'Mike Wilson',
        role: 'Environmental Officer',
        phone: '555-0456'
      },
      timestamp: '2023-11-20T13:45:00',
      location: {
        address: '789 Development Road',
        coordinates: { lat: -37.8145, lng: 144.9640 }
      },
      message: 'Missed scheduled check-in (45 minutes overdue).',
      status: 'active'
    },
    {
      id: 'alert-3',
      type: 'emergency',
      worker: {
        id: 'worker-4',
        name: 'Emma Brown',
        role: 'Building Inspector',
        phone: '555-0789'
      },
      timestamp: '2023-11-20T10:12:00',
      location: {
        address: '567 Commercial Road',
        coordinates: { lat: -37.8150, lng: 144.9645 }
      },
      message: 'Silent duress alert activated.',
      status: 'resolved'
    }
  ];

  const getAlertTypeIcon = (type) => {
    switch (type) {
      case 'emergency': return FiAlertTriangle;
      case 'check-in': return FiClock;
      default: return FiAlertTriangle;
    }
  };

  const getAlertTypeColor = (type) => {
    switch (type) {
      case 'emergency': return 'text-red-600 bg-red-100';
      case 'check-in': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Active</span>;
      case 'acknowledged':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Acknowledged</span>;
      case 'resolved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Resolved</span>;
      default:
        return null;
    }
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : filter === 'active' 
      ? alerts.filter(alert => alert.status === 'active')
      : alerts.filter(alert => alert.type === filter);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Alerts List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Safety Alerts</h2>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-xs rounded-lg ${
                  filter === 'all' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1 text-xs rounded-lg ${
                  filter === 'active' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('emergency')}
                className={`px-3 py-1 text-xs rounded-lg ${
                  filter === 'emergency' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Emergency
              </button>
              <button
                onClick={() => setFilter('check-in')}
                className={`px-3 py-1 text-xs rounded-lg ${
                  filter === 'check-in' 
                    ? 'bg-yellow-100 text-yellow-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Check-in
              </button>
            </div>
          </div>
          
          {filteredAlerts.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredAlerts.map((alert) => (
                <button
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    selectedAlert?.id === alert.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getAlertTypeColor(alert.type)}`}>
                      <SafeIcon icon={getAlertTypeIcon(alert.type)} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">
                          {alert.type === 'emergency' ? 'Emergency Alert' : 'Missed Check-in'}
                        </span>
                        {getStatusBadge(alert.status)}
                      </div>
                      <div className="text-sm text-gray-700 mt-1">{alert.worker.name}</div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                        <SafeIcon icon={FiClock} className="text-gray-400" />
                        <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <SafeIcon icon={FiCheckCircle} className="text-green-500 text-3xl mx-auto mb-2" />
              <p className="text-gray-500">No matching alerts found</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Alert Details */}
      <div className="lg:col-span-2">
        {selectedAlert ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-lg ${
              selectedAlert.type === 'emergency' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
            } mb-4`}>
              <SafeIcon icon={getAlertTypeIcon(selectedAlert.type)} />
              <span className="font-medium">
                {selectedAlert.type === 'emergency' ? 'Emergency Alert' : 'Missed Check-in'}
              </span>
            </div>
            
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUser} className="text-gray-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedAlert.worker.name}</h2>
                <div className="text-gray-500">{selectedAlert.worker.role}</div>
                <div className="flex items-center space-x-2 mt-1">
                  <SafeIcon icon={FiClock} className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {new Date(selectedAlert.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Location</h3>
                <div className="flex items-start space-x-2">
                  <SafeIcon icon={FiMapPin} className="text-gray-400 mt-0.5" />
                  <span className="text-gray-700">{selectedAlert.location.address}</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Coordinates: {selectedAlert.location.coordinates.lat}, {selectedAlert.location.coordinates.lng}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiPhone} className="text-gray-400" />
                  <span className="text-gray-700">{selectedAlert.worker.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Alert Details</h3>
              <p className="text-gray-700">{selectedAlert.message}</p>
            </div>
            
            <div className="flex flex-wrap items-center justify-end space-x-3">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiMessageSquare} />
                  <span>Message</span>
                </div>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiPhone} />
                  <span>Call Now</span>
                </div>
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center h-full min-h-[300px]">
            <SafeIcon icon={FiAlertTriangle} className="text-gray-300 text-5xl mb-4" />
            <h3 className="text-lg font-medium text-gray-700">Select an alert</h3>
            <p className="text-gray-500 text-center mt-2">
              Click on an alert to view details and take action
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;