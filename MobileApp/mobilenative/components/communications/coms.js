import { io } from 'socket.io-client';




const SOCKET_URL = 'https://192.168.1.13:2000'; // Replace with your server URL

//const socket = io(SOCKET_URL);
const socket = io(SOCKET_URL, {
  transports: ["websocket"]
});

socket.on('connect', () => {
  console.log('Connected to Socket.IO server');
  // You can send initial data or perform other actions here
});


// // Event listener for receiving messages from the server
// socket.on('message', (data) => {
//   console.log('Received message from server:', data);
//   // Process the data as needed
// });

// // Example: Sending a message to the server
// socket.emit('clientMessage', 'Hello from the client!');
socket.on('disconnect', () => {
 
});

export default socket;
