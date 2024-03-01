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




/*
const SOCKET_URL = 'https://192.168.1.13:2000'; // Replace with your server URL
//const SOCKET_URL='ws://localhost:19006';

const socket = io(SOCKET_URL, {
  transports: ['websocket'], // Specify the transport (e.g., WebSocket)
  reconnection: true, // Enable reconnection attempts
  reconnectionAttempts: 3, // Number of reconnection attempts
  reconnectionDelay: 1000, // Delay between reconnection attempts (in milliseconds)
  timeout: 5000, // Connection timeout (in milliseconds)
  autoConnect: true, // Automatically connect on instantiation
  query: { token: 'your-auth-token' }, // Custom query parameters
  // Add more options as needed
});

//socket.emit('clientMessage', {"slaveName":"mobileApp","page":"alarm","command":"refresh","execute":"true","zones":"0","output":"0"});
socket.on('connect', () => {
  console.log('Connected to Socket.IO server');
  // You can send initial data or perform other actions here
});


socket.on('disconnect', () => {
 
});
*/
export default socket;
