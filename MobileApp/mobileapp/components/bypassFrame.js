import React, {useState} from 'react';
import { StyleSheet, Text,Button,
  View,SafeAreaView,Switch,TextInput,Image, Pressable} from 'react-native';
import bypassList from './bypassList';

  const  bypassFrame=(props)=>{
    const [modalVisible, setModalVisible] = useState(false);
    const selectedZones=()=>{
      console.log("OK");
      setModalVisible(true);
    
    };
    return (
      <View style={[styles.container,styles.shadowProp]}>
      {modalVisible&&<bypassList/>}
        <View style={styles.top}>
          <Image
            style={styles.tinyLogo}
            source={props.source}
          />
        <Pressable onPressIn={selectedZones} >
          <Text>Zones</Text>    
        </Pressable>   
      </View>
      <View style={styles.nameView} >
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
        gap: 10,
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
  
  export default bypassFrame;