import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MSG from './msg';
import './App.css';
import Box from './databox'
const socket = io('https://campusbackend.onrender.com');

function App() {
 
  const [isDataBoxRefreshNeeded, setIsDataBoxRefreshNeeded] = useState(false);
///adding this
 const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };
 /////upto this
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
   <div className='App'>
    <div className='back'>
   <div className="box">
      <Box className="box"
        isRefreshNeeded={isDataBoxRefreshNeeded}
        onRefreshComplete={handleDataBoxRefreshComplete}
      /></div>
      <MSG  handleRefresh={handleRefresh} onMessageSubmit={handleDataBoxRefresh} />
    
      <p className='alert'>If message does't recieve please refresh the page as it is free deployment speed is slow</p>
    </div></div>
  );
}
/// handleRefresh={handleRefresh} removed this from MSG
export default App;
