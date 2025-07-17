import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMapPin, FiNavigation, FiUser, FiClock, FiAlertTriangle } = FiIcons;

// Mock map component since we can't use Leaflet in this example
const MockMap = ({ workers, center }) => {
  return (
    <div className="relative bg-blue-50 rounded-lg overflow-hidden" style={{ height: '500px' }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <SafeIcon icon={FiNavigation} className="text-blue-500 text-5xl mb-4" />
          <p className="text-gray-600">Interactive map would display here</p>
          <p className="text-gray-500 text-sm mt-2">Showing {workers.length} field workers</p>
        </div>
      </div>
      
      {/* Mock worker markers */}
      {workers.map((worker, index) => {
        // Generate pseudo-random positions for demonstration
        const top = 100 + (index * 80) % 300;
        const left = 100 + (index * 120) % 400;
        
        return (
          <div
            key={worker.id}
            className="absolute"
            style={{ top: `${top}px`, left: `${left}px` }}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              worker.status === 'active' ? 'bg-green-100' : 
              worker.status === 'warning' ? 'bg-yellow-100' : 
              worker.status === 'emergency' ? 'bg-red-100' : 'bg-gray-100'
            }`}>
              <SafeIcon 
                icon={FiUser} 
                className={`${
                  worker.status === 'active' ? 'text-green-600' : 
                  worker.status === 'warning' ? 'text-yellow-600' : 
                  worker.status === 'emergency' ? 'text-red-600' : 'text-gray-600'
                }`} 
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <div className={`w-3 h-3 rounded-full ${
                worker.status === 'active' ? 'bg-green-500' : 
                worker.status === 'warning' ? 'bg-yellow-500' : 
                worker.status === 'emergency' ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
              }`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const LiveMap = () => {
  const [mapView, setMapView] = useState('all');
  const [selectedWorker, setSelectedWorker] = useState(null);
  
  // Mock worker data
  const workers = [
    {
      id: 'worker-1',
      name: 'John Smith',
      role: 'Field Inspector',
      status: 'active',
      lastUpdate: '2 mins ago',
      location: {
        address: '123 Main Street, City Center',
        coordinates: { lat: -37.8136, lng: 144.9631 }
      }
    },
    {
      id: 'worker-2',
      name: 'Sarah Johnson',
      role: 'Maintenance Worker',
      status: 'warning',
      lastUpdate: '25 mins ago',
      location: {
        address: 'Central Park, 456 Park Ave',
        coordinates: { lat: -37.8140, lng: 144.9633 }
      }
    },
    {
      id: 'worker-3',
      name: 'Mike Wilson',
      role: 'Environmental Officer',
      status: 'inactive',
      lastUpdate: '3 hrs ago',
      location: {
        address: '789 Development Road',
        coordinates: { lat: -37.8145, lng: 144.9640 }
      }
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
  
  const filteredWorkers = mapView === 'all' 
    ? workers 
    : workers.filter(worker => worker.status === mapView);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Live Field Worker Map</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setMapView('all')}
              className={`px-3 py-1 text-sm rounded-lg ${
                mapView === 'all' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setMapView('active')}
              className={`px-3 py-1 text-sm rounded-lg ${
                mapView === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setMapView('warning')}
              className={`px-3 py-1 text-sm rounded-lg ${
                mapView === 'warning' 
                  ? 'bg-yellow-100 text-yellow-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Warning
            </button>
          </div>
        </div>
        
        <MockMap 
          workers={filteredWorkers}
          center={selectedWorker ? selectedWorker.location.coordinates : null}
        />
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Field Workers</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {workers.map((worker) => (
            <div
              key={worker.id}
              className="p-4 hover:bg-gray-50 transition-colors"
              onClick={() => setSelectedWorker(worker)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiUser} className="text-gray-600" />
                    </div>
                    <span 
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(worker.status)}`}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{worker.name}</div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <SafeIcon icon={FiMapPin} className="text-gray-400" />
                      <span>{worker.location.address}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="flex items-center text-xs text-gray-500">
                      <SafeIcon icon={FiClock} className="mr-1" />
                      <span>Updated {worker.lastUpdate}</span>
                    </div>
                  </div>
                  
                  {worker.status === 'warning' && (
                    <SafeIcon 
                      icon={FiAlertTriangle} 
                      className="text-yellow-500" 
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveMap;