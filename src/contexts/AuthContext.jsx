import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('council_safety_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('council_safety_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on credentials
      const mockUser = {
        id: credentials.username,
        name: credentials.username === 'admin' ? 'Admin User' : 
              credentials.username === 'supervisor' ? 'Supervisor Smith' : 
              'Field Worker Johnson',
        email: `${credentials.username}@council.gov`,
        role: credentials.username === 'admin' ? 'admin' : 
              credentials.username === 'supervisor' ? 'supervisor' : 
              'field_worker',
        department: 'Parks & Recreation',
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
      };

      setUser(mockUser);
      localStorage.setItem('council_safety_user', JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('council_safety_user');
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};