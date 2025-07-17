import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiEdit, FiTrash2, FiPlus, FiSearch, FiFilter } = FiIcons;

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Mock users data
  const users = [
    {
      id: 'user-1',
      name: 'John Smith',
      email: 'john.smith@council.gov',
      role: 'field_worker',
      department: 'Parks & Recreation',
      status: 'active',
      lastActive: '2023-11-20T14:35:00'
    },
    {
      id: 'user-2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@council.gov',
      role: 'field_worker',
      department: 'Building Inspection',
      status: 'active',
      lastActive: '2023-11-20T13:15:00'
    },
    {
      id: 'user-3',
      name: 'Mike Wilson',
      email: 'mike.wilson@council.gov',
      role: 'field_worker',
      department: 'Environmental Services',
      status: 'inactive',
      lastActive: '2023-11-19T16:45:00'
    },
    {
      id: 'user-4',
      name: 'Emma Brown',
      email: 'emma.brown@council.gov',
      role: 'supervisor',
      department: 'Building Inspection',
      status: 'active',
      lastActive: '2023-11-20T14:55:00'
    },
    {
      id: 'user-5',
      name: 'David Lee',
      email: 'david.lee@council.gov',
      role: 'supervisor',
      department: 'Parks & Recreation',
      status: 'active',
      lastActive: '2023-11-20T11:25:00'
    },
    {
      id: 'user-6',
      name: 'Admin User',
      email: 'admin@council.gov',
      role: 'admin',
      department: 'IT Services',
      status: 'active',
      lastActive: '2023-11-20T15:05:00'
    }
  ];
  
  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Admin</span>;
      case 'supervisor':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Supervisor</span>;
      case 'field_worker':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Field Worker</span>;
      default:
        return null;
    }
  };
  
  const getStatusIndicator = (status) => {
    return (
      <span className={`inline-block w-2 h-2 rounded-full ${
        status === 'active' ? 'bg-green-500' : 'bg-gray-400'
      }`} />
    );
  };
  
  const filteredUsers = users
    .filter(user => {
      // Apply role filter
      if (filter !== 'all' && user.role !== filter) {
        return false;
      }
      
      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.department.toLowerCase().includes(query)
        );
      }
      
      return true;
    });

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-3 md:space-y-0">
          <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
          
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <SafeIcon icon={FiPlus} />
            <span>Add User</span>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3">
          <div className="relative flex-1">
            <SafeIcon 
              icon={FiSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiFilter} className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="supervisor">Supervisor</option>
              <option value="field_worker">Field Worker</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <SafeIcon icon={FiUser} className="text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIndicator(user.status)}
                      <span className="text-sm text-gray-700">
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastActive).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Edit user:', user.id);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <SafeIcon icon={FiEdit} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Delete user:', user.id);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <SafeIcon icon={FiTrash2} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="p-6 text-center">
            <p className="text-gray-500">No users found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;