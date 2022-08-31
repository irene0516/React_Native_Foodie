/*------------------------首頁---------------------------*/
import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    Text,
    View,
    Image,
    Dimensions,
Platform,
ScrollView,
TouchableOpacity,
ImageBackground,
Alert
} from 'react-native';
import tosearch from'./ToSearch.js';
import Slideshow from 'react-native-image-slider-show';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import local from'./DeviceStorage.js';
import { withNavigation } from "react-navigation";
const { width: screenWidth } = Dimensions.get('window');
import TakeMenu from'./menukind.js';
const images = [require('./menukind/Toast.jpg'),require("./menukind/Iceproduct.jpg")];
class App extends React.Component {
       static navigationOptions = ({ navigation }) => ({
        tabBarLabel: '首頁',
        tabBarIcon: ({ focused, tintColor }) => (
      
            <Image
                source={focused ? require('./icon/home.png') : require('./icon/home.png')}
                style={{ width: 30, height: 30, tintColor: tintColor }}
            />

        )
   });

     constructor(props) {
    super(props);
    this.state=({
      menu:[],
      username:0,
      password:0,
      menustar:[],
      activeSlide:0,
      position: 0,
      favorite:[],
      recommend:[],
      interval: null,
      indeterminate: true,
      dataSource: [
        {
          title: '胖老爹美式炸雞',
          caption: '胖老爹美式炸雞',
          url:require('./icon/pang.jpg'),
        }, {
          title: 'Title 2',
          caption: '八方雲集',
          url:require('./icon/bafung.jpg'),
        }, {
          title: 'Title 3',
          caption: '大和拉麵製麵所',
          url:require('./icon/dahu.jpg'),
        },
      ],
      rec: [
        {
         
          image: require("./icon/catbg2.jpg"),
          title: "好評推薦"
        }, {
        
          image: require("./icon/catbg2.jpg"),
           title: "小編推薦"
        }, {
        
          image: require("./icon/catbg2.jpg"),
           title: "口袋名單"
        }
      ]
    });
  }
   componentDidMount() {
     const { navigation } = this.props;
    setTimeout(() => {this.scrollView.scrollTo({x: -40}) }, 1) 
    const itemId = navigation.getParam('test');
      itemId.then((response) => {
        local.set('menu','1001',response,null);
        this.setState({
          menu:response,
           interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 3000)
        },()=>{console.log(this.state.menu);})
   
    });
     this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      // Call any action
  this.state.menu.map(v => {
          TakeMenu.storedata({storename:v.storename,username:0,password:0}).then((response) => {
        if (response!="無評論") {
          if(v.star[0].star !==response[0].star){
            var menu = [...this.state.menu]; 
          var index = menu.findIndex(obj => obj.storename == v.storename); 
          menu[index].star = response; 
          this.setState({menu}); 
        
          }
        }
       })
    }) 
 
    });
   this.timer = setTimeout(
      () => { this.setState({
         indeterminate: false,
      }) },
      1500
    );
   }
componentWillUnmount() {
      clearInterval(this.state.interval);
         this.timer && clearTimeout(this.timer);
          this.focusListener.remove();
    }
