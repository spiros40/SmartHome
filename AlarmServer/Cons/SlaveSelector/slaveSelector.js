const chechJson=require('../../Data/Json/chechJson')
//return the name of slave want to communicate
const slaveComRequest=(receivedData)=>{
    let slaveName=chechJson(receivedData);
    
    switch(slaveName.slaveName){
        case "alarm":
            
          break;
        case "telnetServer":
            
          break;
        case "mobileApp":
            
          break;
        case "httpsServer":
            
          break;
    }
}

module.exports=slaveComRequest;