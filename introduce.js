import React, { Component } from 'react';
import { Text,AsyncStorage, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform,Alert, Button, AppRegistry,Image ,KeyboardAvoidingView} from 'react-native';
var Dimensions = require('Dimensions');
import { createStackNavigator, createAppContainer } from 'react-navigation';
import local from'./DeviceStorage.js';
 let {width, height} = Dimensions.get('window');

export default class Introduce extends React.Component {


  constructor() {
     super();
     this.state={users:'',phone:'',mail:''};
     this.localget();
    }
    localget(){
    local.get('user','1001').then(ret => {

                      /*console.log(ret.username) //獲取緩存結果*/
               this.setState({users:ret.username,phone:ret.phone,mail:ret.mail})

                   }).catch(err => {

                       console.log("error") //拋出的錯誤

                   })

   }


  onPress = () => {
       alert("連結");
    }
  render(){
    const cellphone=[]
    if(this.state.phone!=null){
      cellphone.push(
        <View style={styles.titleword}>
          <Text style={styles.wordcolor}>電話號碼</Text>
          <View style={styles.detailword}>
            <Text style={styles.wordsize}>{this.state.phone}</Text>
          </View>
        </View>
      )
    }else {
      <View/>
    }

     return(
         <View style = { styles.container }>
         <KeyboardAvoidingView behavior={'position'}>
                <View style={styles.titleword}>
                  <Text style={styles.wordcolor}>帳號</Text>
                <View style={styles.detailword}>
                  <Text style={styles.wordsize}>{this.state.users}</Text>
                </View>
                </View>
                {cellphone}
                <View style={styles.titleword}>
                  <Text style={styles.wordcolor}>電子郵件</Text>
                <View style={styles.detailword}>
                  <Text style={styles.wordsize}>{this.state.mail}</Text>
                </View>
                </View>
              <View style={styles.alternativeLayoutButtonContainer}>
               <Button
                 disabled = { this.state.disabled }
                 activeOpacity = { 0.8 }
                onPress={() =>this.props.navigation.navigate('changeintro')}
                 title="　　修改　　"
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
     },
     titleword: {
         fontSize: 40,
         marginLeft: 50,
         margin: 10,
     },
     wordcolor:{
       color: '#4ccbff',
     },
     wordsize:{
       fontSize: 25,
     },
     detailword:{
         fontSize: 30,
         marginLeft: 10,
         margin: 10,
     },
     alternativeLayoutButtonContainer: {
         marginLeft: 50,
         marginRight: 50,
      /*   marginTop:70,*/
         paddingTop:height*0.3,
         margin: 10,
         fontSize: 30,
         flexDirection: 'row',
         justifyContent: 'space-around',
     },
 })


 // skip this line if using Create React Native App
 AppRegistry.registerComponent('Introduce', () => Introduce);
