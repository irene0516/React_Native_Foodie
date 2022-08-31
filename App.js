import HelloWorldApp from './login.js';
import Register from'./register.js';

import Home from './nag.js';

import ToSearch from './ToSearch.js';
import SearchEnd from'./SearchEnd.js';

import Bot from './bot.js';

import User from './user.js';
import Introduce from './introduce.js'
import Changeintro from './changeintro.js';
import Comment from './comment.js'
import Verify from './verify.js'
import Changepasswd from './changepasswd.js'
import SearchComment from './searchcomment.js'

import React, { Component } from 'react';
import {  ImageBackground,TouchableOpacity,AppRegistry,TextInput,View,KeyboardAvoidingView,Text,SectionListImage,StyleSheet} from 'react-native';
import { label,createStackNavigator, createAppContainer } from 'react-navigation';
const RootStack = createStackNavigator(
  {
    /*登入*/
    login: HelloWorldApp,
    home:{
      screen:Home,
       navigationOptions:{
        header:null,
    }
    },
    reg: Register,
    /*菜單搜尋*/
    tosearch:ToSearch,
    tosearchend:SearchEnd,
    searchcomment:SearchComment,
    /*推薦*/
    bot:Bot,
    /*使用者介面*/
    user:User,
    introduce: Introduce,
    changeintro: Changeintro,
    comment: Comment,
    verify: Verify,
    changepasswd: Changepasswd,

  },
  {
    initialRouteName: 'login',

  }

);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
