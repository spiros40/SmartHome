import * as React from 'react';
import { StyleSheet,View,ActivityIndicator,Button,Text} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlarmScreen from '../../Screens/Alarm/AlarmScreen';
import MainScreen from '../../Screens/MainScreen';
import SettingsScreen from '../../Settings/SettingsScreen';
import SmartHomeScreen from '../../Screens/SmartHome/SmartHomeScreen';


const Stack = createNativeStackNavigator();
//const Tab = createBottomTabNavigator();

const StackNavigator=()=>{
  return (
       <Stack.Navigator initialRouteName="MainScreen">
         <Stack.Screen 
          name="MainScreen" 
          component={MainScreen} 
          options={{ title: 'Home' }}
          />
        <Stack.Screen 
          name="Alarm" 
          component={AlarmScreen} 
          options={{ title: 'Alarm' }}
          />
        <Stack.Screen 
          name="SmartHomeScreen" 
          component={SmartHomeScreen} 
          options={{ title: 'Smart Home Screen' }}
          />
        <Stack.Screen 
          name="SettingsScreen" 
          component={SettingsScreen} 
          options={{ title: 'Settings' }}
          />
      </Stack.Navigator>
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

export default StackNavigator;