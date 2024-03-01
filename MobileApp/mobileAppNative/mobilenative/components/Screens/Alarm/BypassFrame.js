import React, { useEffect, useState } from 'react';
//import { StyleSheet, Text, View, Image, Pressable, Modal, ScrollView } from 'react-native';
import { StyleSheet, Text, View, Image, Pressable, Modal, ScrollView } from 'react-native';
import socket from '../../communications/coms';
import { CheckBox } from 'react-native-elements'; // Import CheckBox from react-native-elements

const bypassFrame = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [zones, setZones] = useState(Array(16).fill(false)); // Initialize zones array with 16 elements

  useEffect(() => {
    getZonesFromServer();
  }, []);

  const getZonesFromServer = () => {
    const selectedZones = props.zones.split(',').map(zone => parseInt(zone)); // Convert props.zones to array of integers
    const updatedZones = zones.map((zone, index) => selectedZones.includes(index + 1)); // Update zones array based on selected zones
    setZones(updatedZones);
  };

  const toggleZone = (index) => {
    const updatedZones = [...zones];
    updatedZones[index] = !updatedZones[index];
    setZones(updatedZones);
  };

  const sentBypassZoneToServer = () => {
    const ZonesToBypass = zones.reduce((acc, zone, index) => {
      if (zone) {
        acc.push(`zone${index + 1}`);
      }
      return acc;
    }, []);
    const execute = true;
    socket.emit('chat message', JSON.stringify({
      "slaveName": "mobileApp",
      "page": "alarm",
      "command": "bypass",
      "execute": `${execute}`,
      "zones": `${ZonesToBypass}`,
      "outputs": "1,2"
    }));
    console.log(ZonesToBypass);
  };

  return (
    <View style={[styles.container, styles.shadowProp]}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ScrollView>
          <View style={[styles.modalView, styles.shadowProp]}>
            {[...Array(16)].map((_, index) => (
              <View key={index} style={styles.checkbox}>
               
                <CheckBox
                    checked={zones[index]}
                    onPress={() => toggleZone(index)}
                    checkedColor="red"
                    textStyle={styles.checkboxText}
                    containerStyle={styles.checkbox}
                  />
                <Text style={styles.checkboxText}>Zone {index + 1} - Front Door</Text>
              </View>
            ))}
            <Pressable onPress={() => { setModalVisible(!modalVisible), sentBypassZoneToServer() }} >
              <Text style={styles.modalCloseButton}>Done</Text>
            </Pressable>
          </View>
        </ScrollView>
      </Modal>
      <View style={styles.top}>
        <Image
          style={styles.tinyLogo}
          source={props.source}
        />
        <Pressable onPress={() => setModalVisible(!modalVisible)} >
          <Text style={styles.Text}>Zones</Text>
        </Pressable>
      </View>
      <View style={styles.nameView} >
        <Text style={styles.nameText}>{props.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(33,150,243, 0.8)',
    borderRadius: 10,
    width: 150,
    height: 100,
  },
  modalView: {
    backgroundColor: 'rgba(249,109,0,0.8)',
    width: 300,
    borderRadius: 80,
    margin: 20,
    padding: 35,
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
  Text: {
    fontSize: 20,
    fontWeight:'bold'  
  },
  modalCloseButton: {
    backgroundColor: 'rgba(33,150,243, 0.8)',
    borderRadius: 10,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 15,
  },
  checkbox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 0.1,
    gap: 10,
  },
  checkboxText: {
    marginTop: 10,
    marginEnd:25,
    fontWeight: 'bold',
    userSelect: 'none', // This line prevents text selection
    textAlign:'center',
    fontSize:15,
  },
  nameView: {
    flex: 2,
    flexDirection: 'row',
    margin: 10,
    textAlign: 'center',
    position: 'relative'
  },
  nameText: {
    fontWeight: 'bold',
    textDecorationLine: "underline",
    textAlign:'center',
    fontSize:18,
    marginTop:12
  },
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: { width: -2, height: 4 },
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

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'rgba(33,150,243, 0.8)',
//     borderRadius: 10,
//     width: 110,
//     height: 90,
//   },
//   modalView: {
//     backgroundColor: 'rgba(249,109,0,0.8)',
//     width: 300,
//     borderRadius: 80,
//     margin: 20,
//     padding: 35,
//     alignSelf: 'center',
//     alignItems: 'center',
//     shadowColor: 'black',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     }
//   },
//   modalCloseButton: {
//     backgroundColor: 'rgba(33,150,243, 0.8)',
//     borderRadius: 10,
//     padding: 10,
//     paddingLeft: 20,
//     paddingRight: 20,
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   top: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     padding: 10,
//     gap: 15,
//   },
//   checkbox: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     margin: 3,
//     gap: 10,
//   },
//   checkboxText: {
//     marginTop: 1,
//     fontWeight: 'bold',
//   },
//   nameView: {
//     flex: 2,
//     flexDirection: 'row',
//     margin: 10,
//     textAlign: 'center',
//     position: 'relative'
//   },
//   nameText: {
//     fontWeight: 'bold',
//     textDecorationLine: "underline",
//   },
//   shadowProp: {
//     shadowColor: 'black',
//     shadowOffset: { width: -2, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//   },
//   tinyLogo: {
//     width: 30,
//     height: 30,
//   },
//   logo: {
//     width: 50,
//     height: 50,
//   },
// });

export default bypassFrame;






// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, Image, Pressable, Modal, ScrollView } from 'react-native';
// import socket from '../../communications/coms';
// // import Checkbox from 'expo-checkbox';
// import { Checkbox } from 'react-native-elements';


// const BypassFrame = (props) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [zones, setZones] = useState(Array(16).fill(false)); // Initialize zones array with 16 elements

//   useEffect(() => {
//     getZonesFromServer();
//   }, []);

//   const getZonesFromServer = () => {
//     const selectedZones = props.zones.split(',').map(zone => parseInt(zone)); // Convert props.zones to array of integers
//     const updatedZones = zones.map((zone, index) => selectedZones.includes(index + 1)); // Update zones array based on selected zones
//     setZones(updatedZones);
//   };

//   const toggleZone = (index) => {
//     const updatedZones = [...zones];
//     updatedZones[index] = !updatedZones[index];
//     setZones(updatedZones);
//   };

//   const sentBypassZoneToServer = () => {
//     const ZonesToBypass = zones.reduce((acc, zone, index) => {
//       if (zone) {
//         acc.push(`zone${index + 1}`);
//       }
//       return acc;
//     }, []);
//     const execute = true;
//     socket.emit('chat message', JSON.stringify({
//       "slaveName": "mobileApp",
//       "page": "alarm",
//       "command": "bypass",
//       "execute": `${execute}`,
//       "zones": `${ZonesToBypass}`,
//       "outputs": "1,2"
//     }));
//     console.log(ZonesToBypass);
//   };

//   return (
//     <View style={[styles.container, styles.shadowProp]}>
//       <Modal
//         animationType='fade'
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}>
//         <ScrollView>
//           <View style={[styles.modalView, styles.shadowProp]}>
//             {[...Array(16)].map((_, index) => (
//               <View key={index} style={styles.checkbox}>
//                 <Checkbox
//                   style={styles.checkbox}
//                   value={zones[index]}
//                   onValueChange={() => toggleZone(index)}
//                   color={'red'}
//                 />
//                 <Text style={styles.checkboxText}>Zone {index + 1} - Front Door</Text>
//               </View>
//             ))}
//             <Pressable onPress={() => { setModalVisible(!modalVisible), sentBypassZoneToServer() }} >
//               <Text style={styles.modalCloseButton}>Done</Text>
//             </Pressable>
//           </View>
//         </ScrollView>
//       </Modal>
//       <View style={styles.top}>
//         <Image
//           style={styles.tinyLogo}
//           source={props.source}
//         />
//         <Pressable onPress={() => setModalVisible(!modalVisible)} >
//           <Text>Zones</Text>
//         </Pressable>
//       </View>
//       <View style={styles.nameView} >
//         <Text style={styles.nameText}>{props.name}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'rgba(33,150,243, 0.8)',
//     borderRadius: 10,
//     width: 110,
//     height: 90,
//   },
//   modalView: {
//     backgroundColor: 'rgba(249,109,0,0.8)',
//     width: 300,
//     borderRadius: 80,
//     margin: 20,
//     padding: 35,
//     alignSelf: 'center',
//     alignItems: 'center',
//     shadowColor: 'black',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     }
//   },
//   modalCloseButton: {
//     backgroundColor: 'rgba(33,150,243, 0.8)',
//     borderRadius: 10,
//     padding: 10,
//     paddingLeft: 20,
//     paddingRight: 20,
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   top: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     padding: 10,
//     gap: 15,
//   },
//   checkbox: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     margin: 3,
//     gap: 10,
//   },
//   checkboxText: {
//     marginTop: 1,
//     fontWeight: 'bold',
//   },
//   nameView:{
//             flex:2,
//             flexDirection: 'row',
//             margin: 10,
//             textAlign:'center',
//             position:'relative'
//           },
//         nameText:{
//           fontWeight:'bold',
//           textDecorationLine:"underline",
//         },
//         shadowProp:{
//             shadowColor: 'black',
//             shadowOffset: {width: -2, height: 4},
//             shadowOpacity: 0.3,
//             shadowRadius: 10,
//         },
//         tinyLogo: {
//             width: 30,
//             height: 30,
//           },
//           logo: {
//             width: 50,
//             height: 50,
//           },
//       });
      
