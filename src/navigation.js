import { StackNavigator } from 'react-navigation';
import React from 'react';

//-------------------SCREENS---------------------
import { MainMenuScreen } from './screens/MainMenuScreen';
import { PlayGameScreen } from './screens/PlayGameScreen';


const Nav = StackNavigator({
    MainMenuScreen: { screen: MainMenuScreen },
    PlayGameScreen: { screen: PlayGameScreen },
});

export class RootNavigation extends React.Component {

    render() {
        return <Nav />;
    }

}

