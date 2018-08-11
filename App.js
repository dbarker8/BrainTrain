import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import RootNavigation from './src/navigation';
import { Font, AppLoading } from "expo";

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      appLoading: true
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({appLoading: false});
  }

  render() {

    //init blank high scores lists
    AsyncStorage.getItem('highScoresListEasy').then(list => {
      if(!list){
        AsyncStorage.setItem('highScoresListEasy', '[]');
      }
    })
    AsyncStorage.getItem('highScoresListHard').then(list => {
      if(!list){
        AsyncStorage.setItem('highScoresListHard', '[]');
      }
    })
    
    return (
      this.state.appLoading ? <AppLoading /> : <RootNavigation /> 
    );
  }
}
