import React, { Component } from 'react';
import {Text,View,Image,DeviceEventEmitter,ImageBackground,StyleSheet,Alert,TouchableOpacity,ScrollView,Dimensions,Animated,Easing,Platform,findNodeHandle,StatusBar, RefreshControl,TouchableWithoutFeedback} from 'react-native';
import TakeMenu from'./menukind.js';
import local from './DeviceStorage.js';
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import * as Animatable from 'react-native-animatable';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import tvShowContent from './tvshow.js';
import {MagicMoving} from 'react-native-magic-moving';
  var Dimenions = require('Dimensions');
  var viewwidth = Dimenions.get('window').width;
import Geolocation from '@react-native-community/geolocation';
import SwipeableRating from 'react-native-swipeable-rating';
import {Card} from 'react-native-shadow-cards';
import ReadMore from 'react-native-read-more-text';
//import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";
import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/blue";
import { withNavigation } from "react-navigation";
var menukind=[];
 var NavHeight=100;
class app extends React.Component {

 static navigationOptions = ({ navigation }) => ({
 	    header:null, 
  });
 constructor(props) {
var { params } =props.navigation.state;
 	 super(props);
 	this.state=({
      viewwidth:Dimenions.get('window').width,
       showNavTitle: false ,
      storedata:[],
      favorite:[],
      username:0,
      password:0,
        rating: 0,
      isRefresh:false,
      scrollY: new Animated.Value(0),
      viewRef: null,
      imgHeight:250,
     region:'',
     comment:[],
     show:false,
     search:params.search,
 progress: 0,
 search:params.search,
      indeterminate: true,
    })
    menukind=[];
    this.usertrue=false;
   if(params.search!=null){
    if(this.state.search.storekind.length !== 0){
      menukind.push(this.state.search.storekind.trim());
    }
    if(this.state.search.storekind1.length !== 0){
      menukind.push(this.state.search.storekind1.trim());
    }
    if(this.state.search.storekind2.length !== 0){
      menukind.push(this.state.search.storekind2.trim());
    }
    if(this.state.search.storekind3.length !== 0){
      menukind.push(this.state.search.storekind3.trim());
    }
    if(this.state.search.storekind4.length !== 0){
      menukind.push(this.state.search.storekind4.trim());
    }
    if(this.state.search.storekind5.length !== 0){
      menukind.push(this.state.search.storekind5.trim());
    }
    if(this.state.search.storekind6.length !== 0){
      menukind.push(this.state.search.storekind6.trim());
    }}
 }
   componentWillUnmount() {
     this.timer && clearTimeout(this.timer);
        this.subscription.remove();
        this.focusListener.remove();
    };
  componentDidMount() {
    const { navigation } = this.props;
   if(this.state.search!=null){
    TakeMenu.storecomment({storename:this.state.search.storename}).then((response) => {
      console.log(response);
      this.setState({
        comment:response
      })
      })
    TakeMenu.meal(this.state.search.storename).then((response) => {
      console.log(response);
      this.setState({
        meal:response
      });
      })
         this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      // Call any action
        local.get('user','1001').then(ret => {

                      /*console.log(ret.username) //獲取緩存結果*/
    this.setState({
      username:ret.username,
        password:ret.password,
    },()=>{
          TakeMenu.favorite("no",this.state.username,2).then((response) => {
            if(response!="no"&&response!=""&&response!=null){
                 this.setState({
              favorite:response
            },()=>{console.log(response);})
            }
         
    })
    })
        }).catch(err => {

                       console.log("error") //拋出的錯誤
        })
         TakeMenu.storedata({storename:this.state.search.storename,username:0,password:0}).then((response) => {
          let data = Object.assign({}, this.state.search,{
        star:response
          })
           this.setState({
            search:data
           })
        })
  
    });
       this.subscription = DeviceEventEmitter.addListener('addcomment', this.getsearch);
     this.timer = setTimeout(
      () => { this.setState({
         indeterminate: false,
      }) },
      1500
    );
  }
}
  getsearch=(data)=>{
       TakeMenu.storecomment({storename:this.state.search.storename}).then((response) => {
      this.setState({
        comment:response
      })
      })
  }
    handleRating = (rating) => {
    this.setState({rating});
  }
  goback(){

  const { goBack } = this.props.navigation;
    return(
      <TouchableWithoutFeedback onPress={() => goBack()}>
      
    <FontAwesome name = {'angle-left'}  style={{fontSize:30,color:'white',margin:10}}/>
    </TouchableWithoutFeedback>
    )
  }

