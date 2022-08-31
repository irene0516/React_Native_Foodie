import React, { Component } from 'react';
import { Text,AsyncStorage, View, StyleSheet, TextInput, TouchableOpacity,
  ActivityIndicator, Platform,Alert, Button, AppRegistry,Image ,ScrollView,
  ImageBackground} from 'react-native';
var Dimensions = require('Dimensions');
import { createStackNavigator, createAppContainer } from 'react-navigation';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwipeableRating from 'react-native-swipeable-rating';
import local from'./DeviceStorage.js';
var viewwidth;
let {width, height} = Dimensions.get('window');
viewwidth=viewwidth/width;
viewwidth=width;
viewheight=height;

export default class Bot extends React.Component {
  static navigationOptions = ({ navigation }) => ({
         title: '推薦您💕',
         headerRight : (<TouchableOpacity style={{width:40,margin:10}}
           onPress = {() => navigation.state.params.restrantup(navigation.state.params.meal1,navigation.state.params.meal2,navigation.state.params.meal3,navigation.state.params.ok,navigation.state.params.users,navigation.state.params.one,navigation.state.params.rating1,navigation.state.params.two,navigation.state.params.rating2,
           navigation.state.params.three,navigation.state.params.rating3,navigation.state.params.four,navigation.state.params.rating4,navigation.state.params.five,navigation.state.params.rating5,navigation.state.params.six,
         navigation.state.params.rating6,navigation.state.params.seven,navigation.state.params.rating7,navigation.state.params.eight,navigation.state.params.rating8,navigation.state.params.nine,navigation.state.params.rating9,
       navigation.state.params.ten,navigation.state.params.rating10)}>
          <Text style={{fontSize:15}}>傳送</Text>
          </TouchableOpacity>
        ),


    });


