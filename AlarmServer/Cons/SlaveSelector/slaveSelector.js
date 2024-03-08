const chechJson=require('../../Data/Json/chechJson')
require('dotenv').config();
//return the name of slave want to communicate
const slaveComRequest=(receivedData)=>{
    let slaveName=chechJson(receivedData);
    let jsonMsg;
    switch(slaveName.slaveName){
        case "alarm":
          return (jsonMsg={ip:'192.168.1.3',data:`{"command":${slaveName.command},
            "execute":${slaveName.execute},"zones":${slaveName.zones},"outputs":${slaveName.outputs}}`});
          break;
        case "telnetServer":
          return (jsonMsg={ip:process.env.TELNET_SERVER_PORT,data:`{"command":${slaveName.command},
          "execute":${slaveName.execute},"zones":${slaveName.zones},"outputs":${slaveName.outputs}}`});
          break;
        case "mobileApp":
            
          break;
        case "httpServer":
            
          break;
    }
}

module.exports=slaveComRequest;