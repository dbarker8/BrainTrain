import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import RootNavigation from './src/navigation';

export default class App extends React.Component {

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
      <RootNavigation />
    );
  }
}
