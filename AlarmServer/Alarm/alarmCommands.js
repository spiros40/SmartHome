const Alarm = (data,zonesToBypass) => {
  switch(data){
    case 'armFull':
      return 'arm';
    break;
    
    case 'stayArm':
      return 'stay';
    break;
    
    case 'disarm':
      return 'disarm';
    break;
    
    case 'bypass':
      //check array for wrong value and remove them
      const removeContition=(elementToRemove)=>elementToRemove < 0 || elementToRemove > 16;
      const readyArray=zonesToBypass.filter((elementToRemove) => !removeContition(elementToRemove));
      if(typeof emptyArray != "undefined" &&
        emptyArray != null &&
        emptyArray.length != null &&
        emptyArray.length > 0){
        const arrayAsString = readyArray.join(',');
        return `bypass ${arrayAsString}`;
      }else{return -1;}
    break;

    case 'status':
      return 'status';
    break;
  }
}
  
  module.exports = Alarm;