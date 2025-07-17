import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMessages } from '../../contexts/MessageContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMessageCircle, FiSend, FiUsers, FiUser } = FiIcons;

const MessagingInterface = () => {
  const { conversations, sendMessage, getConversationMessages } = useMessages();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      sendMessage(selectedConversation.id, newMessage);
      setNewMessage('');
    }
  };

  if (selectedConversation) {
    const messages = getConversationMessages(selectedConversation.id);
    
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setSelectedConversation(null)}
            className="text-blue-600 hover:text-blue-700 text-sm mb-2"
          >
            ← Back to conversations
          </button>
          <div className="flex items-center space-x-3">
            <SafeIcon 
              icon={selectedConversation.type === 'group' ? FiUsers : FiUser} 
              className="text-gray-400" 
            />
            <div>
              <div className="font-medium text-gray-900">
                {selectedConversation.name}
              </div>
              <div className="text-sm text-gray-500">
                {selectedConversation.type === 'group' ? 'Group Chat' : 'Direct Message'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === 'current_user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.senderId === 'current_user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.senderId !== 'current_user' && (
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
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        <SafeIcon icon={FiMessageCircle} className="text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
      </div>

      <div className="space-y-2">
        {conversations.map((conversation) => (
          <motion.button
            key={conversation.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedConversation(conversation)}
            className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              <SafeIcon 
                icon={conversation.type === 'group' ? FiUsers : FiUser} 
                className="text-gray-400" 
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-900">
                    {conversation.name}
                  </div>
                  {conversation.unread > 0 && (
                    <div className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.unread}
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {conversation.lastMessage}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(conversation.lastMessageTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MessagingInterface;