//       export default BypassFrame;











// // import React, {useEffect, useState} from 'react';
// // import {StyleSheet, Text,View,Image, Pressable,Modal,ScrollView} from 'react-native';
// // import socket from '../../communications/coms';
// // import Checkbox from 'expo-checkbox';

// //   const  bypassFrame=(props)=>{

// //     const [modalVisible, setModalVisible] = useState(false);
// //     const [zone1, setZone1] = useState(false);
// //     const [zone2, setZone2] = useState(false);
// //     const [zone3, setZone3] = useState(false);
// //     const [zone4, setZone4] = useState(false);
// //     const [zone5, setZone5] = useState(false);
// //     const [zone6, setZone6] = useState(false);
// //     const [zone7, setZone7] = useState(false);
// //     const [zone8, setZone8] = useState(false);
// //     const [zone9, setZone9] = useState(false);
// //     const [zone10, setZone10] = useState(false);
// //     const [zone11, setZone11] = useState(false);
// //     const [zone12, setZone12] = useState(false);
// //     const [zone13, setZone13] = useState(false);
// //     const [zone14, setZone14] = useState(false);
// //     const [zone15, setZone15] = useState(false);
// //     const [zone16, setZone16] = useState(false);
    
  
// //     const setbypassedZones=(bypassedZones)=>{

