import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput,Alert, Button, AppRegistry, Header, KeyboardAvoidingView, } from 'react-native';
var Dimensions = require('Dimensions');
export default class HelloWorldApp extends Component {
    constructor()
    {
        super();
        this.state = { username: '', userpassword: '', userpassword2:'',userphone:'',usermail:'', loading: false, disabled: false }
    }
    saveData()
    {
        if(this.state.userpassword!=this.state.userpassword2){
            Alert.alert("二次密碼不符","請確認您的密碼是否輸入正確")
        }
        else if (this.state.usermail=='') {
            Alert.alert("請輸入email")
        }
        else {
            this.setState({ loading: true, disabled: true,}, () =>
            {
                fetch('http://120.108.111.85/~foodie/insert.php',
            {
                method: 'POST',
                    headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        'username': this.state.username,
                        'userpassword': this.state.userpassword,
                        'userphone': this.state.userphone,
                        'usermail': this.state.usermail,


                    })

            }).then((response) => response.text()).then((responseJson) =>
            {
                //Alert.alert(user);
                Alert.alert(
                    '提示',
                    responseJson, [{
                        text: '確定',
                        onPress: () =>this.props.navigation.navigate('login')
                    }]);
            this.setState({ loading: false, disabled: false });
        }).catch((error) =>
            {
                console.error(error);
            this.setState({ loading: false, disabled: false });
        });
        });
        }
    }

    render()
    {
        return(
            <View style = { styles.container }>
            <KeyboardAvoidingView behavior="padding" enabled>
                <View>
                  <View>
                    <Text style={styles.title}>Foodie{'\n'}</Text>
                  </View>
                  <View>
                    <Text style={styles.signup}>Sign up{'\n'}</Text>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                <TextInput underlineColorAndroid = "transparent" placeholder = "username" onChangeText = {(text) => this.setState({ username: text })}/>
                </View>
                <View style={styles.buttonContainer}>
                <TextInput underlineColorAndroid = "transparent" placeholder = "password" secureTextEntry={true} onChangeText = {(text) => this.setState({ userpassword: text })}/>
                </View>
                <View style={styles.buttonContainer}>
                <TextInput underlineColorAndroid = "transparent" placeholder = "confirm password" secureTextEntry={true} onChangeText = {(text) => this.setState({ userpassword2: text })}/>
                </View>
                <View style={styles.buttonContainer}>
                <TextInput underlineColorAndroid = "transparent" placeholder = "cellphone" keyboardType="phone-pad" onChangeText = {(text) => this.setState({ userphone: text })}/>
                </View>
                <View style={styles.buttonContainer}>
                <TextInput underlineColorAndroid = "transparent" placeholder = "e-mail" keyboardType="email-address" onChangeText = {(text) => this.setState({ usermail: text })}/>
                </View>
                <View style={styles.alternativeLayoutButtonContainer}>
                <Button
                    onPress ={() => this.saveData()}
                    activeOpacity = { 0.8 }
                    title="註冊"
                    color="#841584"
                        />
                        </View>
                </KeyboardAvoidingView>
            </View>

    );
    }

}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: '#841584',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    container: {
        flex: 1,
        justifyContent: 'center',
    },
    title:{
        fontSize: 40,
        fontWeight: 'bold',
        color: '#841584',
        textAlign: 'center',
    },
    signup:{
        textAlign: 'center',
        fontSize: 20,
        color: '#6c6d6d',
    },
    buttonContainer: {
        fontSize: 20,
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
AppRegistry.registerComponent('AwesomeProject', () => ButtonBasics);
