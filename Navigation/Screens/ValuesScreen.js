import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

import { globalStyles } from '../../Styles/Global';

import Card from '../../Shared/Card';


function setTextColor(rate) {
  var colorVal = 'green';
  if (rate == 'UP') colorVal = 'green';
  if (rate == 'DOWN') colorVal = 'red';
  return {
    color: colorVal,
  }
}

function Home({ navigation }) {
  const [reviews, setReviews] = useState([
    { title: 'Apple', value:'153.83 USD +0.90 (0.59%)', rate: 'UP'},
    { title: 'Apple', value:'153.83 USD +0.90 (0.59%)', rate: 'DOWN'},
    { title: 'Apple', value:'153.83 USD +0.90 (0.59%)', rate: 'UP'},
    { title: 'Apple', value:'153.83 USD +0.90 (0.59%)', rate: 'UP'},
    { title: 'Apple', value:'153.83 USD +0.90 (0.59%)', rate: 'UP'},
    { title: 'Apple', value:'153.83 USD +0.90 (0.59%)', rate: 'UP'},
    { title: 'Apple', value:'153.83 USD +0.90 (0.59%)', rate: 'UP'},
    { title: 'Apple', value:'153.83 USD +0.90 (0.59%)', rate: 'UP'},
    { title: 'Apple', value:'153.83 USD +0.90 (0.59%)', rate: 'UP'},
    { title: 'Apple', value:'153.83 USD +0.90 (0.59%)', rate: 'UP'},
  ]);



  return (
    <View style={globalStyles.container}>
      <FlatList ItemSeparatorComponent={() => <View style={{height: 15}} />} data={reviews} renderItem={({ item }) => (
        <TouchableOpacity>
          <Card>
            <Text style={globalStyles.titleText}>{ item.title }</Text>
            <Text>{' '}</Text>
            <Text style={setTextColor(item.rate)}>
              { item.value } {item.rate}
            </Text>
          </Card>
        </TouchableOpacity>
      )} />
    </View>
  );


}





export default Home;