import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiDownload, FiCalendar, FiFilter, FiBarChart2, FiPieChart, FiAlertTriangle, FiClock } = FiIcons;

const Reports = () => {
  const [reportType, setReportType] = useState('safety');
  const [dateRange, setDateRange] = useState('week');
  
  const reports = {
    safety: {
      title: 'Safety Incidents Report',
      description: 'Overview of safety incidents and emergency alerts',
      metrics: [
        { label: 'Emergency Alerts', value: 3, change: -1, positive: true },
        { label: 'Missed Check-ins', value: 7, change: 2, positive: false },
        { label: 'Average Response Time', value: '4m 12s', change: '-0:42', positive: true },
        { label: 'Resolved Incidents', value: '95%', change: '3%', positive: true }
      ]
    },
    activity: {
      title: 'Field Worker Activity Report',
      description: 'Summary of field worker activities and productivity',
      metrics: [
        { label: 'Total Activities', value: 248, change: 12, positive: true },
        { label: 'Completed Tasks', value: 231, change: 15, positive: true },
        { label: 'On-time Completion', value: '93%', change: '2%', positive: true },
        { label: 'Average Task Duration', value: '1h 24m', change: '-0:12', positive: true }
      ]
    },
    compliance: {
      title: 'Safety Compliance Report',
      description: 'Analysis of safety protocol compliance',
      metrics: [
        { label: 'Check-in Compliance', value: '89%', change: '4%', positive: true },
        { label: 'Protocol Violations', value: 5, change: -2, positive: true },
        { label: 'Training Completion', value: '97%', change: '1%', positive: true },
        { label: 'Risk Assessments Filed', value: 42, change: 8, positive: true }
      ]
    }
  };
  
  const currentReport = reports[reportType];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-3 md:space-y-0">
          <h2 className="text-lg font-semibold text-gray-900">Safety Reports</h2>
          
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <SafeIcon icon={FiDownload} />
            <span>Export Report</span>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiBarChart2} className="text-gray-400" />
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="safety">Safety Incidents</option>
              <option value="activity">Field Worker Activity</option>
              <option value="compliance">Safety Compliance</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiCalendar} className="text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>
      
      <motion.div
        key={reportType}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{currentReport.title}</h3>
          <p className="text-gray-600">{currentReport.description}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {currentReport.metrics.map((metric, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">{metric.label}</div>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className={`text-xs flex items-center ${
                metric.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change > 0 ? '↑' : '↓'} {typeof metric.change === 'number' ? Math.abs(metric.change) : metric.change}
                {' '}from previous {dateRange}
              </div>
            </div>
          ))}
        </div>
        
        {/* Mock charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Incidents by Type</h4>
              <SafeIcon icon={FiPieChart} className="text-purple-600" />
            </div>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-500">Chart visualization would appear here</div>
                <div className="text-sm text-gray-400 mt-2">Distribution of incident types</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Incidents Over Time</h4>
              <SafeIcon icon={FiBarChart2} className="text-purple-600" />
            </div>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-500">Chart visualization would appear here</div>
                <div className="text-sm text-gray-400 mt-2">Trend analysis of incidents</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent incidents table - only show for safety report */}
        {reportType === 'safety' && (
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-4">Recent Safety Incidents</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Field Worker
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiAlertTriangle} className="text-red-500" />
                        <span className="text-sm font-medium">Emergency Alert</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Sarah Johnson
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Central Park, 456 Park Ave
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Today, 2:25 PM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        Active
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiClock} className="text-yellow-500" />
                        <span className="text-sm font-medium">Missed Check-in</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Mike Wilson
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      789 Development Road
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Today, 1:45 PM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiAlertTriangle} className="text-red-500" />
                        <span className="text-sm font-medium">Silent Duress</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Emma Brown
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      567 Commercial Road
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Today, 10:12 AM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Resolved
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Reports;