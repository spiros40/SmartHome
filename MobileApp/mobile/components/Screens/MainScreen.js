import {View,ScrollView,StyleSheet} from 'react-native';
import MainFrame from '../UI/Frames/Mainframe';


const MainScreen=({ navigation, ...props })=>{

    return(
        <View style={styles.container}>
        <View style={styles.team}>
          <MainFrame
            key="alarm"
            name="Alarm"
            source={require('../../Data/Pics/homeAlarm.png')}
            onPress={()=>{navigation.navigate('Alarm')}}
          />
          <MainFrame
            key="smartHome"
            name="Smart Home"
            source={require('../../Data/Pics/smartHome.png')}
            onPress={()=>{navigation.navigate('SmartHomeScreen')}}
          />
        </View>
        <View style={styles.team}>
          <MainFrame
            key="notifications"
            name="Notifications"
            source={require('../../Data/Pics/notifications.png')}
            onPress={()=>{navigation.navigate('Notifications')}}
          />
          <MainFrame
            key="settings"
            name="Settings"
            source={require('../../Data/Pics/settings.png')}
            onPress={()=>{navigation.navigate('Settings')}}
          />
        </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    
      alignItems: 'center',
      justifyContent: 'center',
      gap:20,
      
    },
    titleText:{
      color: 'black',
      borderBottomWidth: 1,
      fontSize:25,
      marginBottom:20,
      fontWeight: 'bold',
    },
    team:{
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
export default MainScreen;