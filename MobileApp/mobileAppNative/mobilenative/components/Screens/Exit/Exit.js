import socket from '../../communications/coms';
import { BackHandler } from 'react-native';

const Exit=()=>{
  socket.disconnect();
  console.log("exit--")
  BackHandler.exitApp();
};

export default Exit;