import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';

export class PlayGameScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Play game screen</Text>
                <Button onPress={() => this.props.navigation.goBack()}>back</Button>
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
