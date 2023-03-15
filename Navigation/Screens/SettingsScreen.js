import * as React from 'react';

import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AboutScreen from './AboutScreen';


const Stack = createStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name="Setting"
            component={SettingsScreen}
            options={{title: 'Welcome', headerShown: false}}
          />
          <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
    );
  };
function SettingsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={{backgroundColor:'#147EFB', width:'90%', height:'10%',alignItems:'center', justifyContent:'center', borderRadius: 20}} onPress={() => navigation.navigate('About')}>
                <Text style={{color:'white'}}>About Me</Text>
            </TouchableOpacity>
        </View>
    )
}

  

export default MyStack;