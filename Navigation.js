import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './pages/Home';
//import Welcome from './pages/Welcome';
import splashScreen from './pages/splashScreen';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
//import {Avatar} from 'react-native-paper';

const AuthStackNavigator = createStackNavigator({
    splashScreen:
    {
      screen:splashScreen,
    },
    Login: {
      screen: Login,
    },
    
    Register: {
        screen: Register,
    }
},  { headerMode: 'none'});

const AppStackNavigator= createStackNavigator({
   Home: {
       screen: Home,
       navigationOptions:{
        title:'My Buddy List ',
        headerStyle : {backgroundColor:'red'},
        headerTitleStyle:{color:'white'},
      // <Avatar.Image size ={24} source = {require('./kirti.jpg')}/>
     },
    },
    Chat :{
      screen: Chat,
     // navigationOptions:{
       // title: 'Chat Room',
      //}
    },
});

const SwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthStackNavigator,
    App : AppStackNavigator
},
{
    initialRouteName: 'AuthLoading',
});

const Navigation = createAppContainer(SwitchNavigator);
export default Navigation;