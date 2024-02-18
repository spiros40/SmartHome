//returns data from slaves 
const checkJson=(receivedData)=>{
    try {
      const slave = JSON.parse(receivedData);
      const slaveName = slave.slaveName;
      const page = slave.page;
      const command = slave.command;
      const execute = slave.execute;
      const zones = slave.zones;
      const outputs = slave.output;
      console.log(`Namecheck: ${slaveName}`);

      return {slaveName, page, command, execute, zones, outputs};
    }catch (error) {
      console.error('Error parsing JSON:', error.message);
      return 'error';
    }
  }
module.exports=checkJson;