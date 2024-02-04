import { io } from 'socket.io-client';

const SOCKET_URL = 'https://192.168.1.13:2000'; // Replace with your server URL

const socket = io(SOCKET_URL, {
  transports: ['websocket'], // Use WebSocket as the transport
});

export default socket;
