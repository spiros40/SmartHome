import React, {useState, useRef,useEffect} from 'react';
import {StyleSheet, Text,View,Image, Pressable,Modal,ScrollView,ActivityIndicator,Animated} from 'react-native';

  const  bypassFrame=(props)=>{
    const [modalVisible, setModalVisible] = useState(props.status);
    const fade = useRef(new Animated.Value(0)).current;

    const animation = () => {
      Animated.timing(fade, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    };
    //on window load runs the animation
    useEffect(() => {
      animation();
  }, [])
    return (
      <View style={[styles.shadowProp]}>
        <Modal 
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
           }}>
          <ScrollView>
            <View style={[styles.modalView,styles.shadowProp]}>
            <ActivityIndicator style={styles.statusBar} size="large" color="#99F443"/>
            <Animated.Text  style={[styles.WaitMessage, {opacity:fade}]}>System Fetching Data From Server</Animated.Text>
            <Pressable onPress={() => {setModalVisible(!modalVisible)}} >
              <Text style={styles.modalCloseButton}>Return</Text>    
            </Pressable>
            </View>
          </ScrollView>
        </Modal>
       </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(19, 252, 3,0.8)',
      borderRadius:10,
      width:110,
      height:90,
    },
    modalView: {
      // backgroundColor: 'rgba(202, 252, 237,0.9)',
      backgroundColor: 'rgba(2, 2, 2,0.9)',
      width: '100%',
      height:'100%',
      margin: 20,
      padding: 35,
      alignSelf:'center',
      },
      statusBar:{
        paddingTop:'15%'
      },
      WaitMessage:{
        paddingTop:'10%',
        fontSize:20,
        fontWeight:"bold",
        color:"white",
        alignSelf:'center',
      },
     modalCloseButton:{
      backgroundColor: 'rgba(33,150,243, 0.8)',
      borderRadius:10,
      padding:10,
      paddingLeft:20,
      paddingRight:20,
      marginTop:'10%',
      fontSize:16,
      textAlign:'center',
      fontWeight:'bold'
    },
    normalDot: {
      height: 8,
      width: 8,
      borderRadius: 4,
      backgroundColor: 'silver',
      marginHorizontal: 4,
    },

  });
  
  export default bypassFrame;

