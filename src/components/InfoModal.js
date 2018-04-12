import React from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Linking
} from 'react-native';
import {
  Button,
  Text
} from 'native-base';
import Colors from '../assets/GlobalStyles';

const {height, width} = Dimensions.get('window');

class InfoModal extends React.Component {

  render() {

      return (
          <Modal
            onRequestClose={this.props.hideModal}
            // transparent={true}
            animationType='fade'
            visible={this.props.showModal}
          >
              <View style={styles.modal}>
                <View style={styles.modalView}>

                  <ScrollView style={{flex:1}}>
                    <Text style={styles.textBlock}>BrainTrain helps you sharpen your mind and think quick! Answer as many mental math questions as possible in 60 seconds</Text>
                    <Button light bordered block style={styles.menuButton} onPress={() => Linking.openURL('mailto:deanbarker44@gmail.com?Subject=BrainTrain')} >
                        <Text>Contact Us</Text>
                    </Button>
                  </ScrollView>

                </View>

                <Button light bordered style={styles.closeButton} onPress={this.props.hideModal}>
                    <Text>Close</Text>
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
    // backgroundColor: 'rgba(0, 0, 0, .1)',
    // backgroundColor: 'transparent',
    width: width,
    height: height,
  },
  modalView: {
    backgroundColor: Colors.darkBackground,
    borderRadius: 5,
    width: width * .9,
    height: height * .7,
    alignSelf: 'center',
    padding: 20,
  },
  textBlock: {
    color: Colors.offWhite,
    fontSize: 22,
    marginVertical: 15,
    textAlign: 'center'

  },
  closeButton: {
    width: '40%',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  menuButton: {
    marginHorizontal: 15,
    marginVertical: 5,
  },
})

export default InfoModal;