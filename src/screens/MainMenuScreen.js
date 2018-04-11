import React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, Platform, Dimensions, Image, ImageBackground, Animated, Easing } from 'react-native';
import { Button, Text } from 'native-base';
import Colors from '../assets/GlobalStyles';
import { LinearGradient } from 'expo';

let d = Dimensions.get('window');

export class MainMenuScreen extends React.Component {
    static navigationOptions = (props) => {
      return {
        // title: 'Logo',
        header: false,
      }
    }



    constructor(props){
        super(props);

        this.state = {
            spinValue: new Animated.Value(0),
        }
        this.runAnimation();


    }

    runAnimation(){
        this.state.spinValue.setValue(0);
        Animated.timing(
            this.state.spinValue,
          {
            toValue: 10,
            duration: 20000,
            easing: Easing.linear
          }
        ).start(() => this.runAnimation())
    }

    render() {
        const spin = this.state.spinValue.interpolate({
          inputRange: [0, 10],
          outputRange: ['0deg', '360deg']
        })
        return (
            <LinearGradient colors={[Colors.darkBackground, '#527599']} style={{ flex:1 }}
            start={[0,1]} end={[1,0]} >
                <ImageBackground source={require('../assets/img/tiles.png')} style={{ flex: 1}} >
                    <SafeAreaView style={{flex:1}}>
                        <View style={styles.container}>
                            <Animated.Image source={require('../assets/img/brain.png')} style={[ {transform: [{rotate: spin}]}, styles.logo ]} />
                            <View style={styles.topButtonContainer}>
                                <Text style={styles.menuLabel}>New Game</Text>
                                <Button bordered block light style={styles.menuButton} onPress={() => this.props.navigation.navigate('PlayGameScreen', {difficulty: 'easy'})}>
                                    <Text>Easy</Text>
                                </Button>
                                <Button bordered block light style={styles.menuButton} onPress={() => this.props.navigation.navigate('PlayGameScreen', { difficulty: 'hard' })}>
                                    <Text>Hard</Text>
                                </Button>
                            </View>
                            <View style={styles.bottomButtonRow}>
                                <Button bordered light style={styles.halfButton} onPress={() => this.props.navigation.navigate('HighScoresScreen', {  })}>
                                    <Text>High Scores</Text>
                                </Button>
                                <Button bordered light style={styles.halfButton} onPress={() => alert('about pressed')}>
                                    <Text>More</Text>
                                </Button>
                            </View>
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
        paddingVertical:d.height/5,
        width:'100%',
        // backgroundColor: 'red'
        
    },
    menuButton: {
        marginHorizontal: 15,
        marginVertical:5,
    },
    halfButton: {
        flex: .5,
        margin:15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomButtonRow: {
        flexDirection: 'row',
        // width: '100%',
        justifyContent: 'space-between',
        paddingTop:15,
    },
    topButtonContainer: {
        // flex: 1,
        width: '100%',
        marginTop:30
    },
    logo: {
        height: d.width/3,
        width: d.width/3,
        opacity:.8
    },
    menuLabel: {
        color: Colors.offWhite,
        width: '100%',
        textAlign: 'center',
        opacity:.9,
        marginVertical:10,

    }
});
