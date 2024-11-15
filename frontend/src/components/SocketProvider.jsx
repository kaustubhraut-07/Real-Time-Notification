// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { io } from 'socket.io-client';

// const SocketContext = createContext();

// export const SocketProvider = ({ children }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [seenMessages, setSeenMessages] = useState({}); // Track seen messages

//   useEffect(() => {
//     const socket = io('http://localhost:4000/');

//     const userId = 'user123'; // Replace with actual user ID

//     socket.on('connect', () => {
//       console.log('Connected to server');
//       socket.emit('join', userId);
//     });

//     socket.on('message', (data) => {
//       console.log('Received message:', data);
      
//       // Deduplicate messages
//       if (!seenMessages[data]) {
//         setNotifications((prev) => [data, ...prev]);
//         setUnreadCount((count) => count + 1);
//         setSeenMessages((prev) => ({ ...prev, [data]: true }));
//       }
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const markAllAsRead = () => setUnreadCount(0);

//   return (
//     <SocketContext.Provider value={{ notifications, unreadCount, markAllAsRead }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export const useSocket = () => useContext(SocketContext);



import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const seenMessages = useRef({}); 

  useEffect(() => {
    const socket = io('http://localhost:4000/');

    const userId = 'user123'; 

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('join', userId);
    });

    socket.on('message', (data) => {
      console.log('Received message:', data);

      if (!seenMessages.current[data]) {
        setNotifications((prev) => [data, ...prev]);
        setUnreadCount((count) => count + 1);
        seenMessages.current[data] = true;
      }
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
