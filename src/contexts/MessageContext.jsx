import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const MessageContext = createContext();

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};

export const MessageProvider = ({ children }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock initial conversations
  useEffect(() => {
    if (user) {
      const mockConversations = [
        {
          id: 'conv-1',
          type: 'direct',
          participants: [user.id, 'supervisor'],
          name: 'Supervisor Smith',
          lastMessage: 'Please check in when you arrive at the site.',
          lastMessageTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          unread: 2
        },
        {
          id: 'conv-2',
          type: 'group',
          participants: [user.id, 'supervisor', 'worker2', 'worker3'],
          name: 'Parks Team',
          lastMessage: 'Weather alert: Heavy rain expected this afternoon.',
          lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          unread: 0
        }
      ];
      setConversations(mockConversations);
    }
  }, [user]);

  const sendMessage = (conversationId, content, type = 'text') => {
    const message = {
      id: Date.now().toString(),
      conversationId,
      senderId: user.id,
      senderName: user.name,
      content,
      type,
      timestamp: new Date().toISOString(),
      delivered: true,
      read: false
    };

    setMessages(prev => [...prev, message]);
    
    // Update conversation last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, lastMessage: content, lastMessageTime: message.timestamp }
          : conv
      )
    );

    return message;
  };

  const sendEmergencyBroadcast = (content) => {
    const message = {
      id: Date.now().toString(),
      type: 'emergency_broadcast',
      senderId: user.id,
      senderName: user.name,
      content,
      timestamp: new Date().toISOString(),
      priority: 'high'
    };

    setMessages(prev => [...prev, message]);
    return message;
  };

  const markAsRead = (messageId) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };

  const getConversationMessages = (conversationId) => {
    return messages.filter(msg => msg.conversationId === conversationId);
  };

  const value = {
    messages,
    conversations,
    unreadCount,
    sendMessage,
    sendEmergencyBroadcast,
    markAsRead,
    getConversationMessages
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
};