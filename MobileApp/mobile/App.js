import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet,View,ActivityIndicator,Button,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Alarm from './components/Screens/Alarm';
import LoadingBar from './components/UI/loadingBar'
import MainScreen from './components/Screens/MainScreen';
import WaterHeater from './components/Screens/WaterHeater';
import Weather from './components/Screens/Weather';


const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen 
          name="MainScreen" 
          component={MainScreen} 
          options={{ title: 'Home' }}
          />
        <Stack.Screen 
          name="Alarm" 
          component={Alarm} 
          options={{ title: 'Alarm' }}
          />
        <Stack.Screen 
          name="WaterHeater" 
          component={WaterHeater} 
          options={{ title: 'Water Heater' }}
          />
        <Stack.Screen 
          name="Weather" 
          component={Weather} 
          options={{ title: 'Weather' }}
          />
      </Stack.Navigator>
     </NavigationContainer>
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
});



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