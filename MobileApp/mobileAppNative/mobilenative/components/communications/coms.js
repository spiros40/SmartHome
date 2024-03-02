import { io } from 'socket.io-client';


// Construct the WebSocket URL (assuming your server runs on port 3000)
const socketUrl = `http://192.168.1.13:2000`;

const socket = io(socketUrl);

// Emit a message to the server
socket.emit('message', 'Hello from app!');

// Listen for messages from the server
socket.on('message', (data) => {
  console.log('Received message from server:', data);
});


socket.on('connect', () => {
  console.log('Connected to Socket.IO server');
  
});

socket.on('disconnect', () => {
 
});

export default socket;
