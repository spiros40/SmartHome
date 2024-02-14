import React, {useState} from 'react';
import { StyleSheet, Text,
  View,Image,Pressable} from 'react-native';

  export default function Mainframe(props) {
    const goto=()=>{
      console.log(props.name)
    }
    return (
      <Pressable onPress={goto} style={[styles.container,styles.shadowProp]}>
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
      width:110,
      height:90,
      
    },
    top:{
      paddingTop:5,
      alignSelf:'center'
    },
    nameView:{
        alignSelf:'center',
        position:'relative',
        paddingTop:8,
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
        width: 40,
        height: 40,
      },
  });
  