// //     }
   
// //     const getZonesFromServer = () => {
// //       let a = props.zones;
// //       console.log(a);
// //       let zoneName = `zone${a}`;
// //       eval(`${zoneName} = true`);
// //       console.log(zone1+'****');
// //      };
// //    useEffect(() => {   getZonesFromServer()  });
    
// //     const sentBypassZoneToServer=()=>{
// //       let ZonesToBypass=[];
// //       let temp="";
// //       //reeds the useState values and sent them to server
// //       for(let i=1;i<=16; i++){
// //         temp=`zone${i}`;
// //         //eval(temp)gets the value from useState
// //         if(eval(temp)===true){
// //           ZonesToBypass.push(temp);  
// //         }
// //       }
// //       let execute=true;
// //       //send the zones to server
// //       socket.emit('chat message', JSON.stringify({"slaveName":"mobileApp","page":"alarm","command":"bypass","execute":`${execute}`, 
// //       "zones":`${ZonesToBypass}`,"outputs":"1,2"
// //    }));
// //         console.log(ZonesToBypass);
// //     }
// //     return (
// //       <View style={[styles.container,styles.shadowProp]}>
// //         <Modal 
// //           animationType='fade'
// //           transparent={true}
// //           visible={modalVisible}
// //           onRequestClose={() => {
// //             setModalVisible(!modalVisible);
// //            }}>
// //           <ScrollView>
// //             <View style={[styles.modalView,styles.shadowProp]}>
// //             <View style={styles.checkbox}>
// //                 <Checkbox
// //                   style={styles.checkbox}
// //                   value={zone1}
// //                   onValueChange={()=>{setZone1(!zone1)}}
// //                   color={'red'}
// //                 />
// //                 <Text style={styles.checkboxText}>Zone 1 - Front Door</Text>
// //               </View>  
// //               <View style={styles.checkbox}>
// //                 <Checkbox
// //                   style={styles.checkbox}
// //                   value={zone2}
// //                   onValueChange={()=>{setZone2(!zone2)}}
// //                   color={'red'}
// //                 />
// //                 <Text style={styles.checkboxText}>Zone 2 - Front Door</Text>
// //               </View> 
// //               <View style={styles.checkbox}>
// //                 <Checkbox
// //                   style={styles.checkbox}
// //                   value={zone3}
// //                   onValueChange={()=>{setZone3(!zone3)}}
// //                   color={'red'}
// //                 />
// //                 <Text style={styles.checkboxText}>Zone 3 - Front Door</Text>
// //               </View> 
// //               <View style={styles.checkbox}>
// //                 <Checkbox
// //                   style={styles.checkbox}
// //                   value={zone4}
// //                   onValueChange={()=>{setZone4(!zone4)}}
// //                   color={'red'}
// //                 />
// //                 <Text style={styles.checkboxText}>Zone 4 - Front Door</Text>
// //               </View> 
// //               <View style={styles.checkbox}>
// //                 <Checkbox
// //                   style={styles.checkbox}
// //                   value={zone5}
// //                   onValueChange={()=>{setZone5(!zone5)}}
// //                   color={'red'}
// //                 />
// //                 <Text style={styles.checkboxText}>Zone 5 - Front Door</Text>
// //               </View> 
// //               <View style={styles.checkbox}>
// //                 <Checkbox
// //                   style={styles.checkbox}
// //                   value={zone6}
// //                   onValueChange={()=>{setZone6(!zone6)}}
// //                   color={'red'}
// //                 />
// //                 <Text style={styles.checkboxText}>Zone 6 - Front Door</Text>
// //               </View> 
// //               <View style={styles.checkbox}>
// //                 <Checkbox
// //                   style={styles.checkbox}
// //                   value={zone7}
// //                   onValueChange={()=>{setZone7(!zone7)}}
// //                   color={'red'}
// //                 />
// //                 <Text style={styles.checkboxText}>Zone 7 - Front Door</Text>
// //               </View> 
// //               <View style={styles.checkbox}>
// //                 <Checkbox
// //                   style={styles.checkbox}
// //                   value={zone8}
// //                   onValueChange={()=>{setZone8(!zone8)}}
// //                   color={'red'}
// //                 />
// //                 <Text style={styles.checkboxText}>Zone 8 - Front Door</Text>
// //               </View> 
// //               <View style={styles.checkbox}>
// //                 <Checkbox
// //                   style={styles.checkbox}
// //                   value={zone9}
// //                   onValueChange={()=>{setZone9(!zone9)}}
// //                   color={'red'}
// //                 />
// //                 <Text style={styles.checkboxText}>Zone 9 - Front Door</Text>
// //               </View> 
// //               <View style={styles.checkbox}>
// //                 <Checkbox
// //                   style={styles.checkbox}
// //                   value={zone10}
// //                   onValueChange={()=>{setZone10(!zone10)}}
// //                   color={'red'}
// //                 />
// //                 <Text style={styles.checkboxText}>Zone 10 - Front Door</Text>
// //               </View> 
// //               <View style={styles.checkbox}>
// //                 <Checkbox
// //                   style={styles.checkbox}
// //                   value={zone11}
// //                   onValueChange={()=>{setZone11(!zone11)}}
// //                   color={'red'}
// //                 />
// //                 <Text style={styles.checkboxText}>Zone 11 - Front Door</Text>
// //               </View> 
// //               <View style={styles.checkbox}>
// //                 <Checkbox
// //                   style={styles.checkbox}
// //                   value={zone12}
// //                   onValueChange={()=>{setZone12(!zone12)}}
// //                   color={'red'}
// //                 />
// //                 <Text style={styles.checkboxText}>Zone 12 - Front Door</Text>
// //               </View> 
// //               <View style={styles.checkbox}>
// //                 <Checkbox
// //                   style={styles.checkbox}
// //                   value={zone13}
// //                   onValueChange={()=>{setZone13(!zone13)}}
// //                   color={'red'}
// //                 />
// //                 <Text style={styles.checkboxText}>Zone 13 - Front Door</Text>
// //               </View> 
// //               <View style={styles.checkbox}>
// //                 <Checkbox
// //                   style={styles.checkbox}
// //                   value={zone14}
// //                   onValueChange={()=>{setZone14(!zone14)}}
// //                   color={'red'}
// //                 />
// //                 <Text style={styles.checkboxText}>Zone 14 - Front Door</Text>
// //               </View> 
// //               <View style={styles.checkbox}>
// //                 <Checkbox
// //                   style={styles.checkbox}
// //                   value={zone15}
// //                   onValueChange={()=>{setZone15(!zone15)}}
// //                   color={'red'}
// //                 />
// //                 <Text style={styles.checkboxText}>Zone 15 - Front Door</Text>
// //               </View> 
// //               <View style={styles.checkbox}>
// //                 <Checkbox
// //                   style={styles.checkbox}
// //                   value={zone16}
// //                   onValueChange={()=>{setZone16(!zone16)}}
// //                   color={'red'}
// //                 />
// //                 <Text style={styles.checkboxText}>Zone 16 - Front Door</Text>
// //               </View> 
// //             <Pressable onPress={() => {setModalVisible(!modalVisible), sentBypassZoneToServer()}} >
// //               <Text style={styles.modalCloseButton}>Done</Text>    
// //             </Pressable>
// //             </View>
// //           </ScrollView>
// //         </Modal>
// //         <View style={styles.top}>
// //           <Image
// //             style={styles.tinyLogo}
// //             source={props.source}
// //           />
// //           <Pressable onPress={() => setModalVisible(!modalVisible)} >
// //               <Text>Zones</Text>
// //           </Pressable>
// //         </View>
// //         <View style={styles.nameView} >
// //           <Text style={styles.nameText}>{props.name}</Text>         
// //         </View>
// //       </View>
// //     );
// //   }
  
