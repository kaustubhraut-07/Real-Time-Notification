
import React, { useState } from 'react';
import { SocketProvider } from './components/SocketProvider';
import NotificationIcon from './components/NotificationIcon';
import NotificationPanel from './components/NotificationPanel';

const App = () => {
  const [isPanelOpen, setPanelOpen] = useState(false);

  return (
    <SocketProvider>
      <div style={{ top : '0' , position: 'relative' }}>
        <NotificationIcon onClick={() => setPanelOpen(!isPanelOpen)} />
        <NotificationPanel isOpen={isPanelOpen} />
      </div>
    </SocketProvider>
  );
};

export default App;
