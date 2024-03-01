import * as React from 'react';
import { StyleSheet,View,ActivityIndicator,Button,Text} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import BottomNavigatorBar from './components/UI/Menu/BottomNavigatorBar';


// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <BottomNavigatorBar/>
      </NavigationContainer>
    </>

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
