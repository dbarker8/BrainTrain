import { StackNavigator } from 'react-navigation';
import React from 'react';

//-------------------SCREENS---------------------
import { MainMenuScreen } from './screens/MainMenuScreen';
import { PlayGameScreen } from './screens/PlayGameScreen';
import { HighScoresScreen } from './screens/HighScoresScreen';


const Nav = StackNavigator({
    MainMenuScreen: { screen: MainMenuScreen },
    PlayGameScreen: { screen: PlayGameScreen },
    HighScoresScreen: { screen: HighScoresScreen },
});

export default class RootNavigation extends React.Component {

    render() {
        return <Nav />;
    }

}

