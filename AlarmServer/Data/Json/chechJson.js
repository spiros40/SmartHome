/*Parse the json  received data and return it to caller*/
const checkJson=(receivedData)=>{
 
    try {
      const slave = JSON.parse(receivedData);
      const slaveName = slave.slaveName;
      const page = slave.page;
      const command = slave.command;
      const execute = slave.execute;
      const zones = slave.zones;
      const outputs = slave.output;

      return {slaveName, page, command,execute, zones, outputs };
    }catch (error) {
      console.error('Error parsing JSON:', error.message);
      return 'error';
    }
  }
module.exports=checkJson;

//{"slaveName":"mobileApp","page":"alarm","command":"refresh","execute":"true","zones":"0","output":"0"}