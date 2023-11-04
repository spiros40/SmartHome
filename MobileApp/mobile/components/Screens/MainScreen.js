import {View,ScrollView,StyleSheet} from 'react-native';
import Frame from '../UI/Mainframe';


const MainScreen=(props)=>{

    return(
      <ScrollView>
        <View style={styles.container}>
        <View style={styles.team}>
          <Frame
            name="Alarm"
            source={require('../../Data/Pics/homeAlarm.png')}
          />
          <Frame
            name="Water Heater"
            source={require('../../Data/Pics/waterHeater.png')}
          />
        </View>
        <View style={styles.team}>
          <Frame
            name="Weather"
            source={require('../../Data/Pics/weather.png')}
          />
          <Frame
            name="Local Station"
            source={require('../../Data/Pics/weatherStation.png')}
          />
        </View>
        </View>
    </ScrollView>
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