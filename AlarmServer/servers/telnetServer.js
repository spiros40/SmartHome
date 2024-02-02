
const net = require('net');
const alarm=require('../Alarm/commandsToAlarmBoard');
const slavesData=require('../Data/slavesData');



//telnet server
const clients = [];

const serverIP='192.168.1.13';
const telnetServerPort=1500;
//clients IP
const alarmSystemIP='192.168.1.3';


const telnetServer = net.createServer((socket) => {
  console.log('Client connected. IP:', socket.remoteAddress);
  //push client into array
  clients.push(socket);
  socket.write('Hello, client! Welcome to the server.\r\n');
  
  socket.on('data', (data) => {
    const receivedData = data.toString().trim();
    //console.log(`Received data from ${socket.remoteAddress}: ${receivedData}`);
    console.log(` ${receivedData}`);
    console.log(checkJson(receivedData));
    
    //const obj = JSON.parse(receivedData);
    //console.log(obj.status);
    if(receivedData==='ar'){
      console.log(data.toString());
      //console.log(alarm('set the alarm on'));
      const array=[2,3,4,17,8,20,-1];
      let a=alarm('bypass',array);
      console.log(a);
      alarmSystem();
      sendToClientByIP('192.168.1.3', a);
    }
    if (receivedData.startsWith('alarm')) {
      sendToClientByIP('192.168.1.3', alarm('enableOutput', '1','2'));
      console.log(getSlavesData('alarmSystem',"ip"));
    } 
    if (receivedData.startsWith('ip')) {
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
    socket.end();
  });
  socket.on('close', () => {
    // Client has terminated the connection
    console.log('//////////////////');
    socket.end();
    //socket.destroy(); // Close the connection forcefully
    clients.splice(clients.indexOf(socket), 1);
  });
  socket.on('error', (err) => {
    console.error('Server error:', err.message);
  });
  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.log('-----------------');
    console.error('Uncaught Exception:', err);
    process.exit(1); // Exit with failure status
    
  });
  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.log('+++++++++++++++++');
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // You might want to log the error and handle it gracefully
  });
});
//init the telnet server
const TELNETRun=()=>{
  try{
    telnetServer.listen(telnetServerPort, serverIP, () => {
    console.log(`Server ip ${serverIP} \n TELNET on port ${telnetServerPort}`);
       // console.log(alarm('enableOutput', '1','2'));
    // sendToClientByIP('192.168.1.3', alarm('enableOutput', '1','2'));
  });
  }catch (error) {
    console.log(error);
  }

 
}
// Broadcast the received data to all clients
const Broadcast=()=> {
      clients.forEach((client) => {
          //client.write(`Broadcast`);
          client.write(`{\"slave\":\"alarm\",\"command\":10,\"zone\":20,\"output\":50}`);
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
//returns data from slaves 
const getSlavesData=(name,returnValue)=>{
  try {
    const slave = JSON.parse(slavesData[`${name}`]);
    const slaveName = slave.slaveName;
    const ip = slave.ip;
    
    console.log(`Name: ${slaveName}, ip: ${ip}`);
    if (returnValue in slave) {
      console.log(`The object has the property ${slave[returnValue]}`);
      return slave[returnValue];
    } else {
      console.log(`The object does not have the property ${slave[returnValue]}`);
      return -1;
    }
  }catch (error) {
    console.error('Error parsing JSON:', error.message);
  }
}
//send data to alarm module to process
const alarmSystem=(alarmCommand,alarmData)=>{
  let dataToSend=alarm(alarmCommand,alarmData);
  if(dataToSend!=-1){
    sendToClientByIP(alarmSystemIP, dataToSend);
  }
}
// process.on('error', (err) => {
//   console.error('Server error:', err.message);
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//   console.log('-----------------');
//   console.error('Uncaught Exception:', err);
//   process.exit(1); // Exit with failure status
  
// });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (reason, promise) => {
//   console.log('+++++++++++++++++');
//   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
//   // You might want to log the error and handle it gracefully
// });

module.exports=TELNETRun,alarmSystem;
//module.exports=TELNETRun;