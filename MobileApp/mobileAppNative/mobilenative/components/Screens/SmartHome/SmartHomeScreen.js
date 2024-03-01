import { View,ScrollView,StyleSheet} from "react-native";
import MainFrame from '../../UI/Frames/Mainframe';

const SmartHomeScreen=(props)=>{
  return(
        <View style={styles.container}>
            <View style={styles.team}>
            <MainFrame
                name="Alarm"
                source={require('../../Data/Pics/homeAlarm.png')}
            />
            <MainFrame
                name="Water Heater"
                source={require('../../Data/Pics/waterHeater.png')}
            />
            </View>
        <View style={styles.team}>
          <MainFrame
            name="Weather"
            source={require('../../Data/Pics/weather.png')}
          />
          <MainFrame
            name="Local Station"
            source={require('../../Data/Pics/weatherStation.png')}
          />
        </View>
        </View>
    );
}

const styles=StyleSheet.create({
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

export default SmartHomeScreen;