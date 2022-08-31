/*修改密碼-確認密碼*/

import React, { Component } from 'react';
import { Text,AsyncStorage, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform,Alert, Button, AppRegistry,Image ,KeyboardAvoidingView} from 'react-native';
var Dimensions = require('Dimensions');
import { createStackNavigator, createAppContainer } from 'react-navigation';
import local from'./DeviceStorage.js';
var viewwidth;
 let {width, height} = Dimensions.get('window');
    viewwidth=viewwidth/width;
     viewwidth=width;
export default class Verify extends React.Component {
  constructor()
  {
      super();
      this.state = { users:'',checkpassword: '', loading: false, disabled: false }
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

      checkData()
      {
          let user;
          this.setState({ loading: true, disabled: true}, () =>
          {

                  fetch("http://120.108.111.85/~foodie/checkpasswd.php", {
                      method: 'POST',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          'username': this.state.users,
                          'password': this.state.checkpassword,
                      })
                  }).then((response) => response.json()).then((responseJson) => {
                      user=responseJson;
                         if (responseJson!="密碼錯誤"){
                           this.props.navigation.navigate('changepasswd')
                           this.setState({
                            loading: false,
                            disabled: false
                              });
                        }else{

                          Alert.alert(
                          '提示',
                          responseJson, [{
                              text: '確定',

                          }]);
                                   this.setState({
                          loading: false,
                          disabled: false
                      });
                              }


                  }).catch((error) => {
                      console.error(error);
                      this.setState({
                          loading: false,
                          disabled: false
                      });
                  });
          });
      }

 render()
{
    return(
        <View style = { styles.container }>
        <KeyboardAvoidingView behavior={'position'}>
                <View style={styles.buttonContainer}>
            <TextInput underlineColorAndroid = "transparent" placeholder = "請輸入密碼以進行下一步動作"   secureTextEntry={true} onChangeText = {(text) => this.setState({ checkpassword: text })}/>
                </View>
             <View style={styles.alternativeLayoutButtonContainer}>
              <Button
                 disabled = { this.state.disabled }
                activeOpacity = { 0.8 }
                onPress ={() =>this.checkData()}
                title="　確認　"
                color="#4ccbff"
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
    title:{
        fontSize: 50,
        fontWeight: 'bold',
        color: '#4ccbff',
        textAlign: 'center',
    },
    login:{
        textAlign: 'center',
        fontSize: 20,
        color: '#6c6d6d',
    },
    buttonContainer: {
        fontSize: 30,
        marginLeft: 50,
        marginRight: 50,
        margin: 10,
        borderColor: '#4ccbff',
        borderBottomWidth: 1
    },
    alternativeLayoutButtonContainer: {
        marginLeft: 50,
        marginRight: 50,
        margin: 10,
        fontSize: 30,
        flexDirection: 'row',
        left: viewwidth*0.5,
        right: 0,
    }
})


// skip this line if using Create React Native App
AppRegistry.registerComponent('Verify', () => Verify);
