import React, {useState} from 'react';
import { StyleSheet, Text,
  View,Image,Pressable} from 'react-native';
  

const Mainframe=({ navigation, ...props })=>{
    const goto=()=>{
      console.log(props.name);
    }
    return (
      <Pressable onPress={props.onPress} style={[styles.container,styles.shadowProp]}>
        <View style={styles.top}>
          <Image
            style={styles.logo}
            source={props.source}
          />
        
      </View>
      <View style={styles.nameView}>
        <Text style={styles.nameText}>{props.name}</Text>  
      </View>
      </Pressable>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(33,150,243, 0.8)',
      
      borderRadius:10,
      width:150,
      height:110,
      margin:10
    },
    top:{
      paddingTop:10,
      alignSelf:'center'
    },
    nameView:{
        alignSelf:'center',
        position:'relative',
        paddingTop:18,
      },
    nameText:{
      fontWeight:'bold',
      textDecorationLine:"underline",
      fontSize:18,
    },
    shadowProp:{
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    tinyLogo: {
        width: 40,
        height: 40,
      },
      logo: {
        width: 50,
        height: 50,
      },
  });
  

  export default Mainframe;