
/*------------------------使用者頁面---------------------------*/
import React from 'react';
import local from './DeviceStorage.js';
import {
    Dimensions,
    AppRegistry,
    StyleSheet,
    Button,
    Text,
    View,
    Image,
    ImageBackground,
    StatusBar,
    ListView,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Alert,

} from 'react-native';
var viewwidth;
let {width, height} = Dimensions.get('window');
viewwidth=viewwidth/width;
viewwidth=width;
export default class User extends React.Component {
  constructor() {
     super();
     this.state={users:'',avatarSource:'',};
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
   clear(){
     local.remove('user');
     local.set('user','1001',{username:null,password:null},'1000*60');
     this.setState({users:null});
     this.props.navigation.navigate('login')
   }

    static navigationOptions = {
        tabBarLabel: '個人',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                source={focused ? require('./icon/user.png') : require('./icon/user.png')}
                style={{ width: 26, height: 26, tintColor: tintColor }}
            />
        )
    };

    intro(){
      if(this.state.users != null){
        this.props.navigation.navigate('introduce');
      }
      else {
        Alert.alert(
        '提示',
        "請登入", [{
            text: '確定',
            onPress: () =>this.props.navigation.navigate('login')
        }]);
      }
    }
    intro(){
      if(this.state.users != null){
        this.props.navigation.navigate('introduce');
      }
      else {
        Alert.alert(
        '提示',
        "請登入", [{
            text: '確定',
            onPress: () =>this.props.navigation.navigate('login')
        }]);
      }
    }
    comm(){
      if(this.state.users != null){
        this.props.navigation.navigate('comment');
      }
      else {
        Alert.alert(
        '提示',
        "請登入", [{
            text: '確定',
            onPress: () =>this.props.navigation.navigate('login')
        }]);
      }
    }
    veri(){
      if(this.state.users != null){
        this.props.navigation.navigate('verify');
      }
      else {
        Alert.alert(
        '提示',
        "請登入", [{
            text: '確定',
            onPress: () =>this.props.navigation.navigate('login')
        }]);
      }
    }



    render() {
        console.log(this.state.users);
        return (

            <View style={styles.container}>
              <ScrollView>
                <View style={styles.Viewheader}>
                <ImageBackground source={require('./icon/userback.jpg')} style={{width: viewwidth}}>
                  <View style={styles.imagecontainer}>
                      <Image style={styles.upImage} source={require('./icon/background1.png')}/>
                    <Text style={styles.nametext}>Hi 🌼 {this.state.users}!</Text>
                    <Image style={styles.downImage} source={require('./icon/background2.png')}/>
                  </View>
                  </ImageBackground>
                </View>
                <TouchableOpacity
                 style={styles.button}
                 onPress={() =>this.intro()}
                >
                  <Text style={styles.buttontext1}>🎤 個人資料 </Text>
                  <Text style={styles.buttontext2}>　＞ </Text>
                </TouchableOpacity>
                <TouchableOpacity
                 style={styles.button}
                 onPress={() =>this.comm()}
                >
                  <Text style={styles.buttontext1}>💬 我的評價 </Text>
                  <Text style={styles.buttontext2}> ＞ </Text>
                </TouchableOpacity>
                <TouchableOpacity
                 style={styles.button}
                 onPress={() =>this.veri()}
                >
                  <Text style={styles.buttontext1}>🔓 更改密碼 </Text>
                  <Text style={styles.buttontext2}> ＞ </Text>
                </TouchableOpacity>
                <TouchableOpacity
                 style={styles.button}
                 onPress={()=>this.clear()}
                >
                  <Text style={styles.buttontext1}>👋 登出 </Text>
                  <Text style={styles.buttontext2}> ＞ </Text>
                </TouchableOpacity>

              </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
     searchContainer: {
        flex: 1,
        position: 'relative',
        top: 30
    },
    Viewheader:{
      width:viewwidth,

    },
    button:{
      width:viewwidth,
      backgroundColor: '#FFF',
      padding: 10,
      borderTopWidth: 0.5,
      borderTopColor: '#FF3333',
    },
    buttontext1:{
      left: 0,
      fontSize:20,
    },
    buttontext2:{
      position: 'absolute',
      right: 0,
      fontSize:20,
      alignItems:'center',
      top:10,
    },
    imagecontainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    upImage: {
        marginTop: 1,
        width:viewwidth,
    },
    downImage:{
      marginBottom: 1,
      width:viewwidth,
    },
    nametext:{
      fontSize:25,
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 50,
        width: 100,
        height: 100
    },
    grayheart:{
      color:'red',
      alignItems: 'center',
      padding:5,
    },


});
