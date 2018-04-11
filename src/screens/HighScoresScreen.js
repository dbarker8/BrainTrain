import React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, Platform, Dimensions, Image, ImageBackground, Animated, Easing } from 'react-native';
import { Button, Text } from 'native-base';
import Colors from '../assets/GlobalStyles';
import { LinearGradient } from 'expo';

let d = Dimensions.get('window');

export class HighScoresScreen extends React.Component {
    static navigationOptions = (props) => {
        return {
            // title: 'Logo',
            header: false,
        }
    }



    constructor(props) {
        super(props);

        this.state = {
        }

    }



    render() {

        return (
            <LinearGradient colors={[Colors.darkBackground, '#527599']} style={{ flex: 1 }}
                start={[0, 1]} end={[1, 0]} >
                <ImageBackground source={require('../assets/img/tiles.png')} style={{ flex: 1 }} >
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <Text>High scores</Text>
                            <Button onPress={() => this.props.navigation.goBack()}><Text>Back</Text></Button>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: d.height / 5,
        width: '100%',
        // backgroundColor: 'red'

    },
});
