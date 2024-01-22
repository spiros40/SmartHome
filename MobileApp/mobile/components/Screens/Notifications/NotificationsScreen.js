import * as React from 'react';
import { StyleSheet,View,ActivityIndicator,Button,Text} from 'react-native';
import NotificationsFrame from '../../UI/Frames/NotificationFrame';

const NotificationsScreen=(props)=>{

    return(
        <View>
            <NotificationsFrame
                name='alarm'
                cause='triggered'
            />
        </View>
    );
}

const styles=StyleSheet.create({

});

export default NotificationsScreen;