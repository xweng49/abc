import React, { useEffect } from 'react';
import io from 'socket.io-client';

const SocketIOComponent = () => {
  useEffect(() => {
    const socket = io('http://127.0.0.1:5000/camera', {transports: ['websocket']}); // Replace with your Flask-SocketIO server URL

    socket.on('connect', () => {
      console.log('Connected to Flask-SocketIO server');
      
      // Emit a custom event to the server
      socket.emit('custom_event', { data: 'Hello from React client' });
    });

    // socket.on('response', (data) => {
    //   console.log('Server response:', data.message);
    // });

    socket.on('disconnect', () => {
      console.log('Disconnected from Flask-SocketIO server');
    });

    // Cleanup the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>React Socket.IO Client</h1>
      <p>Check the console for server interaction logs.</p>
    </div>
  );
};

export default SocketIOComponent;
