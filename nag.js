import React from 'react';
import Search from './search.js';
import Home from'./home.js';
import User from'./user.js';
import Choose from'./choose.js';
import local from'./DeviceStorage.js';
import TakeMenu from'./menukind.js';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
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
    TextInput,
    ScrollView,
    Animated,
    Easing,

} from 'react-native';
import {Transitioner, createBottomTabNavigator, createAppContainer,createStackNavigator,createMaterialTopTabNavigator } from 'react-navigation';


/*------------------------CSS---------------------------*/
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
   


 

});


const Take = {
 async getmenu(){
  local.remove('menu','1001');
      this.showimage={2:require('./menuimg/ba-fang-yun-ji/menu.jpg'),3:require('./menuimg/dao-di-yueh-nan-siao-chih/menu.jpg'),4:require('./menuimg/jhe-yi-jian/menu.jpg'),5:require('./menuimg/chiao-le-chen-fang/menu.jpg'),6:require('./menuimg/pang-lao-dieh-mei-shih-jha-ji/menu.jpg'),7:require('./menuimg/jha-chieh-fan/menu.jpg'),8:require('./menuimg/chiao-yi-chu-fang/menu.jpg'),10:require('./menuimg/hong-ma-yi-shao-kao/menu.jpg'),
      12:require('./menuimg/san-da-dou-hua-tian-pin-wu/menu.jpg'),15:require('./menuimg/tai-yueh-siang-ji-pai/menu.jpg'),18:require('./menuimg/chiou-ben-shou-sih/menu.jpg'),21:require('./menuimg/jhu-siao-di-san-ming-jhih/menu.jpg'),24:require('./menuimg/dan-da-lao-jhang-niou-rou-mian/menu.jpg'),25:require('./menuimg/mandy-mei-shih-tsan-ting/menu.jpg'),27:require('./menuimg/yi-hun-la-mian/menu.jpg'),28:require('./menuimg/li-jhih-wu-rih-shih-shih-tang/menu.jpg'),
      33:require('./menuimg/jhu-yeh-rih-ben-liao-li-_-wu-fong-dian-_/menu.jpg'),37:require('./menuimg/sha-shih-fu-tang-bao/menu.jpg')};
      this.menukind=[];
     await TakeMenu.menukind().then((response) => {

        this.menukind=response;

        var count=[];
        var countimg=Object.keys(this.showimage);

   
     // console.log(this.state.menukind);
     
 
    //local.set('menu','1001',this.menukind,'1000*60');
    })
           for(let i=0;i<this.menukind.length;i++){
          await TakeMenu.storedata({storename:this.menukind[i].storename,username:0,password:0}).then((response) => {
         this.menukind[i].star=response;
          })
          TakeMenu.mapdata(this.menukind[i].storeaddr).then((response) => {
           this.menukind[i].region=response;
           
          })
        if(typeof(this.showimage[i+1])!="undefined"){
          this.menukind[i].image=this.showimage[i+1];
        }else{
         
           this.menukind[i].image=require('./menuimg/menu.jpg');
        }         

      }
      return this.menukind;
}
}
const TabNavigator = createMaterialTopTabNavigator(

{

  Home:{screen:Home},
  All: {
   // screen:
    //createStackNavigator({
    //All: {
  screen: Search,
  //navigationOptions: {
   // header:<LogoTitle/>
 // }}}),
 
navigationOptions:({navigation})=>(
  
{
       tabBarLabel: '搜尋',
       //tabBarVisible: false,
        tabBarIcon: ({ tintColor,focused }) => {
        return(   <Image
                source={focused ? require('./icon/all.png') : require('./icon/all.png')}
                style={{ width: 26, height: 26, tintColor: tintColor }}
            />);
        }
     })
   },
  Choose:{screen:Choose},
  User:{screen:User}
  },
  {
  tabBarOptions: {

      activeTintColor: '#4ccbff',
      inactiveTintColor: '#000',
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
      pressColor: '#D7D6D6',
      pressOpacity: 0.6,
      style: {
          backgroundColor: '#fff',
          paddingBottom: 0,
          borderTopWidth: 0.5,
          borderTopColor: '#4ccbff',
      },
      labelStyle: {
          fontSize: 12,
          margin: 1,

      },
      indicatorStyle: { height: 0 }, //android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了

  },
 initialRouteName: 'Home',
 initialRouteParams: {test:Take.getmenu()},
   swipeEnabled: true,
  gesturesEnabled:true,
  //gestureResponseDistance:{vertical:300},
  tabBarPosition: 'bottom',
  mode:'card',

  lazy: true,
  backBehavior: 'none',
  });
const appNavigator = createStackNavigator({
 Main: {
      screen: TabNavigator,
      navigationOptions: () => ({ 
        
        header: null,   
        gesturesEnabled: true,  
    }),

    },
})
export default AppContainer =createAppContainer(appNavigator);
