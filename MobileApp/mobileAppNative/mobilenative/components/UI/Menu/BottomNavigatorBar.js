import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// Import your screens/components
import MainScreen from '../../Screens/MainScreen';
import AlarmScreen from '../../Screens/Alarm/AlarmScreen';
import Exit from '../../Screens/Exit/Exit';
import SettingsScreen from '../../Settings/SettingsScreen';
import StackNavigator from './StackNavigator';
import BottomNavigator from './BottomNavigator';

const Tab = createBottomTabNavigator();


// Bottom Tab Navigator
const BottomNavigatorBar = (props) => (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={MainScreen} options={{ tabBarBadge: 3 }}/>
      <Tab.Screen name="Alarm" component={AlarmScreen}/>
      <Tab.Screen name="Smart Home" component={StackNavigator}/>
      <Tab.Screen name="Settings" component={SettingsScreen } />
      <Tab.Screen name="Exit" component={Exit } />
    </Tab.Navigator>
);
export default BottomNavigatorBar;
