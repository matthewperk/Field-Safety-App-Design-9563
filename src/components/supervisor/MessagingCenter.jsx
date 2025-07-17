import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMessageSquare, FiSend, FiUsers, FiUser, FiSearch, FiPlus } = FiIcons;

const MessagingCenter = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock conversations data
  const conversations = [
    {
      id: 'conv-1',
      type: 'direct',
      participants: ['supervisor', 'worker1'],
      name: 'John Smith',
      avatar: null,
      lastMessage: 'I'll be at the site in about 15 minutes.',
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      unread: 0
    },
    {
      id: 'conv-2',
      type: 'direct',
      participants: ['supervisor', 'worker2'],
      name: 'Sarah Johnson',
      avatar: null,
      lastMessage: 'Completed the inspection. Sending report now.',
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      unread: 3
    },
    {
      id: 'conv-3',
      type: 'group',
      participants: ['supervisor', 'worker1', 'worker2', 'worker3'],
      name: 'Field Team',
      avatar: null,
      lastMessage: 'Weather alert: Heavy rain expected this afternoon.',
      lastMessageTime: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      unread: 0
    }
  ];
  
  // Mock messages data
  const mockMessages = {
    'conv-1': [
      {
        id: 'msg-1-1',
        conversationId: 'conv-1',
        senderId: 'worker1',
        senderName: 'John Smith',
        content: 'Hi, I'm heading to the Main Street inspection now.',
        timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        read: true
      },
      {
        id: 'msg-1-2',
        conversationId: 'conv-1',
        senderId: 'supervisor',
        senderName: 'You',
        content: 'Great, please check in when you arrive.',
        timestamp: new Date(Date.now() - 85 * 60 * 1000).toISOString(),
        read: true
      },
      {
        id: 'msg-1-3',
        conversationId: 'conv-1',
        senderId: 'worker1',
        senderName: 'John Smith',
        content: 'Will do. I'll be at the site in about 15 minutes.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        read: true
      }
    ],
    'conv-2': [
      {
        id: 'msg-2-1',
        conversationId: 'conv-2',
        senderId: 'supervisor',
        senderName: 'You',
        content: 'How's the Central Park maintenance going?',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        read: true
      },
      {
        id: 'msg-2-2',
        conversationId: 'conv-2',
        senderId: 'worker2',
        senderName: 'Sarah Johnson',
        content: 'Almost done with the scheduled tasks. Should be finished by 3pm.',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        read: true
      },
      {
        id: 'msg-2-3',
        conversationId: 'conv-2',
        senderId: 'worker2',
        senderName: 'Sarah Johnson',
        content: 'Completed the inspection. Sending report now.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false
      }
    ],
    'conv-3': [
      {
        id: 'msg-3-1',
        conversationId: 'conv-3',
        senderId: 'supervisor',
        senderName: 'You',
        content: 'Good morning team! Please remember to check in regularly today.',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        read: true
      },
      {
        id: 'msg-3-2',
        conversationId: 'conv-3',
        senderId: 'worker1',
        senderName: 'John Smith',
        content: 'Will do!',
        timestamp: new Date(Date.now() - 7.8 * 60 * 60 * 1000).toISOString(),
        read: true
      },
      {
        id: 'msg-3-3',
        conversationId: 'conv-3',
        senderId: 'supervisor',
        senderName: 'You',
        content: 'Weather alert: Heavy rain expected this afternoon.',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        read: true
      }
    ]
  };
  
  const getConversationMessages = (conversationId) => {
    return mockMessages[conversationId] || [];
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', {
        conversationId: selectedConversation.id,
        content: newMessage
      });
      setNewMessage('');
    }
  };
  
  const filteredConversations = searchQuery 
    ? conversations.filter(conv => 
        conv.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        {/* Conversations List */}
        <div className="md:col-span-1 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Messages</h2>
            <div className="relative">
              <SafeIcon 
                icon={FiSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <SafeIcon 
                            icon={conversation.type === 'group' ? FiUsers : FiUser} 
                            className="text-gray-600" 
                          />
                        </div>
                        {conversation.unread > 0 && (
                          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unread}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{conversation.name}</div>
                        <div className="text-sm text-gray-500 truncate">{conversation.lastMessage}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(conversation.lastMessageTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">No conversations found</p>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <SafeIcon icon={FiPlus} />
              <span>New Message</span>
            </button>
          </div>
        </div>
        
        {/* Message Thread */}
        <div className="md:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <SafeIcon 
                      icon={selectedConversation.type === 'group' ? FiUsers : FiUser} 
                      className="text-gray-600" 
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{selectedConversation.name}</div>
                    <div className="text-sm text-gray-500">
                      {selectedConversation.type === 'group' ? 'Group Chat' : 'Direct Message'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {getConversationMessages(selectedConversation.id).map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 'supervisor' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.senderId !== 'supervisor' && (
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                        <SafeIcon icon={FiUser} className="text-gray-600 text-xs" />
                      </div>
                    )}
                    <div className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.senderId === 'supervisor'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {message.senderId !== 'supervisor' && (
                        <div className="text-xs opacity-70 mb-1">
                          {message.senderName}
                        </div>
                      )}
                      <div className="text-sm">{message.content}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <SafeIcon icon={FiSend} />
                  </motion.button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <SafeIcon icon={FiMessageSquare} className="text-gray-300 text-5xl mb-4" />
              <h3 className="text-lg font-medium text-gray-700">Select a conversation</h3>
              <p className="text-gray-500 text-center mt-2">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingCenter;