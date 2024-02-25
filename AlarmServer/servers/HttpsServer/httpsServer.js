const https = require('https');
const net = require('net');
const fs = require('fs');
const socketIO = require('socket.io');
const encryption=require('../../Data/hashing/hashing');
const decryption=require('../../Data/hashing/verify');
const dataDB=require('../../Data/database/database');
const checkJson=require('../../Data/Json/chechJson');
const cors = require('cors');

const serverPort=2000;
const serverIP='192.168.1.13';
const telnetServerPort=1500;
// Array to store conneced client information
const connectedClients = [];

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

const serverOptions = {
  secureOptions: require('constants').SSL_OP_ALL, // Enable all SSL/TLS versions
  key: fs.readFileSync('servers/HttpsServer/server.key'),
  cert: fs.readFileSync('servers/HttpsServer/server.cert'),
  
};

// client telnet send data to tellnet server
const sendDataToTelnetServer=(telnetServerPort,jsonMessage )=> {
  const telnetClient = net.connect({
    host: '192.168.1.13',
    port: telnetServerPort,
  });
  const dataToSend = JSON.stringify(jsonMessage);
  telnetClient.write(dataToSend);
  //receive from data from telnet
  telnetClient.on('data', (data) => {
    console.log('Received from Telnet server:', data.toString());
    // Process the data as needed
  });
  telnetClient.setTimeout(60000);
  telnetClient.on('timeout', () => {
    console.log('socket timeout');
    telnetClient.end();
    });
  //telnetClient.end();

  telnetClient.on('error', (err) => {
    console.error('Telnet connection error:', err.message);
  });
}
//server constractors and error listeners
const server = https.createServer(serverOptions, (req, res) => {
  res.writeHead(200);
  res.end('Hello, this is an HTTPS server!\n');
});


// Start the HTTPS server
const HTTPSEnable=()=>{
  try{
    server.listen(serverPort, serverIP, () => {
    console.log(`Server ip ${serverIP}  on port ${serverPort}`);
    //encryption('code');
    //decryption('code');
    //dataDB.connect();
  });
  }catch (error) {
    console.log(error);
  }
}

// Create a WebSocket server attached to the HTTPS server
const io = socketIO(server, {
  cors: {
    origin: 'https://192.168.1.13:2000',
    methods: ['GET', 'POST'],
    credentials: true // Allow credentials if needed
  }
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A Https user connected');
  // Listen for messages from the client
  socket.on('chat message', (msg) => {
  //adds connected client to an array
  const existingClient = connectedClients.find(client => client.id === socket.id);
    if (!existingClient) {
      let slaveName=checkJson(msg)
      // If the socket ID doesn't exist, add it to the array
      connectedClients.push({ id: socket.id, ip: socket.handshake.address, slaveName: slaveName.slaveName });
    }
  console.log(`Message from HttpsServer  ${socket.id}: ${msg}`);
  console.log(connectedClients);
  sendDataToTelnetServer(telnetServerPort, {"slaveName":"mobileApp","page":"alarm","command":"refresh","execute":"true","zones":"0","output":"0"})
    //checkJson(msg);
   // slaveComRequest(checkJson(msg));
    // Broadcast the message to all connected clients
   // io.emit('chat message', msg);JSON.stringify({"slaveName":"mobileApp","page":"alarm","command":"refresh"})
  io.emit('chat message', JSON.stringify(checkJson(msg)));
   //  io.emit('chat message', JSON.stringify({"serverName":"server","status":"disarm","zones":"1,2"}))
  //  delay(10000).then(() => { // Delay for 2000 milliseconds (2 seconds)
  //   io.emit('chat message', JSON.stringify({"serverName":"server","status":"armAway","zones":"1,2"}))
  // }) 
  // Broadcast the message to all connected clients
  // io.emit('chat message', msg);JSON.stringify({"slaveName":"mobileApp","page":"alarm","command":"refresh"})
  // Send data to the specific socket ID
  // io.to(socketID).emit('chat message', msg);
  });
  // Listen for disconnect event
  io.on('disconnect', () => {
    console.log('Https User  '+ `${socket.id}` +'  disconnected');
    // Remove client information from the array upon disconnection
    const index = connectedClients.findIndex(client => client.id === socket.id);
    if (index !== -1) {
      connectedClients.splice(index, 1);
    }
    console.log('https users ' +connectedClients);
  });

});

module.exports = {HTTPSEnable};

