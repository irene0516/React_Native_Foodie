import React, { Component } from 'react';
import { Text,AsyncStorage, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform,Alert, Button, AppRegistry,Image ,KeyboardAvoidingView} from 'react-native';
var Dimensions = require('Dimensions');
import { createStackNavigator, createAppContainer } from 'react-navigation';
import local from'./DeviceStorage.js';
var viewwidth;
 let {width, height} = Dimensions.get('window');
    viewwidth=viewwidth/width;
     viewwidth=width;

export default class Changepasswd extends React.Component {
  constructor()
  {
      super();
      this.state = { users:'', newpassword: '', newpassword2:'', loading: false, disabled: false }
      this.localget();
  }
     localget(){
     local.get('user','1001').then(ret => {
                       /*console.log(ret.username) //獲取緩存結果*/
                this.setState({users:ret.username})
                    }).catch(err => {
                        console.log("error") //拋出的錯誤
                    })
      }
  changepaswd()
  {
      if(this.state.newpassword!=this.state.newpassword2){
          Alert.alert("二次密碼不符","請確認您的密碼是否輸入正確")
      }
      else {
        this.setState({ loading: true, disabled: true,}, () =>
        {
            fetch('http://120.108.111.85/~foodie/updatepasswd.php',
        {
            method: 'POST',
                headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    'username': this.state.users,
                    'userpassword': this.state.newpassword,
                })

        }).then((response) => response.text()).then((responseJson) =>
        {
          this.props.navigation.navigate('user')

        this.setState({ loading: false, disabled: false });
    }).catch((error) =>
        {
            console.error(error);
            Alert.alert(
            '提示',
            responseJson, [{
                text: '確定',

            }]);
        this.setState({ loading: false, disabled: false });
    });
    });
    }
    }

 render()
{
    return(
        <View style = { styles.container }>
        <KeyboardAvoidingView behavior={'position'}>
          <View style={styles.buttonContainer}>
            <TextInput underlineColorAndroid = "transparent" placeholder = "新密碼"   secureTextEntry={true} onChangeText = {(text) => this.setState({ newpassword: text })}/>
          </View>
          <View style={styles.buttonContainer}>
            <TextInput underlineColorAndroid = "transparent" placeholder = "請再次輸入，用於確認"   secureTextEntry={true} onChangeText = {(text) => this.setState({ newpassword2: text })}/>
          </View>
          <View style={styles.alternativeLayoutButtonContainer}>
            <Button
              disabled = { this.state.disabled }
              activeOpacity = { 0.8 }
              onPress ={() => this.changepaswd()}
              title="變更密碼"
              color="#841584"
            />
          </View>
        </KeyboardAvoidingView>
        </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        fontSize: 30,
        marginLeft: 50,
        marginRight: 50,
        margin: 10,
        borderColor: '#841584',
        borderBottomWidth: 1
    },
    alternativeLayoutButtonContainer: {
      marginLeft: 200,
      marginRight: 50,
      margin: 10,
      fontSize: 30,
    }
})


// skip this line if using Create React Native App
AppRegistry.registerComponent('Changepasswd', () => Changepasswd);
