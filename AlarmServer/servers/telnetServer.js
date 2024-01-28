const net = require('net');
const alarm=require('../Alarm/alarmCommands');


//telnet server
const clients = [];
const serverIP='192.168.1.12';
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
    if (receivedData.startsWith('ip')) {
      // Extract the IP address from the received data
      const ipAddress = receivedData.substring(3).trim();
        console.log(ipAddress);
        Broadcast();
      // Send a message to the client with the specified IP address
      sendToClientByIP(ipAddress, `Direct message from server to ${ipAddress}: Hello!\r\n`);   
    } 
  });

  socket.on('end', () => {
    console.log('Client disconnected. IP:', socket.remoteAddress);
    clients.splice(clients.indexOf(socket), 1);
  });
});
//init the telnet server
const TELNETRun=()=>{
  telnetServer.listen(telnetServerPort, serverIP, () => {
    console.log(`Server ip ${serverIP} \n TELNET on port ${telnetServerPort}`);
  });
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
//send data to alarm module to process
const alarmSystem=(alarmCommand,alarmData)=>{
  let dataToSend=alarm(alarmCommand,alarmData);
  if(dataToSend!=-1){
    sendToClientByIP(alarmSystemIP, dataToSend);
  }
}


module.exports=TELNETRun;