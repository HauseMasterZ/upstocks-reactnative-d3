import * as React from 'react';

import { View, Text } from 'react-native';
import { Linking } from 'react-native';

export default function AboutScreen(){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection:'row'}}>
            <Text style = {{justifyContent:'flex-start'}}>
                Made with Blood, Sweat and mostly tears on
            </Text>
            <Text>
                {' '}
            </Text>
            <Text style={{color: 'blue', justifyContent:'flex-end'}} onPress = {() => Linking.openURL('https://github.com/HauseMasterZ/react-d3')}>
                GitHub
            </Text>
        </View>
    )
}