
import React, { createContext, useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const socket = io('http://localhost:3000'); // Change this to your server address

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('message', (data) => {
      setNotifications((prev) => [data, ...prev]);
      setUnreadCount((count) => count + 1); 
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const markAllAsRead = () => setUnreadCount(0);

  return (
    <SocketContext.Provider value={{ notifications, unreadCount, markAllAsRead }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
