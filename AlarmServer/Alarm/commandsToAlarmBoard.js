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
      slave:'alarm',
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

