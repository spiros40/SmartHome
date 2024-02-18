import React, {useState,useEffect} from 'react';
import socket from '../../communications/coms';
import { StyleSheet, Text,
  View,Switch,Image} from 'react-native';

  export default function frameSwitch(props) {
    let execute=true;
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {setIsEnabled(previousState => !previousState);
      //{"serverName":"server","status":"armAway","zones":"1,2"}) =={"slaveName":"mobileApp","page":"alarm","command":`${props.name}`}
      socket.emit('chat message', JSON.stringify({"slaveName":"mobileApp","page":"alarm","command":`${props.name}`,"execute":`${execute}`, 
      "zones":"1,2,3","outputs":"1,2"
   }));
  }
    
    //refres the value whoo change from server
      useEffect(() => {
        setIsEnabled(props.state);
      }, [props.state]);


    return (
      <View style={[styles.container,styles.shadowProp]}>
        <View style={styles.top}>
          <Image
            style={styles.tinyLogo}
            source={props.source}
          />
        <View style={styles.switchStyle}>
          <Switch
            trackColor={{false: '#cc0000', true: '#8fce00'}}
            thumbColor={isEnabled ? '#318ce7' : '#f0f8ff'}
            onValueChange={toggleSwitch}
            onChange={execute=!isEnabled}
            value={isEnabled}
          />   
        </View>   
      </View>
      <View style={styles.nameView}>
        <Text style={styles.nameText}>{props.name}</Text>  
      </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(33,150,243, 0.8)',
      borderRadius:10,
      width:110,
      height:90,
    },
    top:{
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10,
        gap: 20,
    },
    switchStyle:{
      paddingTop:10,
    },
    nameView:{
        flex:2,
        flexDirection: 'row',
        margin: 20,
        textAlign:'center',
        position:'relative'
      },
    nameText:{
      fontWeight:'bold',
      textDecorationLine:"underline",
    },
    shadowProp:{
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    tinyLogo: {
        width: 30,
        height: 30,
      },
      logo: {
        width: 50,
        height: 50,
      },
  });
  