/*25/02
const https = require('https');
const net = require('net');
const fs = require('fs');
const socketIO = require('socket.io');
const express = require('express');
const encryption=require('../../Data/hashing/hashing');
const decryption=require('../../Data/hashing/verify');
const dataDB=require('../../Data/database/database');
const checkJson=require('../../Data/Json/chechJson');
const cors = require('cors');

const expressApp = express();

const serverPort=2000;
const serverIP='192.168.1.13';
const telnetServerPort=1500;
// Array to store conneced client information
const connectedClients = [];

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

const serverOptions = {
  secureOptions: require('constants').SSL_OP_ALL, // Enable all SSL/TLS versions
  key: fs.readFileSync('servers/HttpsServer/server.key'),
  cert: fs.readFileSync('servers/HttpsServer/server.cert'),
  
};

// client telnet send data to tellnet server
const sendDataToTelnetServer=(telnetServerPort,jsonMessage )=> {
  const telnetClient = net.connect({
    host: '192.168.1.13',
    port: telnetServerPort,
  });
  const dataToSend = JSON.stringify(jsonMessage);
  telnetClient.write(dataToSend);
  //receive from data from telnet
  telnetClient.on('data', (data) => {
    console.log('Received from Telnet server:', data.toString());
    // Process the data as needed
  });
  telnetClient.setTimeout(60000);
  telnetClient.on('timeout', () => {
    console.log('socket timeout');
    telnetClient.end();
    });
  //telnetClient.end();

  telnetClient.on('error', (err) => {
    console.error('Telnet connection error:', err.message);
  });
}
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
  // Store client information in the array  
  console.log(`New Https connection from ${socket.remoteAddress}`);
  
  //dataDB.updateValue('SmartHomeDB','Users',{name:"spy"}, { pass: "one" });//{$set:{ pass: "one" }}
  //console.log(dataDB.findARow('SmartHomeDB','Users',{name:"spy"}));//{$set:{ pass: "one" }}
  
  /*dataDB.findARow('SmartHomeDB','Users',{name:"spy"}).then(result => {
    console.log(result); // Will print when the promise resolves
}).catch(error => {
    console.error(error); // Handle any errors
});

});
// Event listener for handling server close
server.on('close', () => {
  console.log('Server closed');
});
// Start the HTTPS server
const HTTPSEnable=()=>{
  try{
    server.listen(serverPort, serverIP, () => {
    console.log(`Server ip ${serverIP} \n Https on port ${serverPort}`);
    //encryption('code');
    //decryption('code');
    //dataDB.connect();
  });
  }catch (error) {
    console.log(error);
  }
}

// Create a WebSocket server attached to the HTTPS server
const io = socketIO(server, {
  cors: {
    origin: 'https://192.168.1.13:2000',
    methods: ['GET', 'POST'],
    credentials: true // Allow credentials if needed
  }
});
// Enable CORS for all routes
expressApp.use(cors({
  origin: 'https://192.168.1.13:2000',
  credentials: true // optional, if you need to send cookies or authorization headers
}));
// Middleware to log incoming requests
expressApp.use((req, res, next) => {
  app.use(function(req, res, next) {
    next();
  });
  console.log(`Incoming request from ${req.ip} for ${req.url}`);
  next(); // Continue to the next middleware or route
});

// Serve static files (you can customize this based on your needs)
expressApp.use(express.static('public'));

// Set up a basic route
expressApp.get('/', (req, res) => {
  res.sendFile('index.html');
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A Https user connected');
  // Listen for messages from the client
  socket.on('chat message', (msg) => {
  //adds connected client to an array
  const existingClient = connectedClients.find(client => client.id === socket.id);
    if (!existingClient) {
      let slaveName=checkJson(msg)
      // If the socket ID doesn't exist, add it to the array
      connectedClients.push({ id: socket.id, ip: socket.handshake.address, slaveName: slaveName.slaveName });
    }
  console.log(`Message from HttpsServer  ${socket.id}: ${msg}`);
  console.log(connectedClients);
  sendDataToTelnetServer(telnetServerPort, {"slaveName":"mobileApp","page":"alarm","command":"refresh","execute":"true","zones":"0","output":"0"})
    //checkJson(msg);
   // slaveComRequest(checkJson(msg));
    // Broadcast the message to all connected clients
   // io.emit('chat message', msg);JSON.stringify({"slaveName":"mobileApp","page":"alarm","command":"refresh"})
  io.emit('chat message', JSON.stringify(checkJson(msg)));
   //  io.emit('chat message', JSON.stringify({"serverName":"server","status":"disarm","zones":"1,2"}))
  //  delay(10000).then(() => { // Delay for 2000 milliseconds (2 seconds)
  //   io.emit('chat message', JSON.stringify({"serverName":"server","status":"armAway","zones":"1,2"}))
  // }) 



  // Broadcast the message to all connected clients
  // io.emit('chat message', msg);JSON.stringify({"slaveName":"mobileApp","page":"alarm","command":"refresh"})
  // Send data to the specific socket ID
  // io.to(socketID).emit('chat message', msg);
  });
  // Listen for disconnect event
  socket.on('disconnect', () => {
    console.log('Https User  '+ `${socket.id}` +'  disconnected');
    // Remove client information from the array upon disconnection
    const index = connectedClients.findIndex(client => client.id === socket.id);
    if (index !== -1) {
      connectedClients.splice(index, 1);
    }
    console.log('https users ' +connectedClients);
  });

});



module.exports = {HTTPSEnable};



*/

