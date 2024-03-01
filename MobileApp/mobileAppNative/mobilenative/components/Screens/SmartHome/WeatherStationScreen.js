import { StyleSheet,View} from 'react-native';
import Frame from '../UI/frameSwitch';
import StatusFrame from '../UI/statusFrame';
import BypassFrame from './bypassFrame';

const WeatherStationScreen=({ navigation })=>{
  
  return (
    <View style={styles.container}>
      <View style={styles.buttonView}> 
        <Frame
          name="Arm Away"
          source={require('../../Data/Pics/arm.png')}
          state={true}
        />
        <Frame
          name="Arm Stay"
          source={require('../../Data/Pics/stayArm.png')}
          state={false}
        />
      </View>
      <View style={styles.buttonView}> 
        <Frame
          name="Disarm"
          source={require('../../Data/Pics/disarm.png')}
          state={false}
        />
        <BypassFrame
          name="Bypass"
          source={require('../../Data/Pics/bypass.png')}
        />
      </View>
      <View>
        <StatusFrame
          name="Alarm Status"
          recievedText="recievedText"
        />
      </View>
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
});

export default WeatherStationScreen;

