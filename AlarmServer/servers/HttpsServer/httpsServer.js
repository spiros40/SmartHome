const https = require('https');
const fs = require('fs');
const socketIO = require('socket.io');
const express = require('express');

const expressApp = express();

const serverPort=2000;
const serverIP='192.168.1.13';

const serverOptions = {
  key: fs.readFileSync('servers/HttpsServer/server.key'),
  cert: fs.readFileSync('servers/HttpsServer/server.cert'),
  
};

//server constractors and error listeners
const server = https.createServer(serverOptions, (req, res) => {
  res.writeHead(200);
  res.end('Hello, this is an HTTPS server!\n');
});
// Event listener for handling server errors
server.on('error', (error) => {
  console.error('Server error:', error);
});
// Event listener for handling client connections
server.on('connection', (socket) => {
  console.log(`New connection from ${socket.remoteAddress}`);
});
// Event listener for handling server close
server.on('close', () => {
  console.log('Server closed');
});
// Start the HTTPS server
const HTTPSRun=()=>{
  try{
    server.listen(serverPort, serverIP, () => {
    console.log(`Server ip ${serverIP} \n Https on port ${serverPort}`);
  });
  }catch (error) {
    console.log(error);
  }
}


// Create a WebSocket server attached to the HTTPS server
const io = socketIO(server);


// Middleware to log incoming requests
expressApp.use((req, res, next) => {
  console.log(`Incoming request from ${req.ip} for ${req.url}`);
  next(); // Continue to the next middleware or route
});

// Serve static files (you can customize this based on your needs)
expressApp.use(express.static('public'));

// Set up a basic route
expressApp.get('/', (req, res) => {
  console.log('+++++++++');
  res.sendFile('index.html');
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');
  // Listen for messages from the client
  socket.on('chat message', (msg) => {
    console.log(`Message from ${socket.id}: ${msg}`);
    checkJson(msg);
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });
  // Listen for disconnect event
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
//returns data from slaves 
const checkJson=(receivedData)=>{
  try {
    const slave = JSON.parse(receivedData);
    const slaveName = slave.slaveName;
    console.log(`Namecheck: ${slaveName}`);
    return slaveName;
  }catch (error) {
    console.error('Error parsing JSON:', error.message);
    return -1;
  }
}

});



module.exports = {HTTPSRun};