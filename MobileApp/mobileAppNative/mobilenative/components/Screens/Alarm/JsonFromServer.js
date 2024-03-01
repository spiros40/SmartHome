const JsonFromServer=(receivedData)=>{
   
    // const checkJson=(receivedData)=>{
        try {
          const server = JSON.parse(receivedData);
          const serverName = server.serverName;
          const command=server.command;
          const execute=server.execute;
          const zones=server.zones;
          const outputs=server.outputs;
            return { serverName,command, execute,zones,outputs };
        }catch (error) {
          console.error('Error parsing JSON:', error.message);
          return -1;
        }
      //}serverName":"server","status":"fullArmed","zones":"1,2"
    //checkJson(receivedData);


}

export default JsonFromServer;