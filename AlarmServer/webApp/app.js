const {HTTPSRun, HTTPRun} =require('../AlarmServer/servers/httpsServer');
const TELNETRun=require('../AlarmServer/servers/telnetServer');

// Start the Telnet server
TELNETRun();

// Start the HTTPS server
HTTPSRun;

// Start the HTTP server
//HTTPRun();

/*
const net = require('net');
const alarm=require('Alarm/alarmCommands');
const https = require('https');
const fs = require('fs');
const express = require('express');

const httpsServer = express();

//https server
const options = {
  key: fs.readFileSync('path/to/your/private-key.pem'),
  cert: fs.readFileSync('path/to/your/certificate.pem'),
};
//http server
const httpsServerPort=2000;
//telnet server
const clients = [];
const serverIP='192.168.1.9';
const telnetServerPort=1500;
//clients IP
const alarmSystemIP='192.168.1.3';

httpsServer.use((req, res, next) => {
  console.log(`Received request for: ${req.method} ${req.url}`);
  next();
});

// Route handling
httpsServer.get('/', (req, res) => {
  res.send('Hello, this is your Express HTTP server!');
});

httpsServer.get('/about', (req, res) => {
  res.send('About page');
});

// Handling 404 errors
httpsServer.use((req, res) => {
  res.status(404).send('404: Page not found');
});

// Start the server
httpsServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const telnetServer = net.createServer((socket) => {
  console.log('Client connected. IP:', socket.remoteAddress);
  //push client into array
  clients.push(socket);

  socket.write('Hello, client! Welcome to the server.\r\n');

  socket.on('data', (data) => {
    const receivedData = data.toString().trim();
    console.log(`Received data from ${socket.remoteAddress}: ${receivedData}`);
    if(receivedData==='ar'){
      console.log(data.toString());
      //console.log(alarm('set the alarm on'));
      const array=[2,3,4,17,8,20,-1];
      let a=alarm('bypass',array);
      console.log(a);
      alarmSystem();
      sendToClientByIP('192.168.1.3', a);
    }
    if (receivedData.startsWith('IP:')) {
      // Extract the IP address from the received data
      const ipAddress = receivedData.substring(3).trim();
        console.log(ipAddress);
      // Send a message to the client with the specified IP address
      sendToClientByIP(ipAddress, `Direct message from server to ${ipAddress}: Hello!\r\n`);
    } 
  });

  socket.on('end', () => {
    console.log('Client disconnected. IP:', socket.remoteAddress);
    clients.splice(clients.indexOf(socket), 1);
  });
});
telnetServer.listen(telnetServerPort, serverIP, () => {
  console.log(`Server with ip ${serverIP} \n listening on port ${telnetServerPort}`);
});
// Broadcast the received data to all clients
const Broadcast=()=> {
      clients.forEach((client) => {
          client.write(`Broadcast`);
      });
    }
//send message to clients
function sendToClientByIP(ipAddress, message) {
  const targetClient = clients.find((client) => client.remoteAddress === ipAddress);
  //console.log(targetClient);
  if (targetClient) {
    targetClient.write(message);
  } else {
    console.log(`Client with IP address ${ipAddress} not found.`);
  }
}
//send data to alarm module to process
const alarmSystem=(alarmCommand,alarmData)=>{
  let dataToSend=alarm(alarmCommand,alarmData);
  if(dataToSend!=-1){
    sendToClientByIP(alarmSystemIP, dataToSend);
  }
}
*/
/*const net = require('net');
const alarm=require('Alarm/alarmCommands');

const clients = [];
const serverIP='192.168.1.9';
const serverPort=1500;
//clients IP
const alarmSystemIP='192.168.1.3';

const server = net.createServer((socket) => {
  console.log('Client connected. IP:', socket.remoteAddress);

  clients.push(socket);

  socket.write('Hello, client! Welcome to the server.\r\n');

  socket.on('data', (data) => {
    const receivedData = data.toString().trim();
    console.log(`Received data from ${socket.remoteAddress}: ${receivedData}`);
    if(receivedData==='ar'){
      console.log(data.toString());
      //console.log(alarm('set the alarm on'));
      const array=[2,3,4,17,8,20,-1];
      let a=alarm('bypass',array);
      console.log(a);
      alarmSystem();
      sendToClientByIP('192.168.1.3', a);
    }
    if (receivedData.startsWith('IP:')) {
      // Extract the IP address from the received data
      const ipAddress = receivedData.substring(3).trim();
        console.log(ipAddress);
      // Send a message to the client with the specified IP address
      sendToClientByIP(ipAddress, `Direct message from server to ${ipAddress}: Hello!\r\n`);
    } else {
      // Broadcast the received data to all clients except the sender
      clients.forEach((client) => {
        if (client !== socket) {
          client.write(`Broadcast: ${data}`);
        }
      });
    }
  });

  socket.on('end', () => {
    console.log('Client disconnected. IP:', socket.remoteAddress);
    clients.splice(clients.indexOf(socket), 1);
  });
});

server.listen(serverPort, serverIP, () => {
  console.log(`Server with ip ${serverIP} \n listening on port ${serverPort}`);
});

//send message to clients
function sendToClientByIP(ipAddress, message) {
  const targetClient = clients.find((client) => client.remoteAddress === ipAddress);
  //console.log(targetClient);
  if (targetClient) {
    targetClient.write(message);
  } else {
    console.log(`Client with IP address ${ipAddress} not found.`);
  }
}

//send data to alarm module to process
const alarmSystem=(alarmCommand,alarmData)=>{
  let dataToSend=alarm(alarmCommand,alarmData);
  sendToClientByIP(alarmSystemIP, dataToSend);
}
*/
// const net = require('net');

