import React from 'react';
import {
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Dimensions
} from 'react-native';
import { Button, Text } from 'native-base';
import Colors from '../assets/GlobalStyles';

const { height, width } = Dimensions.get('window');

class GameFinishedModal extends React.Component {

    render() {

        return (

            <Modal
                onRequestClose={this.props.hideModal}
                // transparent={true}
                animationType='fade'
                visible={this.props.visible}
            >
                <View style={styles.modal}>
                    <View style={styles.modalView}>
                        <ScrollView style={styles.scrollView}>

                            <Text style={styles.textBlock}>Display stats and top 10 high scores? animate them in also with setTimeout  ?</Text>

                        </ScrollView>
                    </View>
                    <Button light bordered style={styles.closeButton} onPress={this.props.hideModal}>
                        <Text>Continue</Text>
                    </Button>
                </View>
            </Modal>

        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
            flex: 1,
            backgroundColor: 'transparent'
        },
        modal: {
            justifyContent: 'center',
            backgroundColor: Colors.darkBackground,
            width: width,
            height: height,
        },
        modalView: {
            backgroundColor: Colors.darkBackground,
            borderRadius: 5,
            width: width*.9,
            height: height*.7,
            alignSelf: 'center',
            padding:20,
        },
        textBlock: {
            color: Colors.offWhite

        },
        closeButton: {
            width: '40%',
            alignSelf: 'center',
            justifyContent: 'center',
            margin: 10,
    },
})

export default GameFinishedModal;