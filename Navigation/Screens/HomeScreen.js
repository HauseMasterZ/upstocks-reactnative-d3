import * as React from 'react';
import { View, Text, Alert, StyleSheet, Vibration } from 'react-native';
import { Dimensions, ActivityIndicator } from "react-native";
import Chart from "../../Styles/Chart"
import { Candle } from "../../Styles/Candle";
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, useDerivedValue, runOnJS } from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { useState } from 'react';
import Slider from '@react-native-community/slider';
import { SelectList } from 'react-native-dropdown-select-list';
import DashedLine from 'react-native-dashed-line';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width: size } = Dimensions.get("window");


const getCurrentDate = () => {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

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

let chart_data = [];
export default function HomeScreen({ navigation }) {
    const line_translationy = useSharedValue(0);
    const line_translationx = useSharedValue(0);
    const [range, setRange] = useState('50 Data Points');
    const [sliding, setSliding] = useState('Inactive');
    const API_KEY = "LPA10DMGO2PI3B6X";
    const company = "NFLX";
    let [response, setResponse] = React.useState([]);
    let [isLoading, setIsLoading] = React.useState(true);
    let [error, setError] = React.useState();
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${company}&outputsize=compact&apikey=${API_KEY}`;

    React.useEffect(() => {

        fetch(API_Call)
            .then((response) => response.json())
            .then(
                (result) => {
                    setIsLoading(false);
                    setResponse(result);

                }, (error) => {
                    setIsLoading(false);
                    setError(error);
                }
            )

    }, []);

    getContent = () => {
        if (isLoading) {
            return <ActivityIndicator style={{ alignItems: 'center', justifyContent: 'center', top: "25%" }} size={'large'} />

        }
        if (error) {
            return <Text> {error} </Text>
        }
        insertContent();

    }
    insertContent = () => {
        let data = response;
        for (var bruh in data['Time Series (Daily)']) {
            var dict = {};
            dict["date"] = bruh;
            dict["day"] = bruh.slice(-2);
            dict["open"] = parseInt(data['Time Series (Daily)'][bruh]['1. open']);
            dict["high"] = parseInt(data['Time Series (Daily)'][bruh]['2. high']);
            dict["low"] = parseInt(data['Time Series (Daily)'][bruh]['3. low']);
            dict["close"] = parseInt(data['Time Series (Daily)'][bruh]['4. close']);
            chart_data.push(dict);
        }
    }



    candles = chart_data;
    candles = candles.slice(0, 100);
    const caliber = size / candles.length;
    const getDomain = (rows: Candle[]): [number, number] => {
        const values = rows.map(({ high, low }) => [high, low]).flat();
        return [Math.min(...values), Math.max(...values)];
    };
    const domain = getDomain(candles);



    const animatedLine = useAnimatedStyle(() => {
        'worklet';
        return {
            transform: [
                {
                    translateY: line_translationy.value
                }, {
                    translateX: line_translationx.value
                }
            ]
        };
    });
    let [showLines, setshowLines] = useState(false);
    let [randDolllar, setrandDollar] = useState('');
    showScrubber = () => {
        setshowLines(true);
    };
    hideScrubber = () => {
        setshowLines(false);
    };



    let [LineStartX, setLineStartX] = useState('50%');
    let [LineStartY, setLineStartY] = useState('50%');
    randDollarGenerator = () => {
        setrandDollar((Math.random() * 10000 + 100).toFixed(2) + ' $');
    }
    const trackLines = useAnimatedGestureHandler({
        onStart: (event) => {
            runOnJS(showScrubber)();
            runOnJS(Vibration.vibrate)();
            runOnJS(setLineStartX)(event.absoluteX - 200);
            runOnJS(setLineStartY)(event.absoluteY - 350);
        },
        onActive: (event) => {
            line_translationx.value = event.translationX;
            line_translationy.value = event.translationY;
            if (Math.abs(event.translationX) > 100) {
                runOnJS(randDollarGenerator)();
            }
        },
        onEnd: (event) => {
            runOnJS(hideScrubber)();
        },
    });

    constructChart = () => {
        // console.log(candles.length)
        return <Chart {...{ candles, size, domain }} ></Chart>
    }
    const [selected, setSelected] = useState("");
    const menu_data = [
        { key: '1', value: 'Apple' },
        { key: '2', value: 'Microsoft' },
        { key: '3', value: 'Nothing' },
        { key: '4', value: 'Google' },
        { key: '5', value: 'Meta' },
        { key: '6', value: 'Netflix' },
        { key: '7', value: 'Amazon' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }} >
            <View style={{ paddingHorizontal: 20, paddingVertical: 50, width: '100%', left: 0 }}>

                <SelectList placeholder='Select Company' data={menu_data} setSelected={setSelected} boxStyles={{ backgroundColor: 'white' }} dropdownStyles={{ backgroundColor: 'white' }} />
            </View>
            <View style={{ height: 10 }}></View>
            <Text onPress={() => alert('Home screen')} style={{ fontWeight: 'bold', color: 'white' }}>
                {getCurrentDate()}
            </Text>
            {getContent()}
            <GestureHandlerRootView>
                {constructChart()}
                <PanGestureHandler onGestureEvent={trackLines}>
                    <Animated.View style={[styles.gestureHandle, animatedLine]}>
                        {showLines ? (
                            <DashedLine style={{ left: LineStartX, top: '50%', transform: [{ rotate: '90deg' }] }} dashColor='grey' dashGap={7} ></DashedLine>

                        ) : null}
                        {showLines ? (
                            <DashedLine style={{ top: LineStartY }} dashColor='grey' dashGap={7} ></DashedLine>
                        ) : null}
                        {showLines ? (
                            <Text style={{ color: 'white', position: 'absolute', left: '50%', top: LineStartY }}>{randDolllar}</Text>

                        ) : null}
                    </Animated.View>
                </PanGestureHandler>
            </GestureHandlerRootView>

            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}> {range}</Text>

            <Slider
                style={{ width: 250, height: 40 }}
                minimumValue={10}
                maximumValue={100}
                minimumTrackTintColor='tomato'
                maximumTrackTintColor='black'
                thumbTintColor='tomato'
                value={50}
                onValueChange={value => setRange(parseInt(value) + ' Data Points')}
                onSlidingComplete={(value) => { candles = candles.slice(0, value); }}
            />

            <Text onPress={() => alert('Home screen')} style={{ fontWeight: 'bold', color: 'white' }}>
                {company}
            </Text>

        </SafeAreaView >

    );
}





const styles = StyleSheet.create({
    gestureHandle: {
        width: "100%",
        height: 430,
        backgroundColor: 'transparent',
        position: 'absolute',

    },
});

