import * as React from 'react';
import { StyleSheet,View,ActivityIndicator,Button,Text} from 'react-native';


const NotificationsFrame=(props)=>{

    return(
        <View>
            <Text style={styles.nameText}>{props.name}</Text>
            <Text>{props.cause}</Text>
        </View>
    );
}

const styles=StyleSheet.create({
    nameText:{
        color:'gray',
        fontSize:18,
        fontWeight:"bold",
        alignSelf:'flex-start',
        padding:5,
    },
});

export default NotificationsFrame;