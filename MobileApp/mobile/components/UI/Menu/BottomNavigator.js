import * as React from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';

const BottomNavigator=({ state, descriptors, navigation })=> {
    return (
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.bar}
            >
              <Text style={{ color: isFocused ? 'red' : 'black',fontWeight: isFocused ? 'bold':'normal'}}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

const styles=StyleSheet.create({
  bar:{
    flex: 1, 
    backgroundColor:'#babdb8',
    alignItems: 'center',
    fontSize:16,
    fontWeight:'bold',
    padding:10
    
  },

});


  export default BottomNavigator;