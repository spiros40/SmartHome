const alarm=require('../Alarm/commandsToAlarmBoard')
const mobileApp=(receivedData)=>{
   
    const checkJson=(receivedData)=>{
        try {
          const slave = JSON.parse(receivedData);
          const slaveName = slave.slaveName;
          const page=slave.page;
          const command=slave.command;
            return page,command;
        }catch (error) {
          console.error('Error parsing JSON:', error.message);
          return -1;
        }
      }
    checkJson(receivedData);


}

module.export=mobileApp;