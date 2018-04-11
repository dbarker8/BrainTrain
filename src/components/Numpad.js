import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import Colors from '../assets/GlobalStyles';

export default class MainMenuScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={() => this.props.keyPress(1)} style={styles.button}>
                        <Text style={styles.buttonText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.keyPress(2)} style={styles.button}>
                        <Text style={styles.buttonText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.keyPress(3)} style={styles.button}>
                        <Text style={styles.buttonText}>3</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={() => this.props.keyPress(4)} style={styles.button}>
                        <Text style={styles.buttonText}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.keyPress(5)} style={styles.button}>
                        <Text style={styles.buttonText}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.keyPress(6)} style={styles.button}>
                        <Text style={styles.buttonText}>6</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={() => this.props.keyPress(7)} style={styles.button}>
                        <Text style={styles.buttonText}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.keyPress(8)} style={styles.button}>
                        <Text style={styles.buttonText}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.keyPress(9)} style={styles.button}>
                        <Text style={styles.buttonText}>9</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={() => this.props.backKeyPress()} style={[styles.button, styles.cornerButton]}>
                        <Icon name='ios-menu' style={{color: Colors.offWhite}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.keyPress(0)} style={styles.button}>
                        <Text style={styles.buttonText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.deleteKeyPress()} style={[styles.button, styles.cornerButton]}>
                        <Icon name='ios-backspace' style={{ color: Colors.offWhite }} />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    //   flexDirection: 'row',  
    // flex:1,
    // position: 'absolute',
    // bottom: 3,
    // left:0,
    // right:0,
    },
    buttonRow: {
        flexDirection: 'row',
        height:60,
    },
    button: {
        flex:.333333333,
        // height:40,
        backgroundColor: Colors.lightMain,
        borderRadius:5,
        margin:5,
        alignItems: 'center',
        justifyContent: 'center',
        opacity:.8

    },
    cornerButton: {
        borderWidth:1,
        borderColor: Colors.main,
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: Colors.offWhite,
        fontSize:36,
        fontWeight: 'bold'
    }

});