// //   const styles = StyleSheet.create({
// //     container: {
// //       backgroundColor: 'rgba(33,150,243, 0.8)',
// //       borderRadius:10,
// //       width:110,
// //       height:90,
// //     },
// //     modalView: {
// //       backgroundColor: 'rgba(249,109,0,0.8)',
// //       width:300,
// //       borderRadius:80,
// //       margin: 20,
// //       padding: 35,
// //       alignSelf:'center',
// //       alignItems: 'center',
// //       shadowColor: 'black',
// //       shadowOffset: {
// //         width: 0,
// //         height: 2,
// //     }},
// //     modalCloseButton:{
// //       backgroundColor: 'rgba(33,150,243, 0.8)',
// //       borderRadius:10,
// //       padding:10,
// //       paddingLeft:20,
// //       paddingRight:20,
// //       marginTop:10,
// //       fontSize:16,
// //       fontWeight:'bold'
// //     },
// //     top:{
// //         flex:1,
// //         flexDirection: 'row',
// //         flexWrap: 'wrap',
// //         padding:10,
// //         gap: 15,
// //     },
// //     checkbox:{
// //       flex:1,
// //       flexDirection: 'row',
// //       flexWrap: 'wrap',
// //       margin:3,
// //       gap: 10,
// //   },
// //   checkboxText:{
// //     marginTop:1,
// //     fontWeight:'bold',
// // },
// //     nameView:{
// //         flex:2,
// //         flexDirection: 'row',
// //         margin: 10,
// //         textAlign:'center',
// //         position:'relative'
// //       },
// //     nameText:{
// //       fontWeight:'bold',
// //       textDecorationLine:"underline",
// //     },
// //     shadowProp:{
// //         shadowColor: 'black',
// //         shadowOffset: {width: -2, height: 4},
// //         shadowOpacity: 0.3,
// //         shadowRadius: 10,
// //     },
// //     tinyLogo: {
// //         width: 30,
// //         height: 30,
// //       },
// //       logo: {
// //         width: 50,
// //         height: 50,
// //       },
// //   });
  
