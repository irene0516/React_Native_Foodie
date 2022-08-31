/*------------------------機器選擇---------------------------*/
import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions
} from 'react-native';
import local from'./DeviceStorage.js';
var viewwidth;
let {width, height} = Dimensions.get('window');
viewwidth=viewwidth/width;
viewwidth=width;
viewheight=height;
export default class Choose extends React.Component {
  constructor() {
     super();
     this.state={users:'',loading: false, disabled: false};
     this.localget();
    }
    localget(){
    local.get('user','1001').then(ret => {

                      /*console.log(ret.username) //獲取緩存結果*/
               this.setState({users:ret.username})
               console.log(this.state.users)

                   }).catch(err => {

                       console.log("error") //拋出的錯誤

                   })
   }
   getrobot()
   {
     let meal;
         this.setState({ loading: false, disabled: false,}, () =>
         {
             fetch('http://120.108.111.85/~foodie/bot.php',
         {
             method: 'POST',
                 headers:
             {
                 'Accept': 'application/json',
                 'Content-Type': 'text/html',
             },
             body: JSON.stringify(
                 {
                     'username': this.state.users,
                 })

         }).then((response) => response.json()).then((responseJson) =>{
           console.log(responseJson);
           meal=responseJson;
           console.log(responseJson);
           local.set('restrant','1001',{meal1:meal.meal1,meal2:meal.meal2,meal3:meal.meal3,one:meal.one,two:meal.two,three:meal.three,
             four:meal.four,five:meal.five,six:meal.six,seven:meal.seven,eight:meal.eight,
             nine:meal.nine,ten:meal.ten},'1000*60');
           this.props.navigation.navigate('bot');
           console.log(meal.one);

     }).catch((error) =>
         {
             console.error(error);
     });
     });
     }
    static navigationOptions = {
        tabBarLabel: '吃什麼',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                source={focused ? require('./icon/choose.png') : require('./icon/choose.png')}
                style={{ width: 26, height: 26, tintColor: tintColor }}
            />
        )
    };
    render() {
        return (
          <ImageBackground source={require('./icon/background.jpg')} style={{width: viewwidth, height: viewheight-50}}>
            <View style={styles.button}>
              <Button
                activeOpacity = { 0.8 }
                onPress ={() => this.getrobot()}
                title="幫我推薦"
                color="#FFA488"
              />
            </View>
            </ImageBackground>
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
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});
