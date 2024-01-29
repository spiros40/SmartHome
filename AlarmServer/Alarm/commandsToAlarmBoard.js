const toServer=require("../servers/telnetServer");

const Alarm = (command,zonesToBypass, outputs) => {
  /*server commands*/            
  let commandDisarm=0,
      commandArm=1,    
      commandStayArm=2,
      commandBypass=4
      ,commandUnBypass=5
      ,commandEnableOutput=6
      ,commandDisableOutput=7    
      ,commandStatus=8;

  //converts to json
  const jsonConvert=(command, zonesToBypass, outputs)=>{
    // Create a JavaScript object
    const jsonResponce = {
      command: command,
      zone: zonesToBypass,
      output: outputs
    };
    // Convert the object to a JSON string
    const jsonString = JSON.stringify(jsonResponce);
    return jsonString;
  }    

  switch(command){
    case 'armFull':
      return jsonConvert(commandArm,0,0);
    break;
    
    case 'stayArm':
      return jsonConvert(commandStayArm,0,0);
    break;
    
    case 'disarm':
      return jsonConvert(commandDisarm,0,0);
    break;
    
    case 'bypass':
      return jsonConvert(commandBypass,zonesToBypass,0);
    break;

    case 'unbypass':
      return jsonConvert(commandUnBypass,zonesToBypass,0);
    break;

    case 'enableOutput':
      return jsonConvert(commandEnableOutput,0,outputs);
    break;

    case 'disableOutput':
      return jsonConvert(commandDisableOutput,0,outputs);
    break;

    case 'status':
      return jsonConvert(commandStatus,0,0);
    break;
    
    default:
      return -1;
  }
}
  
  module.exports = Alarm;


  /*//check array for wrong value and remove them
      const removeContition=(elementToRemove)=>elementToRemove < 0 || elementToRemove > 16;
      const readyArray=zonesToBypass.filter((elementToRemove) => !removeContition(elementToRemove));
      if(typeof emptyArray != 'undefined' &&
        emptyArray != null &&
        emptyArray.length != null &&
        emptyArray.length > 0){
        const arrayAsString = readyArray.join(',');
        return commandBypass `${arrayAsString}`;
      }else{return -1;}*/