/*
const https = require('https');
const net = require('net');
const fs = require('fs');
const socketIO = require('socket.io');
const express = require('express');
const encryption=require('../../Data/hashing/hashing');
const decryption=require('../../Data/hashing/verify');
const dataDB=require('../../Data/database/database');
const checkJson=require('../../Data/Json/chechJson');
const cors = require('cors');

const expressApp = express();

const serverPort=2000;
const serverIP='192.168.1.13';
const telnetServerPort=1500;
// Array to store conneced client information
const connectedClients = [];

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

const serverOptions = {
  key: fs.readFileSync('servers/HttpsServer/server.key'),
  cert: fs.readFileSync('servers/HttpsServer/server.cert'),
  
};
// Set up CORS middleware
expressApp.use(cors());

// client telnet send data to tellnet server
const sendDataToTelnetServer=(telnetServerPort,jsonMessage )=> {
  const telnetClient = net.connect({
    host: '192.168.1.13',
    port: telnetServerPort,
  });
  const dataToSend = JSON.stringify(jsonMessage);
  telnetClient.write(dataToSend);
  //receive from data from telnet
  telnetClient.on('data', (data) => {
    console.log('Received from Telnet server:', data.toString());
    // Process the data as needed
  });
  telnetClient.setTimeout(60000);
  telnetClient.on('timeout', () => {
    console.log('socket timeout');
    telnetClient.end();
    });
  //telnetClient.end();

  telnetClient.on('error', (err) => {
    console.error('Telnet connection error:', err.message);
  });
}
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
  // Store client information in the array  
  console.log(`New Https connection from ${socket.remoteAddress}`);
  
  //dataDB.updateValue('SmartHomeDB','Users',{name:"spy"}, { pass: "one" });//{$set:{ pass: "one" }}
  //console.log(dataDB.findARow('SmartHomeDB','Users',{name:"spy"}));//{$set:{ pass: "one" }}
  dataDB.findARow('SmartHomeDB','Users',{name:"spy"}).then(result => {
    console.log(result); // Will print when the promise resolves
}).catch(error => {
    console.error(error); // Handle any errors
});

});
// Event listener for handling server close
server.on('close', () => {
  console.log('Server closed');
});
// Start the HTTPS server
const HTTPSEnable=()=>{
  try{
    server.listen(serverPort, serverIP, () => {
    console.log(`Server ip ${serverIP} \n Https on port ${serverPort}`);
    //encryption('code');
    //decryption('code');
    dataDB.connect();
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
  res.sendFile('index.html');
});

// Handle WebSocket connections
io.on('connection', (socket) => {
 
  console.log('A Https user connected');
  // Listen for messages from the client
  socket.on('chat message', (msg) => {
  
  //adds connected client to an array
  const existingClient = connectedClients.find(client => client.id === socket.id);
    if (!existingClient) {
      let slaveName=checkJson(msg)
      // If the socket ID doesn't exist, add it to the array
      connectedClients.push({ id: socket.id, ip: socket.handshake.address, slaveName: slaveName.slaveName });
    }
  console.log(`Message from HttpsServer  ${socket.id}: ${msg}`);
  console.log(connectedClients);
  sendDataToTelnetServer(telnetServerPort, {"slaveName":"mobileApp","page":"alarm","command":"refresh","execute":"true","zones":"0","output":"0"})
    //checkJson(msg);
   // slaveComRequest(checkJson(msg));
    // Broadcast the message to all connected clients
   // io.emit('chat message', msg);JSON.stringify({"slaveName":"mobileApp","page":"alarm","command":"refresh"})
  io.emit('chat message', JSON.stringify(checkJson(msg)));
   //  io.emit('chat message', JSON.stringify({"serverName":"server","status":"disarm","zones":"1,2"}))
  //  delay(10000).then(() => { // Delay for 2000 milliseconds (2 seconds)
  //   io.emit('chat message', JSON.stringify({"serverName":"server","status":"armAway","zones":"1,2"}))
  // }) 



  // Broadcast the message to all connected clients
  // io.emit('chat message', msg);JSON.stringify({"slaveName":"mobileApp","page":"alarm","command":"refresh"})
  // Send data to the specific socket ID
  // io.to(socketID).emit('chat message', msg);
  });
  // Listen for disconnect event
  socket.on('disconnect', () => {
    console.log('Https User  '+ `${socket.id}` +'  disconnected');
    // Remove client information from the array upon disconnection
    const index = connectedClients.findIndex(client => client.id === socket.id);
    if (index !== -1) {
      connectedClients.splice(index, 1);
    }
    console.log('https users ' +connectedClients);
  });

});



module.exports = {HTTPSEnable};

*/