// //   export default bypassFrame;


// //   /*import React, {useState} from 'react';
// // import { StyleSheet, Text,Button,
// //   View,SafeAreaView,Switch,TextInput,Image, Pressable} from 'react-native';
// // import bypassList from './bypassList';

// //   const  bypassFrame=(props)=>{
// //     const [modalVisible, setModalVisible] = useState(false);
// //     const selectedZones=()=>{
// //       console.log("OK");
// //       setModalVisible(true);
    
// //     };
// //     return (
// //       <View style={[styles.container,styles.shadowProp]}>
// //       {modalVisible&&<bypassList/>}
// //         <View style={styles.top}>
// //           <Image
// //             style={styles.tinyLogo}
// //             source={props.source}
// //           />
// //         <Pressable onPressIn={selectedZones} >
// //           <Text>Zones</Text>    
// //         </Pressable>   
// //       </View>
// //       <View style={styles.nameView} >
// //         <Text style={styles.nameText}>{props.name}</Text> 
        
// //       </View>
// //       </View>
// //     );
// //   }
  
// //   const styles = StyleSheet.create({
// //     container: {
// //       backgroundColor: 'rgba(33,150,243, 0.8)',
// //       borderRadius:10,
// //       width:110,
// //       height:90,
// //     },
// //     top:{
// //         flex:1,
// //         flexDirection: 'row',
// //         flexWrap: 'wrap',
// //         margin: 10,
// //         gap: 10,
// //     },
// //     nameView:{
// //         flex:2,
// //         flexDirection: 'row',
// //         margin: 20,
// //         textAlign:'center',
// //         position:'relative'
// //       },
// //     nameText:{
// //       fontWeight:'bold',
// //       textDecorationLine:"underline",
// //     },
// //     shadowProp:{
// //         shadowColor: 'black',
// //         shadowOffset: {width: -2, height: 4},
// //         shadowOpacity: 0.3,
// //         shadowRadius: 10,
// //     },
// //     tinyLogo: {
// //         width: 30,
// //         height: 30,
// //       },
// //       logo: {
// //         width: 50,
// //         height: 50,
// //       },
// //   });
  
// //   export default bypassFrame;*/