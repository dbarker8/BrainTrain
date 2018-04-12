import React from 'react';
import {
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Dimensions,
    LayoutAnimation,
    AsyncStorage
} from 'react-native';
import AnimationSettings from '../assets/animations';
import { Button, Text } from 'native-base';
import Colors from '../assets/GlobalStyles';

const { height, width } = Dimensions.get('window');

class GameFinishedModal extends React.Component {

    constructor(props){
        super(props);
        this.state={
            timer: 0,
            highScoresList: []
        }

        this.interval = setInterval(() => {
          if(this.state.timer<4){
            LayoutAnimation.configureNext(AnimationSettings.softSpring);
            this.setState({timer: this.state.timer+1});
          }else{
              //countdown done
              clearInterval(this.interval);
          }
        }, 600);

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount(){
        this.handleHighScores(this.props.score);
    }

    handleHighScores(score){ //add in the new high score and save
        let scoresvar = '';
        if(this.props.difficulty=='easy'){
            scoresvar = 'highScoresListEasy';
        }
        if(this.props.difficulty=='hard'){
            scoresvar = 'highScoresListHard';
        }
        AsyncStorage.getItem(scoresvar).then(stringlist => {
            list = JSON.parse(stringlist);
            list.push(score);
            list.sort((a, b) => b-a );
            // list.reverse();
            //limit saved scores to the top 200 only
            if (list.length>200){
                list.length=200;
            }
            AsyncStorage.setItem(scoresvar, JSON.stringify(list));
            this.setState({highScoresList: list});
        })
    }

    render() {
        //animate the info in based on our timer
        let line1 = this.state.timer>=0 ? <Text style={styles.textBlock}>Game Over!</Text> : null;
        let line2 = this.state.timer>1 ? <Text style={styles.textBlock}>Score:  {this.props.score}</Text> : null;
        let line3 = this.state.timer>2 ? 
            <View style={{marginTop:5}}>
                <Text style={[styles.textBlock, {width:'100%', textAlign: 'center'}]}>High Scores</Text>
                <Text style={styles.highScore}>1. {'\u00A0'+'\u00A0'+'\u00A0'}{this.state.highScoresList[0] || '-'}</Text>
                <Text style={styles.highScore}>2. {'\u00A0'+'\u00A0'+'\u00A0'}{this.state.highScoresList[1] || '-'}</Text>
                <Text style={styles.highScore}>3. {'\u00A0'+'\u00A0'+'\u00A0'}{this.state.highScoresList[2] || '-'}</Text>
                <Text style={styles.highScore}>4. {'\u00A0'+'\u00A0'+'\u00A0'}{this.state.highScoresList[3] || '-'}</Text>
                <Text style={styles.highScore}>5. {'\u00A0'+'\u00A0'+'\u00A0'}{this.state.highScoresList[4] || '-'}</Text>
            </View>
            : null ;

        return (

            <Modal
                onRequestClose={this.props.hideModal}
                // transparent={true}
                animationType='fade'
                visible={this.props.showModal}
            >
                <View style={styles.modal}>
                    <View style={styles.modalView}>
                        <ScrollView style={styles.scrollView}>
                            {line1}
                            {line2}
                            {line3}
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
            color: Colors.offWhite,
            fontSize: 36,
            fontWeight: 'bold',
            marginVertical: 15

        },
        closeButton: {
            width: '40%',
            alignSelf: 'center',
            justifyContent: 'center',
            margin: 10,
    },
    highScore: {
        color: Colors.offWhite,
        width:'100%',
        textAlign: 'center',
        fontSize: 24,
        marginBottom:7

    }
})

export default GameFinishedModal;