  constructor() {
     super();
     this.state={meal1:'',meal2:'',meal3:'',num:'',users:'',bot:'',one:'',two:'',three:'',
       four:'',five:'',six:'',seven:'',eight:'',nine:'',ten:'',ok:'1',
       tomenu1:'',tomenu2:'',tomenu3:'',tomenu4:'',tomenu5:'',tomenu6:'',tomenu7:'',tomenu8:'',tomenu9:'',tomenu10:'',};
     this.localget();
    }
    state = {
   rating1: 0,rating2: 0,rating3: 0,rating4: 0,rating5: 0,rating6: 0,rating7: 0,rating8: 0,rating9: 0,rating10: 0,
 }
    localget(){
      local.get('user','1001').then(ret => {
                 this.setState({users:ret.username,})
                 console.log(this.state.users);
                     }).catch(err => {
                         console.log("error") //拋出的錯誤
                     })
      local.get('restrant','1001').then(ret => {
               this.setState({meal1:ret.meal1,meal2:ret.meal2,meal3:ret.meal3,one:ret.one,two:ret.two,three:ret.three,four:ret.four,five:ret.five,six:ret.six,seven:ret.seven,eight:ret.eight,
                 nine:ret.nine,ten:ret.ten})
                   }).catch(err => {

                       console.log("error1") //拋出的錯誤

                   })
      local.get('menu','1001').then(ret => {
        var i;
        this.setState({num:ret.length})
        console.log("1:",this.state.num);
            for(i = 0; i < this.state.num; i++){
              if(this.state.one == ret[i].storename){
                this.setState({tomenu1:ret[i]})
              }else if(this.state.two == ret[i].storename){
                this.setState({tomenu2:ret[i]})
              }else if(this.state.three == ret[i].storename){
                this.setState({tomenu3:ret[i]})
              }else if(this.state.four == ret[i].storename){
                this.setState({tomenu4:ret[i]})
              }else if(this.state.five == ret[i].storename){
                this.setState({tomenu5:ret[i]})
              }else if(this.state.six == ret[i].storename){
                this.setState({tomenu6:ret[i]})
              }else if(this.state.seven == ret[i].storename){
                this.setState({tomenu7:ret[i]})
              }else if(this.state.eight == ret[i].storename){
                this.setState({tomenu8:ret[i]})
              }else if(this.state.nine == ret[i].storename){
                this.setState({tomenu9:ret[i]})
              }else if(this.state.ten == ret[i].storename){
                this.setState({tomenu10:ret[i]})
              }
            }

          }).catch(err => {
           console.log("error") //拋出的錯誤
         })
   }
   handleRating1 = (rating1) => {
     this.setState({rating1},()=>{
       this.props.navigation.setParams({rating1:this.state.rating1,one:this.state.one,users:this.state.users,ok:this.state.ok});
     });
  }
  handleRating2 = (rating2) => {
    this.setState({rating2},()=>{
      this.props.navigation.setParams({rating2:this.state.rating2,two:this.state.two,meal1:this.state.meal1,meal2:this.state.meal2,meal3:this.state.meal3});
    });
 }
   handleRating3 = (rating3) => {
     this.setState({rating3},()=>{
       this.props.navigation.setParams({rating3:this.state.rating3,three:this.state.three});
     });
  }
  handleRating4 = (rating4) => {
    this.setState({rating4},()=>{
      this.props.navigation.setParams({rating4:this.state.rating4,four:this.state.four});
    });
  }
  handleRating5 = (rating5) => {
    this.setState({rating5},()=>{
      this.props.navigation.setParams({rating5:this.state.rating5,five:this.state.five});
    });
  }
  handleRating6 = (rating6) => {
    this.setState({rating6},()=>{
      this.props.navigation.setParams({rating6:this.state.rating6,six:this.state.six});
    });
  }
  handleRating7 = (rating7) => {
    this.setState({rating7},()=>{
      this.props.navigation.setParams({rating7:this.state.rating7,seven:this.state.seven});
    });
  }
  handleRating8 = (rating8) => {
    this.setState({rating8},()=>{
      this.props.navigation.setParams({rating8:this.state.rating8,eight:this.state.eight});
    });
  }
  handleRating9 = (rating9) => {
    this.setState({rating9},()=>{
      this.props.navigation.setParams({rating9:this.state.rating9,nine:this.state.nine});
    });
  }
  handleRating10 = (rating10) => {
    this.setState({rating10},()=>{
      this.props.navigation.setParams({rating10:this.state.rating10,ten:this.state.ten});
    });
  }
  btn(){
    Alert.alert(
    '提示',
    "成功", [{
        text: '確定',
    }]);
  }
  componentDidMount () {
    this.props.navigation.setParams({ restrantup: this.updatebotassess })
  }


updatebotassess = (meal1,meal2,meal3,ok,users,one,rating1,two,rating2,three,rating3,four,rating4,five,rating5,six,rating6,seven,rating7,eight,rating8,nine,rating9,ten,rating10) => {

        this.setState({ loading: false, disabled: false,}, () =>
        {
            fetch('http://120.108.111.85/~foodie/botassess.php',
        {
            method: 'POST',
                headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    'ok':ok,
                    'username': users,
                    'one': one,
                    'oneass': rating1,
                    'two': two,
                    'twoass': rating2,
                    'three': three,
                    'threeass': rating3,
                    'four': four,
                    'fourass': rating4,
                    'five': five,
                    'fiveass': rating5,
                    'six': six,
                    'sixass': rating6,
                    'seven': seven,
                    'sevenass': rating7,
                    'eight': eight,
                    'eightass': rating8,
                    'nine': nine,
                    'nineass': rating9,
                    'ten': ten,
                    'tenass': rating10,
                    'meal1': meal1,
                    'meal2': meal2,
                    'meal3': meal3,
                })

        }).then((response) => response.text()).then((responseJson) =>
        {
          console.log(responseJson)
          console.log(ok)
          if(responseJson=="請登入"){
            Alert.alert(
            '提示',
            "登入後評論", [{
                text: '確定',
                onPress: () =>this.props.navigation.navigate('login')
            }]);
          }else if (responseJson=="空白") {
            Alert.alert(
            '提示',
            "請輸入全部店家評價", [{
                text: '確定',
            }]);
          }else if(responseJson=="重複"){
            Alert.alert(
            '提示',
            "已評論過，謝謝😇", [{
                text: '確定',
            }]);
          }else {
            if(responseJson=="新增成功"){
              console.log(meal1);
              Alert.alert(
              '提示',
              "評分成功", [{
                  text: '確定',
              }]);
              this.props.navigation.setParams({ok:'2'});
            }else {
              Alert.alert(
              '提示',
              "評分失敗", [{
                  text: '確定',
              }]);
            }
          }

    }).catch((error) =>
        {
            console.error(error);
    });
    });

}

  render(){
     return(

       <ImageBackground source={require('./icon/back.jpg')} style={{width: viewwidth, height: viewheight-50}}>
         <View style = { styles.container }>
           <ScrollView>
              <View>
                <View style = {styles.block}>
                  <View style={styles.tab}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('tosearchend',{search:this.state.tomenu1})}
                    style={styles.btn}>
                      <Text style={styles.word}>✨{this.state.one}</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <SwipeableRating
                    rating={this.state.rating1}
                    size={20}
                    gap={4}
                    minRating={1}
                    maxRating={5}
                    color={'rgba(94,121,166,1)'}
                    emptyColor={'rgba(94,121,166,1)'}
                    onPress={this.handleRating1}
                    xOffset={viewwidth-144}
                    />
                  </View>
                </View>
                <View style = {styles.block}>
                  <View style={styles.tab}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('tosearchend',{search:this.state.tomenu2})}
                    style={styles.btn}
                    >
                      <Text style={styles.word}>✨{this.state.two}</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <SwipeableRating
                    rating={this.state.rating2}
                    size={20}
                    gap={4}
                    minRating={1}
                    maxRating={5}
                    color={'rgba(94,121,166,1)'}
                    emptyColor={'rgba(94,121,166,1)'}
                    onPress={this.handleRating2}
                    xOffset={viewwidth-144}
                    />
                  </View>
                </View>
                <View style = {styles.block}>
                  <View style={styles.tab}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('tosearchend',{search:this.state.tomenu3})}
                    style={styles.btn}
                    >
                      <Text style={styles.word}>✨{this.state.three}</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <SwipeableRating
                    rating={this.state.rating3}
                    size={20}
                    gap={4}
                    minRating={1}
                    maxRating={5}
                    color={'rgba(94,121,166,1)'}
                    emptyColor={'rgba(94,121,166,1)'}
                    onPress={this.handleRating3}
                    xOffset={viewwidth-144}
                    />
                  </View>
                </View>
                <View style = {styles.block}>
                  <View style={styles.tab}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('tosearchend',{search:this.state.tomenu4})}
                    style={styles.btn}
                    >
                      <Text style={styles.word}>✨{this.state.four}</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <SwipeableRating
                    rating={this.state.rating4}
                    size={20}
                    gap={4}
                    minRating={1}
                    maxRating={5}
                    color={'rgba(94,121,166,1)'}
                    emptyColor={'rgba(94,121,166,1)'}
                    onPress={this.handleRating4}
                    xOffset={viewwidth-144}
                    />
                  </View>
                </View>
                <View style = {styles.block}>
                  <View style={styles.tab}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('tosearchend',{search:this.state.tomenu5})}
                    style={styles.btn}
                    >
                      <Text style={styles.word}>✨{this.state.five}</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <SwipeableRating
                    rating={this.state.rating5}
                    size={20}
                    gap={4}
                    minRating={1}
                    maxRating={5}
                    color={'rgba(94,121,166,1)'}
                    emptyColor={'rgba(94,121,166,1)'}
                    onPress={this.handleRating5}
                    xOffset={viewwidth-144}
                    />
                  </View>
                </View>
                <View style = {styles.block}>
                  <View style={styles.tab}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('tosearchend',{search:this.state.tomenu6})}
                    style={styles.btn}
                    >
                      <Text style={styles.word}>✨{this.state.six}</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <SwipeableRating
                    rating={this.state.rating6}
                    size={20}
                    gap={4}
                    minRating={1}
                    maxRating={5}
                    color={'rgba(94,121,166,1)'}
                    emptyColor={'rgba(94,121,166,1)'}
                    onPress={this.handleRating6}
                    xOffset={viewwidth-144}
                    />
                  </View>
                </View>
                <View style = {styles.block}>
                  <View style={styles.tab}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('tosearchend',{search:this.state.tomenu7})}
                    style={styles.btn}
                    >
                      <Text style={styles.word}>✨{this.state.seven}</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <SwipeableRating
                    rating={this.state.rating7}
                    size={20}
                    gap={4}
                    minRating={1}
                    maxRating={5}
                    color={'rgba(94,121,166,1)'}
                    emptyColor={'rgba(94,121,166,1)'}
                    onPress={this.handleRating7}
                    xOffset={viewwidth-144}
                    />
                  </View>
                </View>
                <View style = {styles.block}>
                  <View style={styles.tab}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('tosearchend',{search:this.state.tomenu8})}
                    style={styles.btn}>
                      <Text style={styles.word}>✨{this.state.eight}</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <SwipeableRating
                    rating={this.state.rating8}
                    size={20}
                    gap={4}
                    minRating={1}
                    maxRating={5}
                    color={'rgba(94,121,166,1)'}
                    emptyColor={'rgba(94,121,166,1)'}
                    onPress={this.handleRating8}
                    xOffset={viewwidth-144}
                    />
                  </View>
                </View>
                <View style = {styles.block}>
                  <View style={styles.tab}>
                  <TouchableOpacity
                  onPress={()=>this.props.navigation.navigate('tosearchend',{search:this.state.tomenu9})}
                  style={styles.btn}
                  >
                    <Text style={styles.word}>✨{this.state.nine}</Text>
                  </TouchableOpacity>
                  </View>
                  <View>
                    <SwipeableRating
                    rating={this.state.rating9}
                    size={20}
                    gap={4}
                    minRating={1}
                    maxRating={5}
                    color={'rgba(94,121,166,1)'}
                    emptyColor={'rgba(94,121,166,1)'}
                    onPress={this.handleRating9}
                    xOffset={viewwidth-144}
                    />
                  </View>
                </View>
                <View style = {styles.block}>
                  <View style={styles.tab}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('tosearchend',{search:this.state.tomenu10})}
                    style={styles.btn}
                    >
                      <Text style={styles.word}>✨{this.state.ten}</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <SwipeableRating
                    rating={this.state.rating10}
                    size={20}
                    gap={4}
                    minRating={1}
                    maxRating={5}
                    color={'rgba(94,121,166,1)'}
                    emptyColor={'rgba(94,121,166,1)'}
                    onPress={this.handleRating10}
                    xOffset={viewwidth-144}
                    />
                  </View>
                </View>
                <View>
                  <Text> </Text>
                </View>
              </View>
            </ScrollView>
         </View>
        </ImageBackground>
         );
     }

 }

 const styles = StyleSheet.create({

     container: {
         flex: 1,
         padding: 10,
     },
     block:{
       backgroundColor: "palegreen",
       borderRadius: 15,
       margin:10,
       padding:5,
       opacity:0.8,
       borderColor:"white",
       borderWidth:5,
       flexDirection: 'row',
       justifyContent: 'space-between',
     },
     word:{
       fontSize:20,
     },
     star:{
       fontSize:50,
     },
     tab:{
       width: viewwidth*0.5,
     },
     btn:{
       backgroundColor:'rgba(178,178,178,0)',
     },
 });


 // skip this line if using Create React Native App
 AppRegistry.registerComponent('Bot', () => Bot);
