const net = require('net');
const fs = require('fs');
const socketIo=require('socket.io');
const checkJson=require('../../Data/Json/chechJson');
const http = require('http');
require('dotenv').config();


const serverPort=process.env.HTTP_SERVER_PORT;
const serverIP=process.env.HTTP_SERVER_IP;
const telnetServerPort=process.env.TELNET_SERVER_PORT;
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
const sendDataToTelnetServer=(telnetServerPort,serverIP,jsonMessage )=> {
    
  const telnetClient = net.connect({
      host: serverIP,
      port: telnetServerPort,
    });
  
    //const dataToSend = JSON.stringify(jsonMessage);
    //telnetClient.write(dataToSend);
    telnetClient.write(jsonMessage);
    //receive from data from telnet
    telnetClient.on('data', (data) => {
      console.log('Received from Telnet server:', data.toString());
      return JSON.stringify(data.toString());
    });
    telnetClient.setTimeout(60000);
    telnetClient.on('timeout', () => {
      console.log('socket timeout');
      telnetClient.end();
      });
    telnetClient.on('error', (err) => {
      console.error('Telnet connection error:', err.message);
      return undefined;
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
        console.log('A user connected to http Socket Server');
        // Event listener for custom events
        socket.on('chat message', (msg) => {
          //adds connected client to an array          
          const existingClient = connectedClients.find(client => client.id === socket.id);
          if (!existingClient) {
            let slaveName=checkJson(msg)
            // If the socket ID doesn't exist, add it to the array
            connectedClients.push({ id: socket.id, ip: socket.handshake.address, slaveName: slaveName.slaveName });
          }
          console.log(`Message from client  ${socket.id}: ${msg}`);
          console.log(connectedClients);
          try{//sends the received message to telnet server for execution
            if(msg!==undefined){
              var telnetMsg=sendDataToTelnetServer(telnetServerPort,serverIP, msg);
            }else{
              socket.emit('chat message', {"slaveName":"server","command":"sendAgain"});
            }
            if(telnetMsg!==undefined){
              socket.emit('chat message', JSON.stringify(telnetMsg));
            }else{
              socket.emit('chat message', {"slaveName":"server","command":"sendAgain"});
            }
          }catch(error){
            console.log(error);
          }
        });
        // Event listener for disconnections
        socket.on('disconnect', () => {
          console.log('User  '+ `${socket.id}` +'  disconnected');
          // Remove client information from the array upon disconnection
          const index = connectedClients.findIndex(client => client.id === socket.id);
          if (index !== -1) {
            connectedClients.splice(index, 1);
          }
          console.log('Remaining users ' +connectedClients);
        });
        socket.on('error', (err) => {
          console.error('Socket error:', err);
        });
    });

    const sendBySocket=(name,msg)=>{
      connectedClients.find((slaveName) => slaveName === name); 
      if(slaveName!==undefined){
        let encryptMsg=JSON.stringify(msg);
        io.to(slaveName.socketid).emit(encryptMsg);
        console.log("send by socket");
      }else{console.log(`element not found ${slaveName}`);}
    }
    // Start the server
    server.listen(serverPort, serverIP, () => {
        console.log(`Http Server ip ${serverIP}  on port ${serverPort}`);
    });
}

module.exports=comServer;