// // Array to store connected clients
// const clients = [];

// // Create a Telnet server
// const server = net.createServer((socket) => {
//   // Store the client socket in the clients array
//   clients.push(socket);
//   console.log(clients);

//   // Send a welcome message to the client
//   socket.write('Connected');

//   // Broadcast a message to all connected clients
//   function broadcast(message, sender) {
//     clients.forEach((client) => {
//       if (client === sender) return; // Skip the sender
//       client.write(`[User ${clients.indexOf(sender) + 1}] ${message}`);
//     });
//   }
  
//   // Function to send data to a specific client by IP address
// function sendToClientByIP(ipAddress, message) {
//   const targetClient = clients.find((client) => client.remoteAddress === ipAddress);
//   if (targetClient) {
//     targetClient.write(message);
//   } else {
//     console.log(`Client with IP address ${ipAddress} not found.`);
//   }
// }

//   // Listen for data from the client
//   socket.on('data', (data) => {
//     const command = data.toString().trim();
//     if (command === 'exit') {
//       socket.write('Goodbye!\r\n');
//       console.log(command);
//       socket.end();
//     }else if (command === 'on') {
//       let a=clients.length;
//       let b=socket.remoteAddress;//localAddress;
//       socket.write('444t!\r\n '+ a+'\r\n ' + b+'\r\n ');
//     }else if (command === 'all') {
//       let a=clients.length;
//       let b=socket.remoteAddress;//localAddress;
//       //socket.write('all'+b);
//       broadcast(command + '\r\n'+socket.remoteAddress, socket);
//     }else if (command === 'ar') {
//       socket.write("disarm");
//       sendToClientByIP('192.168.1.3', 'Hello, specific client!');
//       console.log(data.toString().trim());
//     }else {
//       // Broadcast the received message to all connected clients
//       broadcast(command + '\r\n', socket);
//     }
//   });
//   socket.on("error", (err) => { 
//     console.log("client connection got errored out.") 
//   });
//   server.on('error', (e) => { 
//     if (e.code === 'EADDRINUSE') { 
//       console.log('Address in use, retrying...'); 
//       setTimeout(() => { 
//         server.close(); 
//         server.listen(PORT, HOST); 
//       }, 1000); 
//     } 
//     else { 
//       console.log("Server failed.") 
//     } 
//   }); 
//   // Remove the disconnected client from the array
//   socket.on('end', () => {
//     const index = clients.indexOf(socket);
//     if (index !== -1) {
//       clients.splice(index, 1);
//     }
//     console.log(`Client disconnected [Total clients: ${clients.length}]`);
//   });
// });

// const port = 1500; // Telnet default port is 23

// server.listen(port, () => {
//   console.log(`Telnet server listening on port ${port}`);
//   console.log(clients);
// });






// const net = require('net');

