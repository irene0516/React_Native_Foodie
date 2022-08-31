
import React from 'react';
import local from './DeviceStorage.js';
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import { FontAwesome } from '@expo/vector-icons';
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
    TouchableOpacity,
    ScrollView,
    FlatList,
    TodoItem,

} from 'react-native';
 let {width, height} = Dimensions.get('window');
 export default class Comment extends React.Component {
   constructor() {
    super();
    this.state={users:'',usercomment:''};
    this.localget();
   }
   localget(){
   local.get('user','1001').then(ret => {

              this.setState({users:ret.username})
              this.commentget();

                  }).catch(err => {

                      console.log("error") //拋出的錯誤

                  })
  }

  commentget(){
    this.setState({ loading: true, disabled: true}, () =>
    {

            fetch("http://120.108.111.85/~foodie/comment.php", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': this.state.users,
                })
            }).then((response) => response.json()).then((responseJson) => {
              if(responseJson!='無資料'){
                this.setState ({usercomment:responseJson});
              }
              else {
                this.setState({usercomment:'無資料'})
              }
                        });
            }).catch((error) => {
                console.error(error);
            });
          }



   render() {
/*     const star = <FontAwesome name={'star'} solid />;
     const staro = <FontAwesome name={'star-o'} solid />;
     const starhelf = <FontAwesome name={'star-half-o'} solid size={20} color="#FFFF33" />;*/
     const comment = this.state.usercomment;
     console.log(comment);
     const allcomment = []
     if(this.state.usercomment!='無資料'){
       for (let com of comment) {
         if(com.score=='0'){
            allcomment.push(
              <View>
                <View style={styles.container}>
                  <Text style = {styles.textfont}>店家：{com.storename}{'\n'}</Text>
                  <Text style = {styles.textfont}>評分：
                  <Text style = {styles.starcolor}>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  </Text>{'\n'}</Text>
                  <Text style = {styles.textfont}>評價：{com.mind}{'\n'}</Text>
                  <Text style = {styles.textfont}>時間：{com.time}{'\n'}</Text>
                </View>
                <View style={styles.linecenter}>
                  <Text>🍤🍤🍤</Text>
                  </View>
              </View>
          )
          }else if (com.score=='0.5') {
            allcomment.push(
              <View>
                <View style={styles.container}>
                  <Text style = {styles.textfont}>店家：{com.storename}{'\n'}</Text>
                  <Text style = {styles.textfont}>評分：
                  <Text style = {styles.starcolor}>
                  <FontAwesome name = {'star-half-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  </Text>{'\n'}</Text>
                  <Text style = {styles.textfont}>評價：{com.mind}{'\n'}</Text>
                  <Text style = {styles.textfont}>時間：{com.time}{'\n'}</Text>
                </View>
                <View style={styles.linecenter}>
                  <Text>🍤🍤🍤</Text>
                  </View>
              </View>
            )
          }else if (com.score=='1') {
            allcomment.push(
              <View>
                <View style={styles.container}>
                  <Text style = {styles.textfont}>店家：{com.storename}{'\n'}</Text>
                  <Text style = {styles.textfont}>評分：
                  <Text style = {styles.starcolor}>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  </Text>{'\n'}</Text>
                  <Text style = {styles.textfont}>評價：{com.mind}{'\n'}</Text>
                  <Text style = {styles.textfont}>時間：{com.time}{'\n'}</Text>
                </View>
                <View style={styles.linecenter}>
                  <Text>🍤🍤🍤</Text>
                  </View>
              </View>
            )
          }else if (com.score=='1.5') {
            allcomment.push(
              <View>
                <View style={styles.container}>
                  <Text style = {styles.textfont}>店家：{com.storename}{'\n'}</Text>
                  <Text style = {styles.textfont}>評分：
                  <Text style = {styles.starcolor}>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-half-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  </Text>{'\n'}</Text>
                  <Text style = {styles.textfont}>評價：{com.mind}{'\n'}</Text>
                  <Text style = {styles.textfont}>時間：{com.time}{'\n'}</Text>
                </View>
                <View style={styles.linecenter}>
                  <Text>🍤🍤🍤</Text>
                  </View>
              </View>
            )
          }else if (com.score=='2') {
            allcomment.push(
              <View>
                <View style={styles.container}>
                  <Text style = {styles.textfont}>店家：{com.storename}{'\n'}</Text>
                  <Text style = {styles.textfont}>評分：
                  <Text style = {styles.starcolor}>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  </Text>{'\n'}</Text>
                  <Text style = {styles.textfont}>評價：{com.mind}{'\n'}</Text>
                  <Text style = {styles.textfont}>時間：{com.time}{'\n'}</Text>
                  <Text style = {styles.textfont}>時間：{com.time}{'\n'}</Text>
                </View>
                <View style={styles.linecenter}>
                  <Text>🍤🍤🍤</Text>
                  </View>
              </View>
            )
          }else if (com.score=='2.5') {
            allcomment.push(
              <View>
                <View style={styles.container}>
                  <Text style = {styles.textfont}>店家：{com.storename}{'\n'}</Text>
                  <Text style = {styles.textfont}>評分：
                  <Text style = {styles.starcolor}>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-half-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  </Text>{'\n'}</Text>
                  <Text style = {styles.textfont}>評價：{com.mind}{'\n'}</Text>
                  <Text style = {styles.textfont}>時間：{com.time}{'\n'}</Text>
                </View>
                <View style={styles.linecenter}>
                  <Text>🍤🍤🍤</Text>
                  </View>
              </View>
            )
          }else if (com.score=='3') {
            allcomment.push(
              <View>
                <View style={styles.container}>
                  <Text style = {styles.textfont}>店家：{com.storename}{'\n'}</Text>
                  <Text style = {styles.textfont}>評分：
                  <Text style = {styles.starcolor}>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  </Text>{'\n'}</Text>
                  <Text style = {styles.textfont}>評價：{com.mind}{'\n'}</Text>
                  <Text style = {styles.textfont}>時間：{com.time}{'\n'}</Text>
                </View>
                <View style={styles.linecenter}>
                  <Text>🍤🍤🍤</Text>
                  </View>
              </View>
            )
          }else if (com.score=='3.5') {
            allcomment.push(
              <View>
                <View style={styles.container}>
                  <Text style = {styles.textfont}>店家：{com.storename}{'\n'}</Text>
                  <Text style = {styles.textfont}>評分：
                  <Text style = {styles.starcolor}>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-half-o'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  </Text>{'\n'}</Text>
                  <Text style = {styles.textfont}>評價：{com.mind}{'\n'}</Text>
                  <Text style = {styles.textfont}>時間：{com.time}{'\n'}</Text>
                </View>
                <View style={styles.linecenter}>
                  <Text>🍤🍤🍤</Text>
                  </View>
              </View>
            )
          }else if (com.score=='4') {
            allcomment.push(
              <View>
                <View style={styles.container}>
                  <Text style = {styles.textfont}>店家：{com.storename}{'\n'}</Text>
                  <Text style = {styles.textfont}>評分：
                  <Text style = {styles.starcolor}>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-o'}  style={{fontSize:20}}/>
                  </Text>{'\n'}</Text>
                  <Text style = {styles.textfont}>評價：{com.mind}{'\n'}</Text>
                  <Text style = {styles.textfont}>時間：{com.time}{'\n'}</Text>
                </View>
                <View style={styles.linecenter}>
                  <Text>🍤🍤🍤</Text>
                  </View>
              </View>
            )
          }else if (com.score=='4.5') {
            allcomment.push(
              <View>
                <View style={styles.container}>
                  <Text style = {styles.textfont}>店家：{com.storename}{'\n'}</Text>
                  <Text style = {styles.textfont}>評分：
                  <Text style = {styles.starcolor}>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star-half-o'}  style={{fontSize:20}}/>
                  </Text>{'\n'}</Text>
                  <Text style = {styles.textfont}>評價：{com.mind}{'\n'}</Text>
                  <Text style = {styles.textfont}>時間：{com.time}{'\n'}</Text>
                </View>
                <View style={styles.linecenter}>
                  <Text>🍤🍤🍤</Text>
                  </View>
              </View>
            )
          }else if (com.score=='5') {
            allcomment.push(
              <View>
                <View style={styles.container}>
                  <Text style = {styles.textfont}>店家：{com.storename}{'\n'}</Text>
                  <Text style = {styles.textfont}>評分：
                  <Text style = {styles.starcolor}>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  <FontAwesome name = {'star'}  style={{fontSize:20}}/>
                  </Text>{'\n'}</Text>
                  <Text style = {styles.textfont}>評價：{com.mind}{'\n'}</Text>
                  <Text style = {styles.textfont}>時間：{com.time}{'\n'}</Text>
                </View>
                <View style={styles.linecenter}>
                  <Text>🍤🍤🍤</Text>
                  </View>
              </View>
            )
          }
        }
      }
    else {
        allcomment.push(
          <View style={styles.notanycontainer}>
            <Text style = {styles.textfont}>目前無任何評價資料!{'\n'}</Text>
          </View>
        )
      }

       return (
         <View style = {styles.outcontainer}>
           <ScrollView>
             {allcomment}
           </ScrollView>
         </View>
       );
     }
   }
   const styles = StyleSheet.create({

     outcontainer:{
       flex: 3,
       margin: 10,
     },

       container: {
           flex: 3,
           margin:5,
           backgroundColor: '#FFF0F5',
           borderWidth:3,
           borderColor:	'#FFB6C1',
           padding: 10,
       },
       notanycontainer:{
         flex: 1,
         justifyContent: 'space-between',
         alignItems: 'center',
         margin: 20,
       },
       button:{
         width: width,
         alignItems:'center',
         borderBottomWidth:0.5,
         borderBottomColor:'#4ccbff',
         fontSize:15,
       },
       linecenter:{
         textAlign:'center',
         alignItems: 'center',
       },
      textfont:{
        fontSize:20,
      },
      starcolor:{
        color:'orange',
      }

   })


   // skip this line if using Create React Native App
   AppRegistry.registerComponent('Comment', () => Comment);
