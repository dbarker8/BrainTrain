import React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, Platform, Dimensions, Image, ImageBackground, Animated, Easing, AsyncStorage, TouchableOpacity } from 'react-native';
import { Button, Text, Icon, Segment } from 'native-base';
import Colors from '../assets/GlobalStyles';
import { LinearGradient } from 'expo';

let d = Dimensions.get('window');

export class HighScoresScreen extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            highScoresListEasy: [],
            highScoresListHard: [],
            section: 'easy'
        }

    }

    componentDidMount(){
        AsyncStorage.getItem('highScoresListEasy').then(list => {
            list = JSON.parse(list);
            //only show top 200 scores if there are alot
            if(list.length>200){
                list.length=200;
            }
            this.setState({highScoresListEasy: list});
        })

        AsyncStorage.getItem('highScoresListHard').then(list => {
            list = JSON.parse(list);
            //only show top 200 scores if there are alot
            if(list.length>200){
                list.length=200;
            }
            this.setState({highScoresListHard: list});
        })
    }

    render() {
        let section = null;
        if(this.state.section=='easy'){
            section = 
            <ScrollView style={styles.scrollView}>
                    {this.state.highScoresListEasy.map((item, index) => {
                        return <Text style={styles.highScore}>{(index+1)+'.\u00A0'+'\u00A0'+'\u00A0'+item}</Text>
                    })}
            </ScrollView> ;
        }
        if(this.state.section=='hard'){
            section = 
            <ScrollView style={styles.scrollView}>
                    {this.state.highScoresListHard.map((item, index) => {
                        return <Text style={styles.highScore}>{(index+1)+'.\u00A0'+'\u00A0'+'\u00A0'+item}</Text>
                    })}
            </ScrollView>;
        }

        return (
            <LinearGradient colors={[Colors.darkBackground, '#527599']} style={{ flex: 1 }}
                start={[0, 1]} end={[1, 0]} >
                <ImageBackground source={require('../assets/img/tiles.png')} style={{ flex: 1 }} >
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{padding:15}}><Icon name='ios-arrow-back' style={styles.icon}/></TouchableOpacity>
                            <Text style={styles.title}>High Scores</Text>                            
                            <View style={styles.buttonRow}>
                                <Button light bordered={this.state.section=='easy' ? false : true} style={styles.rowButton} onPress={() => this.setState({section: 'easy'})} >
                                    <Text style={this.state.section=='easy' ? {color: Colors.darkBackground} : null}>Easy</Text>
                                </Button>
                                <Button light bordered={this.state.section=='hard' ? false : true} style={styles.rowButton} onPress={() => this.setState({section: 'hard'})} >
                                    <Text style={this.state.section=='hard' ? {color: Colors.darkBackground} : null}>Hard</Text>
                                </Button>
                            </View>
                            {section}
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
        width: '100%',
    },
    title: {
        color: Colors.offWhite,
        width: '100%',
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom:40
    },
    highScore: {
        color: Colors.offWhite,
        width: '100%',
        textAlign: 'center',
        fontSize: 24
    },
    scrollView: {
        flex:1,
        marginTop:20
    },
    icon: {
        color: Colors.offWhite, 
        position: 'absolute',
        left:25,
        top:10
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowButton: {
        marginHorizontal: 20
    }
});