getstar(star){
    var starlist=[];
    var assess=true;
 
        if(star!="無評論"){
      
      if(star>=0){
          var star=star*10; 
          var boo=true;
        var count=parseInt(star/10);
        for(let i=0;i<5;i++){
          if(i<count){
            starlist.push("yes");
          }else if(star%10!=0&&boo==true){
            boo=false;
              starlist.push("half");
          }else{
            starlist.push("no");
          }
        }
      }
    }else{
      assess=false;
      for(let i=0;i<5;i++){
        starlist.push("no");
      }
    }

    return starlist.map(function (name,index) {     
            var theKey = "key"+index;
            var theKey2 = "key2"+index;
            var theKey3 = "key3"+index;
                return (
                  <View key={theKey} style={{flexDirection:'row'}}>
                  {(name=="yes")&&<FontAwesome name = {'star'}  style={{fontSize:20,color:'rgb(255,224,70)'}}/>}
                  {(name=="half")&&<FontAwesome name = {'star-half-o'}  style={{fontSize:20,color:'rgb(255,224,70)'}}/>}
                  {(name=="no")&&<FontAwesome name = {'star-o'}  style={{fontSize:20,color:'rgb(255,224,70)'}}/>}
                  {(index==starlist.length-1)&&((assess==true)?<Text style={{color:'gray',marginLeft:5}}>({star/10})</Text>:<Text style={{color:'gray',marginLeft:5}}>沒有評論</Text>)}
                  </View>
                );   
            })
    
  
  }



  _renderTruncatedFooter = (handlePress) => {
    return (
      <TouchableOpacity  onPress={()=>{
        this.props.navigation.navigate('searchcomment',{username:this.state.username,storename:this.state.search.storename,search:handlePress,type:2,right:false});}}>
        <Text style={{fontSize:15,color:'rgba(94,121,166,1)'}}>
        Read more
        </Text>
      </TouchableOpacity>
    );
  }
  render() {
     const {scrollY} = this.state
    let translateY
    if (Platform.OS == 'ios') {
      translateY = scrollY.interpolate({
        inputRange: [255 - 64 + 50, 255 + (64 - 50), 255 + (64 - 50)], //241,269,269
        outputRange: [255, 255 - 30, 255 - 30],//255,25
      })
    } else {
      translateY = scrollY.interpolate({
     //inputRange: [45,170,180],  250-NavHeight+70
      //  outputRange: [180,45,45],
       inputRange: [-24,240,250],
       outputRange: [250,-24,-24],
        
      })
    }


    return (
      <View style={{ flex: 1 }}>
      {this.state.show==true?
        <ScrollView>
       <ImageBackground source={require("./icon/catbg.jpg")} style={{width:viewwidth,height:300,resizeMode:'cover'}}>
        <TouchableWithoutFeedback onPress={() =>{this.setState({show:false})}}>
    <FontAwesome name = {'angle-left'}  style={{fontSize:30,color:'black',margin:10}}/>
    </TouchableWithoutFeedback>
    <View style={{width:viewwidth,height:50,justifyContent:'center',alignItems: 'center'}}><Text style={{backgroundColor:'white',height:40,width:150,fontSize:23,textAlign:'center',lineHeight:40}}>{this.showmealkind}</Text></View>
       </ImageBackground>
        
    {typeof(this.showmeal)!='undefined'? this.state.meal[this.showmeal].meal.map(function (name,index) {
  
       return (
        <View key={index} style={{width:viewwidth,height:70,justifyContent:'center',alignItems: 'center'}}>
        {index%2==0? <Text style={{fontSize:20,width:viewwidth-40,height:50,textAlign:'center',lineHeight:50,borderColor:'rgba(242,215,213,1)',borderWidth:4,borderStyle:'dashed',borderRadius:1,}}>{name}</Text>
       : <Text style={{fontSize:20,width:viewwidth-40,height:50,borderColor:'rgba(209,242,235,1)',textAlign:'center',lineHeight:50,borderWidth:4,borderStyle:'dashed',borderRadius:1,}}>{name}</Text>
       }
      </View>
       );
    })
    : null
     }
    </ScrollView>
        : <HeaderImageScrollView
          maxHeight={250}
          minHeight={100}
          maxOverlayOpacity={0.6}
          minOverlayOpacity={0.3}
          fadeOutForeground
          renderHeader={() => <Image source={this.state.search.image} style={styles.image} />}
          renderFixedForeground={() => (
            <View>
            {this.goback()}
              <Animatable.View
              style={{transform: [{translateY: translateY}]}}
              ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}
            >
            <View style={{ justifyContent: 'center',
    alignItems: 'center',}}>
           <Text style={styles.title}>
              <Text style={{ fontWeight: 'bold',color:'white'}}>
        {this.state.search.storename}
        </Text>
        </Text>
        </View>
        </Animatable.View>
        </View>
          )}

 onScroll={
           
            Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])
          }
         
        >
          <TriggeringView
            style={styles.section}
            onBeginHidden={() => this.navTitleView}
            onDisplay={() => this.navTitleView}
          >
          <View style={{ justifyContent: 'center',
    alignItems: 'center',}}>
            <Text style={styles.title}>
              <Text style={styles.name}>{this.state.search.storename}</Text>
            </Text>
            </View>
          </TriggeringView>

 
         <View style={{justifyContent:'center',
    alignItems:'center'}}>
     <View style={{flexDirection:'row',marginTop:10}}>
          {typeof(this.state.search.star)!='undefined'?(this.state.search.star=="無評論"?this.getstar(this.state.search.star):this.getstar(this.state.search.star[0].star)):null}
          </View>
          <View style={{flexDirection:'row',margin:10}}>
    { 
       menukind.map(function (name,index) {
            var theKey = "key"+index;
                return (
                <View key={theKey} style={{backgroundColor:'rgba(211,234,201,1)',borderRadius: 10,margin:5}}>
                <Text style={{lineHeight:15,fontSize:15,margin:5,color:'gray'}}>{name}</Text>
                </View>
                );
            })
    }
 
 
    
    </View>
    <View>
    <View style={{flexDirection:'row',marginTop:20,}}>
    <Entypo name = {'address'}  style={{marginRight:5,fontSize:18,color:'rgb(110,44,0)',alignItems: 'center'}}/>
    <Text style={{fontSize:18,color:'rgb(110,44,0)',}}>{this.state.search.storeaddr}</Text></View>

    {this.state.search.storephone==""?null:  <View style={{flexDirection:'row',marginTop:20,alignItems: 'center'}}>
    <FontAwesome name = {'phone'}  style={{marginRight:10,fontSize:18,color:'rgb(110,44,0)',}}/>
    <Text style={{fontSize:18,color:'rgb(110,44,0)',}}>{this.state.search.storephone}</Text></View>}
    </View>
      </View>

    
     {typeof(this.state.meal)=='undefined'||this.state.meal.length==0?null:
      <View>
      <View style={{flexDirection:'row',marginTop:30,marginBottom:30,justifyContent: 'center',}}>
    <Image style={{width:150,height:30,resizeMode: 'cover',}}source={require('./icon/gress1.png')}/>
    <Text style={{fontSize:20}}>菜單</Text>
     <Image style={{width:150,height:30,resizeMode: 'cover',}}source={require('./icon/gress1.png')}/>
     </View>
     <View style={{width:viewwidth,flexDirection:'row',flexWrap: 'wrap'}}>
     {this.state.meal.map(function (name,index) {
         if(index%2==0){
       return (
      <TouchableOpacity   
      onPress={()=>{
        this.showmeal=index;
        this.showmealkind=name.mealkind;
        this.setState({show:true})}}>
       <ImageBackground   key={index} source={require("./icon/foodbg3.jpg")} style={[styles.cardImage,{resizeMode:'cover',}]}>
       <View style={[styles.cardImage,{backgroundColor:'rgba(242,215,213,0.2)',justifyContent:'center',alignItems: 'center'}]}>
         <Text style={{color:'white',fontSize:20}}>{name.mealkind}</Text>
         </View>
        </ImageBackground>
         </TouchableOpacity>
     
   
     );

    }else{
      return (
        <TouchableOpacity onPress={()=>{
        this.showmeal=index;
        this.showmealkind=name.mealkind;
        this.setState({show:true})}}>
        <ImageBackground key={index} source={require("./icon/foodbg3.jpg")} style={[styles.cardImage,{resizeMode:'cover'}]}>
       <View style={[styles.cardImage,{backgroundColor:'rgba(209,242,235,0.2)',justifyContent:'center',alignItems: 'center'}]}>
         <Text  style={{color:'white',fontSize:20}}>{name.mealkind}</Text>
            </View>
        </ImageBackground>
        </TouchableOpacity>
     
   
     );
    }
     },this)
   }
   </View>
        </View>
   }
 
          
       <View style={{ justifyContent: 'center',
    alignItems: 'center',}}>
       
    
   {typeof(this.state.search.region)!="undefined"?
   <View>
   <View style={{flexDirection:'row',marginTop:30,marginBottom:30,justifyContent: 'center',}}>
    <Image style={{width:150,height:30,resizeMode: 'cover',}}source={require('./icon/gress1.png')}/>
    <Text style={{fontSize:20}}>地圖</Text>
     <Image style={{width:150,height:30,resizeMode: 'cover',}}source={require('./icon/gress1.png')}/>
     </View>  
   <View style={styles.container}>
   <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map2}

       region={{
         latitude:this.state.search.region.lat,
         longitude:this.state.search.region.lng,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     <Marker coordinate={{latitude: this.state.search.region.lat,
  longitude: this.state.search.region.lng,}}>

</Marker>
     </MapView>
     </View></View>
     :null}
   
   </View>
    <View style={{flexDirection:'row',marginTop:30,marginBottom:30,justifyContent: 'center',}}>
    <Image style={{width:150,height:30,resizeMode: 'cover',}}source={require('./icon/gress1.png')}/>
    <Text style={{fontSize:20}}>評論</Text>
     <Image style={{width:150,height:30,resizeMode: 'cover',}}source={require('./icon/gress1.png')}/>
     </View>
    <View style={{flexDirection:'row',justifyContent: 'center',marginBottom:10}}>

     <AwesomeButtonCartman type="anchor" style={{marginRight:30}} onPress={()=>{
      if(this.state.username==0){

         Alert.alert(
                    '提示',
                    "登入後評論", [{
                        text: '確定',
                        onPress: () =>this.props.navigation.navigate('login')
                    }]);
      }else{
           
         this.props.navigation.navigate('searchcomment',{username:this.state.username,storename:this.state.search.storename,right:true});
      }
     }}>我要評論</AwesomeButtonCartman>
       <AwesomeButtonCartman type="anchor" style={{marginRight:30}} onPress={()=>{
      if(this.state.username==0){
         Alert.alert(
                    '提示',
                    "登入後新增至口袋名單", [{
                        text: '確定',
                        onPress: () =>this.props.navigation.navigate('login')
                    }]);
      }else{
         Alert.alert(
                    '提示',
                    "確定新增進口袋名單嗎?", [
                    {
      text: '取消',

      style: 'cancel',
    },{
                        text: '確定',
                        onPress: () =>{
                          if(this.state.favorite.includes(this.state.search.storename)==false){
                        this.state.favorite.push(this.state.search.storename);
                            TakeMenu.favorite(this.state.favorite,this.state.username,1).then((response) => {
                          if(response="新增成功"){
                              Alert.alert(
                      
                    '提示',
                    "新增成功", [{
                        text: '確定',

                    }]);
            

        }else{

              Alert.alert(
                    '提示',
                    "新增失敗", [{
                        text: '確定',

                    }]);
        }
                      })
                      }else{
                             Alert.alert(
                      
                    '提示',
                    "此店家已在口袋名單中", [{
                        text: '確定',

                    }]);
                      }
                    
                        }
                    },],{ cancelable: true });
       
      }
     }}>加入口袋</AwesomeButtonCartman>
    <AwesomeButtonCartman type="anchor"onPress={()=>{
    
      this.props.navigation.navigate('searchcomment',{username:this.state.username,storename:this.state.search.storename,search:this.state.comment,type:1,right:false});}}>全部顯示</AwesomeButtonCartman>
    </View>
   
     {
      this.state.comment!="無評論"?
      
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginLeft:viewwidth*0.15}}>
 
     {this.state.comment.map(function (name,index) {     
            var theKey = "key"+index;
            if(index<=3){
              return (
                 <Card key={theKey} style={{padding: 10, margin: 10,width:viewwidth*0.7,height:200,position:'relative'}}>
                 <Text style={{fontSize:20,marginBottom:10}}>{name.userid}</Text>
                     <View style={{flexDirection:'row',marginBottom:10}}>
          {this.getstar(parseFloat(name.score))}
          </View>
           <ReadMore
           name={name}
            numberOfLines={3}
            onReady={this._handleTextReady}
            renderTruncatedFooter={this._renderTruncatedFooter}
            >
           <Text style={{fontSize:15,color:'gray'}}>{name.mind}</Text>
          </ReadMore>
        

        <Text style={{color:'gray',position:'absolute',bottom:0,fontSize:15,margin:10}}>{name.time}</Text>
      </Card>
   
                );   
              }
            },this)}

        </ScrollView>: <View style={{ justifyContent: 'center',alignItems: 'center',}}>
            <Card style={{padding: 10,margin:10,width:viewwidth*0.7,height:200,justifyContent: 'center',alignItems: 'center'}}>
                 <Text style={{fontSize:20,marginBottom:10}}>此店家無評論</Text>
      </Card>
        </View>

            
   }
      
      

        </HeaderImageScrollView>}
       
      </View>
    );
  }

}

/*------------------------CSS---------------------------*/
const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 80;
const PARALLAX_HEADER_HEIGHT = 250;
const STICKY_HEADER_HEIGHT = 80;

var styles = StyleSheet.create({
  container: {
    
   height: 300,
   width: 400,
  
 },
   cardContainer: {
    width: window.width/2,
  
  },
  cardImage: {
    width: window.width/2,
    height: 100,

  },
 map2: {
    ...StyleSheet.absoluteFillObject,
 },
 
  image: {
    height: 250,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
    color:'black',

  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  keywords: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  keywordContainer: {
    backgroundColor: '#999999',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  keyword: {
    fontSize: 16,
    color: 'white',
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    height: 600,
  },
})
export default withNavigation(app);