import React from 'react';
import { View, SafeAreaView, Text, StyleSheet, Alert, SetInterval, Dimensions, LayoutAnimation } from 'react-native';
import { Button } from 'native-base';
import Numpad from '../components/Numpad';
import AnimationSettings from '../assets/animations';
import GameFinishedModal from '../components/GameFinishedModal';

export class PlayGameScreen extends React.Component {
    static navigationOptions = (props) => {
      return {
        header: false,
      }
    }

    constructor(props){
        super(props);
        this.state={
            question: '27 x 4',
            answer: '',
            feedbackText: ' ',
            questionsList: [{}],
            currentQuestionIndex: 0,
            countdownNumber: 3,
            isCountingDown: true,
            gameTimerNumber: 63,
            showGameFinishedModal: true
        }
    }

    componentDidMount(){
        this.makeQuestions();
        this.interval = setInterval(() => {
          if(this.state.countdownNumber>1){
            this.setState({countdownNumber: this.state.countdownNumber-1});
          }else{
              //countdown done
              this.setState({isCountingDown: false});
          }

        }, 1000);

        this.gameTimer = setInterval(() => {
          if(this.state.gameTimerNumber>1){
            this.setState({gameTimerNumber: this.state.gameTimerNumber-1});
          }else{
              //end game
              alert('game over screen shows now');
              clearInterval(this.gameTimer);              
          }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearInterval(this.gameTimer);
    }

    handleAnswerChange(newNumber){
        if(this.state.answer.length<4){
            let newAnswer = this.state.answer;
            newAnswer = newAnswer+newNumber;
            this.setState({ answer: newAnswer });        
            if(newAnswer==this.state.questionsList[this.state.currentQuestionIndex].answer){
                this.incrementQuestions({message: 'Correct!'});
            }
        }
    }


    handleDeleteKeyPress(){
        let newAnswer = this.state.answer;
        if(newAnswer.length>0){
            newAnswer = newAnswer.substring(0, newAnswer.length-1);
        }
        this.setState({answer: newAnswer});
    }

    hideModal(){
        this.setState({showGameFinishedModal: false});
        this.props.navigation.goBack();
    }

    handleBackKeyPress(){
        // Alert.alert(
        //   'Leave Game?',
        //   '',
        //   [
        //     {text: 'Leave', onPress: () => callback()},
        //     {text: 'Cancel'},
        //   ]
        // )
        // function callback(){
            this.props.navigation.goBack();
        // }
    }

    makeQuestions(){
        //--------------------difficulty config-------------
        let mathTypes = null;
        let maxNumber = 0; //for add or subtract problems only
        if(this.props.navigation.state.params.difficulty=='easy'){
            //no multiplication or division
            mathTypes = ['addition', 'subtraction', 'addition', 'subtraction'];
            maxNumber = 40;
        }
        if(this.props.navigation.state.params.difficulty=='hard'){
            mathTypes = ['addition', 'subtraction', 'multiplication', 'division'];
            maxNumber = 200;
        }
        //---------------------------------------------
        
        let questionsArray = [];
        let count = 0;
        while (count<120){
            let type = mathTypes[Math.floor(Math.random() * 4)];

            //always make n1 the larger number so no negatives
            //these are used for add and subtract
            let addPre1 = Math.floor(Math.random() * maxNumber);
            let addPre2 = Math.floor(Math.random() * maxNumber);
            let addRandom1 = addPre1 >= addPre2 ? addPre1 : addPre2;
            let addRandom2 = addPre1 >= addPre2 ? addPre2 : addPre1;

            let question = {
                number1: addRandom1,
                number2: addRandom2,
                type: type,
                text: '',
                answer: 0,
            };

            switch(type){
                case 'addition':
                    question.text = addRandom1+' + '+addRandom2;
                    question.answer = addRandom1+addRandom2;
                    break;

                case 'subtraction':
                    question.text = addRandom1+' - '+addRandom2;
                    question.answer = addRandom1 - addRandom2;
                    break;

                case 'multiplication':
                    let multRandom1 = Math.floor(Math.random() * 12);
                    let multRandom2 = Math.floor(Math.random() * 12);

                    question.text = multRandom1+' x '+multRandom2;
                    question.answer = multRandom1 * multRandom2;
                    break;

                case 'division': 
                    //make nice numbers that will divide evenly
                    let divRandom1 = null;
                    let divRandom2 = null;
                    while (divRandom1 == null){
                        let possible1 = Math.floor(Math.random() * 100);
                        let possible2 = Math.floor(Math.random() * 100);
                        if (possible1%possible2==0){
                            divRandom1 = possible1;
                            divRandom2 = possible2;
                        }
                    }
                    question.text = divRandom1+' / '+divRandom2;
                    question.answer = divRandom1 / divRandom2;
                    break;

                default:
                    break;
            }

            questionsArray.push(question);
            count++;
        }
        this.setState({questionsList: questionsArray});
    }

    incrementQuestions(x){
        LayoutAnimation.configureNext(AnimationSettings.softSpring);
        let i = this.state.currentQuestionIndex;
        i++;
        setTimeout(() => {
            this.setState({
                currentQuestionIndex: i, 
                feedbackText: x.message || '',
                answer: '',
            });
        }, 100);

    }



    render() {
        let currentQuestion = <Text key={this.state.currentQuestionIndex} style={styles.question}>{this.state.questionsList[this.state.currentQuestionIndex].text}</Text>
        let currentAnswer = <Text key={this.state.currentQuestionIndex} style={styles.answer} >{this.state.answer}</Text> ;

        return (

            <SafeAreaView style={styles.container}>
            {this.state.isCountingDown ? 
                <Text style={styles.countdown}>{this.state.countdownNumber}</Text>
            : 
                <View style={styles.gameView}>

                    <GameFinishedModal 
                        showModal={this.state.showGameFinishedModal}
                        hideModal={this.hideModal.bind(this)}
                    />

                    <Text style={styles.time}>{this.state.gameTimerNumber}</Text>
                    <View style={styles.topView}>
                        {currentQuestion}
                        <View style={styles.answerWrapper}>
                            {currentAnswer}
                        </View>
                    <Text style={styles.feedbackText}>{this.state.feedbackText}</Text>
                    </View>
                    <Numpad 
                        keyPress={x => this.handleAnswerChange(x)} 
                        deleteKeyPress={() => this.handleDeleteKeyPress()}
                        backKeyPress={() => this.handleBackKeyPress()}
                    />
                </View>
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: Colors.darkBackground,
    },
    gameView: {
        flex:1,
        justifyContent: 'space-between',
    },
    topView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flex:.8,
        paddingVertical:20,
        // backgroundColor: 'red'
    },
    question: {
        color: Colors.offWhite,
        fontSize: 42,
        textAlign: 'center',
        fontWeight: 'bold',
        // flex:1,
    },
    answer: {
        color: Colors.main, 
        fontSize: 36,
        textAlign: 'center',
        marginTop: 50,
        minHeight:50,

        // flex:1,    
    },
    answerWrapper: {
        borderBottomWidth:1,
        borderBottomColor: Colors.offWhite,
        width:'50%',
        paddingBottom:4,
        
    },
    feedbackText: {
        color: Colors.offWhite,
        width:'100%',
        textAlign: 'center'
    },
    time: {
        color: Colors.offWhite,
        paddingLeft:5,
        marginTop:6,
        opacity: .7,
        fontSize:20
    },
    countdown: {
        color: Colors.offWhite,
        fontSize:70,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: (Dimensions.get('window').height/2)-70,
        // width:'100%',
        // height: '100%',
    }
});