// // Array to store connected clients
// const clients = [];

// // Create a Telnet server
// const server = net.createServer((socket) => {
//   // Store the client socket in the clients array
//   clients.push(socket);
//   console.log(clients);

//   // Send a welcome message to the client
//   socket.write('Connected');

//   // Broadcast a message to all connected clients
//   function broadcast(message, sender) {
//     clients.forEach((client) => {
//       if (client === sender) return; // Skip the sender
//       client.write(`[User ${clients.indexOf(sender) + 1}] ${message}`);
//     });
//   }
//   // Listen for data from the client
//   socket.on('data', (data) => {
//     const command = data.toString().trim();
//     if (command === 'exit') {
//       socket.write('Goodbye!\r\n');
//       console.log(command);
//       socket.end();
//     }else if (command === 'on') {
//       let a=clients.length;
//       let b=socket.remoteAddress;//localAddress;
//       socket.write('444t!\r\n '+ a+'\r\n ' + b+'\r\n ');
//     }else if (command === 'all') {
//       let a=clients.length;
//       let b=socket.remoteAddress;//localAddress;
//       //socket.write('all'+b);
//       broadcast(command + '\r\n'+socket.remoteAddress, socket);
//     }else if (command === 'ar') {
//       socket.write("disarm");
//       console.log(data.toString().trim());
//     }else {
//       // Broadcast the received message to all connected clients
//       broadcast(command + '\r\n', socket);
//     }
//   });
//   socket.on("error", (err) => { 
//     console.log("client connection got errored out.") 
//   });
//   server.on('error', (e) => { 
//     if (e.code === 'EADDRINUSE') { 
//       console.log('Address in use, retrying...'); 
//       setTimeout(() => { 
//         server.close(); 
//         server.listen(PORT, HOST); 
//       }, 1000); 
//     } 
//     else { 
//       console.log("Server failed.") 
//     } 
//   }); 
//   // Remove the disconnected client from the array
//   socket.on('end', () => {
//     const index = clients.indexOf(socket);
//     if (index !== -1) {
//       clients.splice(index, 1);
//     }
//     console.log(`Client disconnected [Total clients: ${clients.length}]`);
//   });
// });

// const port = 1500; // Telnet default port is 23

// server.listen(port, () => {
//   console.log(`Telnet server listening on port ${port}`);
//   console.log(clients);
// });






// const net = require('net');

// // Array to store connected clients
// const clients = [];

// // Create a Telnet server
// const server = net.createServer((socket) => {
//   // Store the client socket in the clients array
//   clients.push(socket);
//   console.log(clients);

//   // Send a welcome message to the client
//   socket.write('Welcome to the Telnet server!\r\n');
//   socket.write('Type "exit" to disconnect.\r\n');

//   // Broadcast a message to all connected clients
//   function broadcast(message, sender) {
//     clients.forEach((client) => {
//       if (client === sender) return; // Skip the sender
//       client.write(`[User ${clients.indexOf(sender) + 1}] ${message}`);
//     });
//   }

//   // Listen for data from the client
//   socket.on('data', (data) => {
//     const command = data.toString().trim();
//     if (command === 'exit') {
//       socket.write('Goodbye!\r\n');
//       socket.end();
//     }else if (command === 'on') {
//       let a=clients.length;
//       let b=socket.remoteAddress;//localAddress;
//       socket.write('444t!\r\n '+ a+'\r\n ' + b+'\r\n ');
//     }else if (command === 'all') {
//       let a=clients.length;
//       let b=socket.remoteAddress;//localAddress;
//       //socket.write('all'+b);
//       broadcast(command + '\r\n'+socket.remoteAddress, socket);
//     }else if (command === 'ar') {
//       socket.write('o');
//     }else {
//       // Broadcast the received message to all connected clients
//       broadcast(command + '\r\n', socket);
//     }
//   });

//   // Remove the disconnected client from the array
//   socket.on('end', () => {
//     const index = clients.indexOf(socket);
//     if (index !== -1) {
//       clients.splice(index, 1);
//     }
//     console.log(`Client disconnected [Total clients: ${clients.length}]`);
//   });
// });

// const port = 1500; // Telnet default port is 23

// server.listen(port, () => {
//   console.log(`Telnet server listening on port ${port}`);
//   console.log(clients);
// });

