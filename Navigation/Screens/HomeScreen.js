import * as React from 'react';

import { View, Text } from 'react-native';
import { Dimensions } from "react-native";

import data from "../../Shared/Data.json";
import Chart from "../../Styles/Chart"
import { Candle } from "../../Styles/Candle";
const {width:size} = Dimensions.get("window");
const candles = data.slice(0,20);
const caliber = size / candles.length;
const getDomain = (rows: Candle[]): [number, number] => {
    const values = rows.map(({ high, low }) => [high, low]).flat();
    return [Math.min(...values), Math.max(...values)];
  };
  const domain = getDomain(candles);

  const getCurrentDate=()=>{
 
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    if (month == 1) month = 'Jan'
    else if (month == 2) month = 'Feb'
    else if (month == 3) month = 'Mar'
    else if (month == 4) month = 'Apr'
    else if (month == 5) month = 'May'
    else if (month == 6) month = 'Jun'
    else if (month == 7) month = 'Jul'
    else if (month == 8) month = 'Aug'
    else if (month == 9) month = 'Sep'
    else if (month == 10) month = 'Oct'
    else if (month == 11) month = 'Nov'
    else if (month == 12) month = 'Dec'
    return month + ' ' + date + 'st' + ', ' + year;
}
export default function HomeScreen({ navigation }) {

    return ( 
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
            <Text onPress={() => alert('Home screen')} style={{fontWeight: 'bold', color:'white'}}>
                {getCurrentDate()}
            </Text>
            <Chart {...{ candles, size , domain}} />

        </View>
    )
}