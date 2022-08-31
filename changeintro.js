import React, { Component } from 'react';
import { Text,AsyncStorage, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform,Alert, Button, AppRegistry,Image ,KeyboardAvoidingView} from 'react-native';
var Dimensions = require('Dimensions');
import { createStackNavigator, createAppContainer } from 'react-navigation';
import local from'./DeviceStorage.js';
let {width, height} = Dimensions.get('window');

export default class Changeintro extends React.Component {
  constructor() {
     super();
     this.state={users:'',phone:'',mail:'',passswd:'',changemail:'',changephone:'',loading:'false',disable:'false'};
     this.localget();
    }
    localget(){
    local.get('user','1001').then(ret => {

                      /*console.log(ret.username) //獲取緩存結果*/
               this.setState({users:ret.username,passwd:ret.userpassword,phone:ret.phone,mail:ret.mail})

                   }).catch(err => {

                       console.log("error") //拋出的錯誤

                   })
   }

   changeintroduce()
   {
         this.setState({ loading: false, disabled: false,}, () =>
         {
             fetch('http://120.108.111.85/~foodie/updateintro.php',
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
                     'userphone': this.state.changephone,
                     'usermail':this.state.changemail,
                 })

         }).then((response) => response.text()).then((responseJson) =>
         {
           if(this.state.changephone==''&&this.state.changemail!=''){
             this.setState({changephone:this.state.phone})
           }else if(this.state.changemail==''&&this.state.changephone!=''){
             this.setState({changemail:this.state.mail})
           } else if(this.state.changemail==''&&this.state.changephone==''){
             this.setState({changemail:this.state.mail,changephone:this.state.phone})
           }
           local.remove('user');
           local.set('user','1001',{username:this.state.users,password:this.state.passwd,phone:this.state.changephone,mail:this.state.changemail},'1000*60');
           Alert.alert(
           '提示',
           "更新成功", [{
               text: '確定',
               onPress: () =>this.props.navigation.navigate('home')
           }]);

         this.setState({ loading: false, disabled: false });
     }).catch((error) =>
         {
             console.error(error);
         this.setState({ loading: false, disabled: false });
     });
     });
     }


  render(){
     return(
         <View style = { styles.container }>
         <KeyboardAvoidingView behavior={'position'}>
                <View style={styles.titleword}>
                  <Text style={styles.wordcolor}>帳號</Text>
                <View style={styles.detailwordnotborder}>
                <Text>{this.state.users}</Text>
                </View>
                </View>
                <View style={styles.titleword}>
                  <Text style={styles.wordcolor}>電話號碼</Text>
                <View style={styles.detailword}>
                <TextInput underlineColorAndroid = "transparent" onChangeText = {(text) => this.setState({ changephone: text })}>{this.state.phone}</TextInput>
                </View>
                </View>
                <View style={styles.titleword}>
                  <Text style={styles.wordcolor}>電子郵件</Text>
                <View style={styles.detailword}>
                  <TextInput underlineColorAndroid = "transparent" onChangeText = {(text) => this.setState({ changemail: text })}>{this.state.mail}</TextInput>
                </View>
                </View>
              <View style={styles.alternativeLayoutButtonContainer}>
               <Button
                disabled = { this.state.disabled }
                 activeOpacity = { 0.8 }
                 onPress={() => this.changeintroduce()}
                 title="　　確定　　"
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
     },
     titleword: {
         fontSize: 40,
         marginLeft: 50,
         margin: 10,
     },
     wordcolor:{
       color: '#841584',
     },
     detailword:{
           fontSize: 30,
           marginRight: 50,
           margin: 10,
           borderColor: '#841584',
           borderWidth: 1
     },
     detailwordnotborder:{
       fontSize: 30,
       marginRight: 50,
       margin: 10,
     },
     alternativeLayoutButtonContainer: {
         marginLeft: 50,
         marginRight: 50,
         marginTop: height*0.3,
         margin: 10,
         fontSize: 30,
         flexDirection: 'row',
         justifyContent: 'space-around',
     },
 })


 // skip this line if using Create React Native App
 AppRegistry.registerComponent('Changeintro', () => Changeintro);
