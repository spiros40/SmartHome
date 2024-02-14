import { StyleSheet, Text,Button,
  View,TextInput} from 'react-native';


const statusFrame=(props)=>{
  
  return (
      <View style={styles.alarmView}>
        <Text style={styles.alarmText}>
            {props.name}
        </Text>
        <Text  style={styles.alarmInput}>
          {props.recievedText}
        </Text>
      </View>
  );
}

const styles = StyleSheet.create({
    alarmView:{
      margin:10,
      width:240,
      height:80,
      backgroundColor:'rgba(33,150,243, 0.8)',
      color:"black",
      borderRadius:10,
      },
      alarmInput: {
        padding: 10,
        marginTop:10,
      },
      alarmText:{
        textAlign:'center',
        fontSize:18,
        fontWeight:'bold',
        textDecorationLine:"underline",
      },
  
});
export default statusFrame;