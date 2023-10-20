import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,Button,
  View,SafeAreaView,Alert,TextInput} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}
        >Home Alarm</Text>

      <View style={styles.buttonView}>
        <Button 
          style={styles.buttons}
          title="Full Arm"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
        <Button 
          title="Stay Arm"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
        <Button
          title="Disarm"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
      </View>
      <View style={styles.bypassView}>
      <Button
          title="Bypass"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
        <TextInput
          style={styles.bypassInput}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="Enter Zones To Bypass"
          keyboardType="numeric"
         />
      </View>
      <View style={styles.alarmView}>
      <label style={styles.alarmLabel}>
        Alarm
      </label>
        <TextInput
          style={styles.alarmInput}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="Opened Zones"
          keyboardType="numeric"
         />
      </View>
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
    gap: 8,
  },
  buttons:{
    borderRadius:200,
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
        fontWeight:'bold',
        backgroundColor:'#2196F3',
      },
  
});
