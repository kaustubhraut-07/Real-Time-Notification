
import React from 'react';
import { useSocket } from './SocketProvider';

const NotificationIcon = ({ onClick }) => {
  const { unreadCount } = useSocket();

  return (
    <div onClick={onClick} style={{ position: 'relative' ,top : '0' , cursor: 'pointer' }}>
      <span role="img" aria-label="notifications">🔔</span>
      {unreadCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: -5,
            right: -5,
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '12px',
          }}
        >
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;
