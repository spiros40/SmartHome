const {net} = require('net');
const fs = require('fs');
const socketIo=require('socket.io');
const encryption=require('../../Data/hashing/hashing');
const decryption=require('../../Data/hashing/verify');
const dataDB=require('../../Data/database/database');
const checkJson=require('../../Data/Json/chechJson');
const http = require('http');


const serverPort=process.env.PORT || 2000;
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
const comServer=()=>{
    // Create an HTTP server
    const server = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');
    });

    // Attach Socket.IO to the server
    const io = socketIo(server);

    // Event listener for connections
    io.on('connection', (socket) => {
        console.log('A user connected to httpSocketServer');

        // Event listener for custom events
        socket.on('chat message', (msg) => {
           //adds connected client to an array
          const existingClient = connectedClients.find(client => client.id === socket.id);
          if (!existingClient) {
            let slaveName=checkJson(msg)
            // If the socket ID doesn't exist, add it to the array
            connectedClients.push({ id: socket.id, ip: socket.handshake.address, slaveName: slaveName.slaveName });
          }
          console.log(`Message from HttpServer  ${socket.id}: ${msg}`);
          console.log(connectedClients);
         // sendDataToTelnetServer(telnetServerPort, {"slaveName":"mobileApp","page":"alarm","command":"refresh","execute":"true","zones":"0","output":"0"})
          io.emit('chat message', JSON.stringify(checkJson(msg))); 

             // Event listener for disconnections
        io.on('disconnect', () => {
          //adds connected client to an array
           const existingClient = connectedClients.find(client => client.id === socket.id);
           if (!existingClient) {
               let slaveName=checkJson(msg)
               // If the socket ID doesn't exist, add it to the array
               connectedClients.push({ id: socket.id, ip: socket.handshake.address, slaveName: slaveName.slaveName });
           }
           console.log(`Message from HttpServer  ${socket.id}: ${msg}`);
           console.log(connectedClients);
          // sendDataToTelnetServer(telnetServerPort, {"slaveName":"mobileApp","page":"alarm","command":"refresh","execute":"true","zones":"0","output":"0"})
           io.emit('chat message', JSON.stringify(checkJson(msg)));
       });
        
        });
    });
    // Start the server
    server.listen(serverPort, serverIP, () => {
        console.log(`Http Server ip ${serverIP}  on port ${serverPort}`);
    });
}

module.exports=comServer;