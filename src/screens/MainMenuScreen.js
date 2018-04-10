import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';

export class MainMenuScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>MainMenu</Text>
                <Button onPress={() => this.props.navigation.navigate('PlayGameScreen')}>Play</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});
