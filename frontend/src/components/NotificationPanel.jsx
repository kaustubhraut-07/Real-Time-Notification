
import React from 'react';
import { useSocket } from './SocketProvider';

const NotificationPanel = ({ isOpen }) => {
  const { notifications, markAllAsRead } = useSocket();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '40px',
        right: '10px',
        width: '300px',
        maxHeight: '400px',
        overflowY: 'auto',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#fff',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
        padding: '10px',
      }}
    >
      <button onClick={markAllAsRead} style={{ marginBottom: '10px' }}>
        Mark All as Read
      </button>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        notifications.map((notification, index) => (
          <div
            key={index}
            style={{
              padding: '8px',
              borderBottom: '1px solid #f0f0f0',
              marginBottom: '5px',
            }}
          >
            <p>{notification.message}</p>
            <span style={{ fontSize: '12px', color: 'gray' }}>{notification.timestamp}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationPanel;
