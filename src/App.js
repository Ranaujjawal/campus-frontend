import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MSG from './msg';
import './App.css';
import Box from './databox'
const socket = io('http://localhost:8000');

function App() {
 
  const [isDataBoxRefreshNeeded, setIsDataBoxRefreshNeeded] = useState(false);

  const handleDataBoxRefresh = () => {
    setIsDataBoxRefreshNeeded(true);
  };

  const handleDataBoxRefreshComplete = () => {
    setIsDataBoxRefreshNeeded(false);
  };
  useEffect(() => {
    // Subscribe to incoming messages from the server
    socket.on('message', (message) => {
      console.log('Received message:', message);
      handleDataBoxRefresh();
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off('message');
    };
  }, []);
  return (
    <div className='back'>
      <Box
        isRefreshNeeded={isDataBoxRefreshNeeded}
        onRefreshComplete={handleDataBoxRefreshComplete}
      />
      <MSG onMessageSubmit={handleDataBoxRefresh} />
      <p className='alert'>The server gets reset at 1 A.M. to clear the database</p>
    </div>
  );
}

export default App;
