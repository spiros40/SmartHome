import { StatusBar } from 'expo-status-bar';
import React, { useEffect,useState } from 'react';
import { StyleSheet,View} from 'react-native';
import FrameSwitch from '../../UI/Frames/FrameSwitch';
import StatusFrame from '../../UI/Frames/StatusFrame';
import BypassFrame from './BypassFrame';
import socket from '../../communications/coms';
import jsonFromServer from './JsonFromServer';

const AlarmScreen=()=>{
  const [armAway, setArmAway] = useState(false);
  const [armStay, setArmStay] = useState(false);
  const [disarm, setDisarm] = useState(false);
  const [bypass, setBypass] = useState(false);
  const [statusText, setstatusText] = useState('');

  const systemStatus=(status)=>{
    switch(status){
      case 'Arm Away':
        setArmAway(true);
        setArmStay(false);
        setDisarm(false);
    break;
      case 'Arm Stay':
        setArmAway(false);
        setArmStay(true);
        setDisarm(false);
    break;
      case 'Disarm':
        setArmAway(false);
        setArmStay(false);
        setDisarm(true);
    break;
  }
}

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // This function will be called every 30 seconds
  //    // setArmAway(previousState => !previousState);
  //     console.log('++++++alarm screen  '+armAway);
  //   }, 10000); // 30 seconds in milliseconds

  //   // Cleanup function to clear the interval when the component unmounts
  //   return () => clearInterval(interval);
  // }, [armAway]);
  //
  useEffect(() => {
    // Emit a message to the server "slaveName":"mobileApp","page":"alarm","command":"refresh" 
    socket.emit('chat message', JSON.stringify({"slaveName":"mobileApp","page":"alarm","command":"refresh"}));
    // Listen for messages from the server
    socket.on('chat message', (msg) => {
      console.log('Message from server:', msg);
      let jsonParsedMsg= jsonFromServer(msg);
      setstatusText(`${jsonParsedMsg.command}`+" Zones: "+`${jsonParsedMsg.zones}`+" Outputs: "+`${jsonParsedMsg.outputs}`);
      systemStatus(jsonParsedMsg.command);
      console.log(jsonParsedMsg.command+'----------------------');
    });
    return () => {
      // Clean up listeners when the component unmounts
      socket.disconnect();
    };
  }, [socket.on]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonView}> 
        <FrameSwitch
          name="Arm Away"
          source={require('../../../Data/Pics/arm.png')}
          state={armAway}
        />
        <FrameSwitch
          name="Arm Stay"
          source={require('../../../Data/Pics/stayArm.png')}
          state={armStay}
        />
      </View>
      <View style={styles.buttonView}> 
        <FrameSwitch
          name="Disarm"
          source={require('../../../Data/Pics/disarm.png')}
          state={disarm}
        />
        <BypassFrame
          name="Bypass"
          source={require('../../../Data/Pics/bypass.png')}
          zones={"1"}
        />
      </View>
      <View>
        <StatusFrame
          name="Alarm Status"
          recievedText={statusText}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'rgb(191 219 204)',
    backgroundColor: 'rgb(5, 10, 10)',
    alignItems: 'center',
    justifyContent: 'center',
    gap:20,
  },
  titleText:{
    color: 'black',
    borderBottomWidth: 1,
    fontSize:25,
    marginBottom:20,
    fontWeight: 'bold',
  },
  buttonView:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 15,
  },
  
  bypassView:{
    margin:20,
    width:265,
    },
    bypassInput: {
      height: 40,
      width:265,
      borderWidth: 1,
      padding: 10,
      marginTop:10,
    },
});

export default AlarmScreen;

/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,Button,
  View,SafeAreaView,Alert,TextInput} from 'react-native';
import MultiSelectDropdown from './components/dropDownList';
import ZonesToBypass from './Data/zones';
import Buttons from './components/Button';
import Frame from './components/frame';
import StatusFrame from './components/statusFrame';
import BypassFrame from './components/bypassFrame'

export default function App() {
  
  return (
    <View style={styles.container}>
      { <Text style={styles.titleText}
        >Home Alarm</Text>

      <View style={styles.buttonView}> }
      <View style={styles.buttonView}> 
        <Frame
          name="Arm Away"
          source={require('./Data/Pics/arm.png')}
        />
        <Frame
          name="Arm Stay"
          source={require('./Data/Pics/stayArm.png')}
        />
      </View>
      <View style={styles.buttonView}> 
        <Frame
          name="Disarm"
          source={require('./Data/Pics/disarm.png')}
        />
        <BypassFrame
          name="Bypass"
          source={require('./Data/Pics/bypass.png')}
          
        />
      </View>
      <View>
        <StatusFrame
          name="Alarm Status"
          recievedText="recievedText"
        />
      </View>
         <Buttons 
          title="Full Arm"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
        <Buttons 
          title="Stay Arm"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
        <Buttons
          title="Disarm"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
        
      </View>
      <View style={styles.bypassView}>
      <Buttons
          title="Bypass"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
        <MultiSelectDropdown options={ZonesToBypass} />
       
      </View>
      <View style={styles.alarmView}>
      
      <label style={styles.alarmLabel}>
        Alarm
      </label>
        <TextInput
          style={styles.alarmInput}
           onChangeText={onChangeNumber}
           value={number}
          placeholder="Opened Zones"
          keyboardType="numeric"
         />
      </View>
       }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(191 219 204)',
    alignItems: 'center',
    justifyContent: 'center',
    gap:10,
  },
  titleText:{
    color: 'black',
    borderBottomWidth: 1,
    fontSize:25,
    marginBottom:20,
    fontWeight: 'bold',
  },
  buttonView:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 15,
  },
  
  bypassView:{
    margin:20,
    width:265,
    },
    bypassInput: {
      height: 40,
      width:265,
      borderWidth: 1,
      padding: 10,
      marginTop:10,
    },
    alarmView:{
      margin:20,
      width:265,
      },
      alarmInput: {
        height: 40,
        width:265,
        borderWidth: 1,
        padding: 10,
        marginTop:10,
      },
      alarmLabel:{
        width:265,
        height:40,
        textAlign:'center',
        fontSize:20,
        backgroundColor:'#2196F3',
        color:"white",
      },
  
});
*/