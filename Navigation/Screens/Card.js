import * as React from 'react';
import MainContainer from './Navigation/MainContainer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Card({ props }) {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                { props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: 'white',
        shadowOffset: { width:1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
    },
    cardContent: {
        flex: 1,
    }
  });