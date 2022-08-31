import React, { Component } from 'react';
import { Text,AsyncStorage, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform,Alert, Button, AppRegistry,Image ,KeyboardAvoidingView} from 'react-native';
var Dimensions = require('Dimensions');
import { createStackNavigator, createAppContainer } from 'react-navigation';
import local from'./DeviceStorage.js';
import { withNavigation } from "react-navigation";
var viewwidth;
 let {width, height} = Dimensions.get('window');
    viewwidth=viewwidth/width;
     viewwidth=width;
class HelloWorldApp extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor()
{

    super();
    this.state = { tags:'',username: '', password: '', loading: false, disabled: false }

}
 componentWillUnmount() {
         this.focusListener.remove();
    }
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
       local.remove('user','1001');
    // local.set('user','1001',{username:null,password:null},'1000*60');

    });
  }
saveData()
{
    let user;
     this.setState({ loading: false, disabled: false}, () =>
    {

            fetch("http://120.108.111.85/~foodie/member.php", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': this.state.username,
                    'password': this.state.password
                })
            }).then((response) => response.json()).then((responseJson) => {
                user=responseJson;
                console.log(responseJson);
                   if (responseJson!="登入失敗"){
                    local.set('user','1001',{username:user.user,password:user.password,phone:user.phone,mail:user.mail},'1000*60');

                    Alert.alert(
                    '提示',
                    "登入成功", [{
                        text: '確定',
                        onPress: () =>this.props.navigation.navigate('home')
                    }]);


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
        <KeyboardAvoidingView behavior="padding" enabled>
         <View>
         <View style={{justifyContent: 'center',alignItems: 'center'}}>
             <Image
            style={{width: viewwidth*0.4, height: viewwidth*0.4,}}
            source={require('./icon/logincat.png')}
          />
           <Text style={styles.title}>Foodie{'\n'}</Text>
         </View>
         <View>
           <Text style={styles.login}>Sign in{'\n'}{'\n'}</Text>
         </View>
               </View>
               <View style={styles.buttonContainer}>
            <TextInput underlineColorAndroid = "transparent" placeholder = "username" style = { styles.textInput } onChangeText = {(text) => this.setState({ username: text })}/>
                </View>
                <View style={styles.buttonContainer}>
            <TextInput underlineColorAndroid = "transparent" placeholder = "password"   secureTextEntry={true}style = { styles.textInput } onChangeText = {(text) => this.setState({ password: text })}/>
                </View>
             <View style={styles.alternativeLayoutButtonContainer}>
              <Button
                 disabled = { this.state.disabled }
                activeOpacity = { 0.8 }
                onPress ={() => this.saveData()}
                title="登入"
                color="#4ccbff"
              />
              <Button
              disabled = { this.state.disabled }
                activeOpacity = { 0.8 }
                onPress ={() =>this.props.navigation.navigate('home')}
                title="訪客登入"
                 color="#479AC7"
              />
              <Button
              disabled = { this.state.disabled }
                activeOpacity = { 0.8 }
                onPress ={() =>this.props.navigation.navigate('reg')}
                title="註冊"
                color="#841584"
              />

          </View>
           </KeyboardAvoidingView>
        </View>
        );
    }

}
/*
<TouchableOpacity disabled = { this.state.disabled } activeOpacity = { 0.8 } style = { styles.Btn } onPress = { this.saveData }>
                <Text style = { styles.btnText }>Insert</Text>
            </TouchableOpacity>

            {
                (this.state.loading)
                ?
                    (<ActivityIndicator size = "large" />)
                :
                    null
            }
*/
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
    },
    title:{
        fontSize: 40,
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
        fontSize: 20,
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
        justifyContent: 'space-around',
    }
})


// skip this line if using Create React Native App
//AppRegistry.registerComponent('HelloWorldApp', () => HelloWorldApp);
export default withNavigation(HelloWorldApp);