sortstar(count){
  if(count==0){
         var tomenukind2=this.state.menu.sort(function (a, b) {  
            if(a.star!=="無評論"){
               return a.star[0].star < b.star[0].star ? 1 : -1;
            } 
    });
       this.setState({menustar:tomenukind2.slice(0,10)},()=>{
                  this.props.navigation.navigate('tosearch',{menukind:{kind:[this.kind]},menuresult:this.state.menustar,str:"好評推薦"});
       }); 

  }else if(count==1){
     TakeMenu.recommend().then((response) => {
     
      var tomenukind2=[];
        this.state.menu.map(v => {
       
                response.map(name=>{
                   //console.log(name.storename);
                  if(name.storename==v.storename){
                    tomenukind2.push(v);
                  }

                })
    }) 
       // console.log(tomenukind2);
      this.setState({
        recommend:tomenukind2
      },()=>{
                  this.props.navigation.navigate('tosearch',{menukind:{kind:[this.kind]},menuresult:this.state.recommend,str:"小編推薦"});
       })
     })

  }else if(count==2){
     local.get('user','1001').then(ret => {
if(ret==null){
 Alert.alert(
                    '提示',
                    "請先登入帳號", [{
                        text: '確定',
                        onPress: () =>this.props.navigation.navigate('login')
                    }]);
}else{ this.setState({
      username:ret.username,
        password:ret.password,
    },()=>{
      console.log("aaaaa");
       console.log(typeof(this.state.username));
      if(this.state.username==""){
          Alert.alert(
                    '提示',
                    "請先登入帳號", [{
                        text: '確定',
                        onPress: () =>this.props.navigation.navigate('login')
                    }]);
      }else{

         TakeMenu.favorite("no",this.state.username,2).then((response) => {
        
            console.log(response);
            if(response!="no"&&response!=""&&response!=null){

              var tomenukind2=[];
              this.state.menu.map(v => {
       
                response.map(name=>{
   
                  if(name==v.storename){
                    tomenukind2.push(v);
                  }

                })
    }) 
                 this.setState({
              favorite:tomenukind2
            },()=>{
                  this.props.navigation.navigate('tosearch',{menukind:{kind:[this.kind]},menuresult:this.state.favorite,str:"口袋名單"});
       })
            }else{
              this.props.navigation.navigate('tosearch',{menukind:{kind:[this.kind]},menuresult:this.state.favorite,str:"口袋名單"});
            }
         
    })
      }
           
    })}
                    /*console.log(ret.username) //獲取緩存結果*/
   
        }).catch(err => {

                       console.log("error") //拋出的錯誤
        })
   
  }

   
}

    render() {
    
        return (
        
              <View style={{flex:1,backgroundColor:'rgba(210,197,205,0.5)'}}>
            
              
              <Image
              style={{height:200,width:screenWidth,resizeMode:'cover',}}
              source={require("./icon/bg6.jpg")}  
              />
   
              
                <ScrollView>
            <View >
           
            <Slideshow 
     height={300}
        dataSource={this.state.dataSource}
        position={this.state.position}
        titleStyle={{height:0}}
        captionStyle={{color:'black',fontSize:20,backgroundColor:'rgba(255,255,255,0.5)',padding:5,borderRadius:5}}
       // indicatorSelectedColor={'rgba(50,100,50,1)'}
        onPositionChanged={position => this.setState({ position })} />
<View>
              {this.state.indeterminate==true? <OrientationLoadingOverlay
          visible={true}
          >
          <View>
            <Image
              source={require('./icon/loading-cat.gif')}
              />
          </View>
        </OrientationLoadingOverlay>:null}
           </View> 
            <ScrollView 
        ref={(scrollView) => { this.scrollView = scrollView; }}
        style={{marginTop:20}}
        //pagingEnabled={true}
        horizontal= {true}
        decelerationRate={0}
        snapToInterval={ screenWidth -110}
        snapToAlignment={"center"}
        showsHorizontalScrollIndicator={false}
        contentInset={{
          top: 0,
          left: 30,
          bottom: 0,
          right: 30,
        }}>
      
  {    // Call any action
  typeof(this.state.rec)!='undefined'?
  this.state.rec.map(function (name,index) {  
            var theKey = "key"+index;
                return (
                  <View style={{flexDirection:'row',}} key={theKey}>
                  {index==0?<View style={{marginLeft:60}} />:null}
                   <TouchableOpacity style={{ margin:20,}}  
                   onPress={() => {
                  this.kind=name.title;
                this.sortstar(index);
          
                   }}>
                   <ImageBackground source={name.image} imageStyle = {{borderRadius:8}} style={[styles.titleviewtest]}>
         <Text style={styles.titleview}>{name.title}</Text>
        </ImageBackground>
         </TouchableOpacity>
          {index==2?<View style={{marginRight:60}} />:null}
         </View>
  
                );  
            },this) :null
          }
      </ScrollView>
        </View>
     
          
    
        </ScrollView>

          </View>
        );
    }
}
const styles = StyleSheet.create({
titleview:{
  position:'absolute',
  bottom:0,
  backgroundColor:'rgba(0,0,0,0.8)',
width: screenWidth - 150,
height:80,
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
  textAlign:'center',
  lineHeight:80,
  color:'white',
  fontSize:20
},
 titleviewtest:{
  position:'relative',
  resizeMode:'cover',

    width: screenWidth - 150,
    height:150,
shadowColor: "#000",
shadowOffset: {
  width: 0,
  height: 2,
},shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4,

    borderRadius: 8,

  justifyContent: 'center',
        alignItems: 'center',
},

titleview2:{
  position:'absolute',
  bottom:0,
  backgroundColor:'rgba(0,0,0,0.8)',
  width:screenWidth-150,
  height:80,
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
  justifyContent: 'center',
        alignItems: 'center',
},
title:{
  textAlign:'center',
  color:'white',
  fontSize:20,
},

});

const iconArrowRight = function (iconHeight) {
  return {
     borderRightWidth: 0,
     borderLeftWidth: iconHeight*75/100,
     borderRightColor: 'transparent',
     borderLeftColor: 'white',
  };
}
const iconArrowLeft = function (iconHeight) {
  return {
     borderRightWidth: iconHeight*75/100,
     borderLeftWidth: 0,
     borderRightColor: 'white',
     borderLeftColor: 'transparent',
  };
}
export default withNavigation(App);