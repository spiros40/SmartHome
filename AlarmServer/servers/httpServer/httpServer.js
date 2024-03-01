const httpServer = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const checkJson=require('../../../AlarmServer/Data/Json/chechJson');

const httpServerPort=2001;
const serverIP='192.168.1.13';
const serverOptions = {
  secureOptions: require('constants').SSL_OP_ALL, // Enable all SSL/TLS versions
  key: fs.readFileSync('servers/httpServer/server.key'),
  //key: fs.readFileSync('servers/HttpsServer/certs/localhost.key'),
  cert: fs.readFileSync('servers/httpServer/server.cert'),
  //cert: fs.readFileSync('servers/HttpsServer/certs/localhost.crt'),
  
};

//server constractors and error listeners
const server = httpServer.createServer(serverOptions, (req, res) => {
  res.writeHead(200);
  res.end('Hello, this is an HTTP server!\n');
});

// Start the HTTPS server
const HTTPRun=()=>{
  try{
    server.listen(httpServerPort, serverIP, () => {
    console.log(`Http Server ip ${serverIP}  on port ${httpServerPort}`);
    //encryption('code');
    //decryption('code');
    //dataDB.connect();
  });
  }catch (error) {
    console.log(error);
  }
}

// Create a WebSocket server attached to the HTTPS server
const io = socketIO(httpServer, {
  cors: {
    origin: 'https://192.168.1.13:2001',
    methods: ['GET', 'POST'],
    credentials: true // Allow credentials if needed
  }
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A Http user connected');
  // Listen for messages from the client
  socket.on('chat message', (msg) => {
  //adds connected client to an array
  
  console.log(`Message from HttpServer  ${socket.id}: ${msg}`);
  console.log(connectedClients);
  io.emit('chat message', JSON.stringify(checkJson(msg)));
  });
  // Listen for disconnect event
  io.on('disconnect', () => {
    console.log('Http User  '+ `${socket.id}` +'  disconnected');
    // Remove client information from the array upon disconnection
    
  });

});


module.exports = HTTPRun;