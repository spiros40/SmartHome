import React , { useEffect } from 'react';
import socket from '../../communications/coms';
import { StyleSheet,View,ActivityIndicator,Button,Text} from 'react-native';
import NotificationsFrame from '../../UI/Frames/NotificationFrame';

const NotificationsScreen=(props)=>{
    useEffect(() => {
        // Example: Emit a message to the server
        socket.emit('chat message', JSON.stringify({"slaveName":"mobileApp","page":"note","command":"refresh"}));
    
        // Example: Listen for messages from the server
        socket.on('chat message', (msg) => {
          console.log('Message from server:', msg);
        });
    
        return () => {
          // Clean up listeners when the component unmounts
          socket.disconnect();
        };
      }, []);
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