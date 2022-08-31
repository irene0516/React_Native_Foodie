
/*------------------------搜尋餐廳列表---------------------------*/
import React from 'react';
import local from'./DeviceStorage.js';
import tosearch from'./ToSearch.js';
import TakeMenu from'./menukind.js';
import {secondsearch} from'./regular.js';
import Geolocation from '@react-native-community/geolocation';
import {Dimensions,AppRegistry,StyleSheet,Button,
    Text,View,Image,ImageBackground,StatusBar,SectionList,
    TouchableWithoutFeedback,TextInput,ScrollView,Animated,Easing,
    PixelRatio,TouchableOpacity,FlatList,Keyboard
} from 'react-native';
//import { CheckBox } from 'react-native-elements';
import { withNavigation } from "react-navigation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
    var Dimenions = require('Dimensions');
 //let {width, height} = Dimensions.get('window');
    var viewwidth = Dimenions.get('window').width;
    var viewheight = Dimenions.get('window').height;
     console.log('通过Dimensions得到的宽度：' +viewwidth);
   //  console.log('通过Dimensions得到的高度：' + height);
     var isSelected;
     var show='rgba(0,0,0,0.5)';
    var hide=false;
class App extends React.Component {

   static navigationOptions = ({ navigation }) => ({
        tabBarLabel: '搜尋',
       //tabBarVisible: false,
        tabBarIcon: ({ tintColor,focused }) => {
        return(   <Image
                source={focused ? require('./icon/all.png') : require('./icon/all.png')}
                style={{ width: 26, height: 26, tintColor: tintColor }}
            />);
        },
     tabBarVisible: (navigation.state.params && navigation.state.params.tabBarVisible) == false?false:true,
     /*tabBarOptions: {
      style: {
        height:0,
      },

       indicatorStyle: { height: 0 }, //android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
     }*/
  });

    constructor(props,image) {

       super(props);
       this.animatedValue = new Animated.Value(0);
       this.havefocus=true;
       this.usertrue=false;
       this.state = ({
            hidden: true,
            currentAlpha: 0,
            inputText: '',
            searchHistory:[],
            show:false,
            showview:true,
            menukind: [],
            isSelected: false,
            selectedIds:[],
            isChecked:true,
            username:0,
            password:0,
            hide:false,
            storedata:[],
            searchheight:true,
            indeterminate: true,
            showmenu:false,
            opacity: 1,textAlign_name:'center',display_name: 'none',text: ''})
            this.sectionSource2=[{title:"熱門類別",data:[{name:"全部",re:require('./menukind/white.jpg')},{name:"詳細類別",re:require('./menukind/white.jpg')},{name:"中式",re:require('./menukind/chinesefood.jpg')},{name:"吐司",re:require('./menukind/Toast.jpg')},{name:"麵",re:require('./menukind/pasta.jpg')},{name:"飯",re:require('./menukind/rice.jpg')},{name:"早餐",re:require('./menukind/breakfast.jpg')},{name:"漢堡",re:require('./menukind/Burger.jpg')},{name:"飲料",re:require('./menukind/COLDDRINK2.jpg')},{name:"炸物",re:require('./menukind/FRY.jpg')}]}];
            this.searchkind=["吐司","中式","麵","飯","炒飯","水餃","鍋貼","湯","早餐","漢堡","速食","泰式","點心","炸物","鍋燒","義式","炒飯","飲料","燒烤","日式","韓式"];
     }
  componentWillUnmount() {
         this.focusListener.remove();
    }
  componentDidMount() {
    const { navigation } = this.props;
   local.get('menu','1001').then(ret => {
      this.tomenukind=ret;
        }).catch(err => {
          console.log("error") //拋出的錯誤
        })

      this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      // Call any action
         this.props.navigation.setParams({tabBarVisible:true}); 
       this.setState({
          selectedIds:[],
          hide:false
       })
        this.state.menukind.map(v => {
          TakeMenu.storedata({storename:v.storename,username:0,password:0}).then((response) => {
        if (response!="無評論") {
          if(v.star[0].star !==response[0].star){
            var menukind = [...this.state.menukind];
          var index = menukind.findIndex(obj => obj.storename == v.storename);
          menukind[index].star = response;
          this.setState({menukind});

          }
        }
       })
    })

          local.get("searchHistory").then(ret=>{
            if(ret==null){
                this.setState({
                  menukind:this.tomenukind,
                    searchHistory:[],
                })
            }else{
                this.setState({
                  menukind:this.tomenukind,
                  searchHistory:ret,
                })
            }
          })
    });
  }

    //搜尋框動畫
     Animate() {
      if(this.havefocus==false){
        this.setState({
            currentAlpha:0,
            opacity: 1,
              inputText: '',
        },()=>{
           Animated.timing(
            this.animatedValue,
            {
                toValue: this.state.currentAlpha,
                duration: 300,
                easing: Easing.linear
            }

        ).start();
        });
      }else{
         this.setState({
            currentAlpha:1,
            opacity: 1
        },()=>{
           Animated.timing(
            this.animatedValue,
            {
                toValue: this.state.currentAlpha,
                duration: 300,
                easing: Easing.linear
            }
        ).start();
        });
      }
    }

    //保存歷史紀錄
    insertSearch(insertdata){
        secondsearch(insertdata).then((response) => {
           this.props.navigation.navigate('tosearch',{menukind:response,str:insertdata,menuresult:this.state.menukind});
           this.hideList();
        });

      if(insertdata!=""){
        if(this.state.searchHistory.indexOf(insertdata)!=-1){
            //本地歷史已經有搜索內容
            let index=this.state.searchHistory.indexOf(insertdata);
            let tempArr = local.arrDelete(this.state.searchHistory,index,1)
            tempArr.unshift(insertdata);
            local.set("searchHistory","",tempArr,'1000*60*24');
        }else{
            //本地歷史沒有搜索內容
            let tempArr=this.state.searchHistory;
            tempArr.unshift(insertdata);
            local.set("searchHistory","",tempArr,'1000*60*24');
        }
       }
       this.setState({
        searchheight:true,
       })
    }
    //隐藏自动提示列表
    hideList(text){
      let intersection=[];
      this.state.selectedIds.map(v => {
        this.sectionSource2[0].data.map(a => {
          if(a.name==v){
              intersection.push(v);
            }
          })
        return intersection})
    this.setState({
      selectedIds :intersection,
      show: false,
      showview:true,
      showmenu:false,
      text: text
    },()=>{
      if(this.state.show==false){
           this.havefocus=false;
      //this.hideList();
      this.Animate();
    }
       if(this.state.selectedIds.length==0){
        this.props.navigation.setParams({tabBarVisible:true});
         this.setState({
              hide:false
            })
       }
    });
    }
    //提示文字消失
    _Opacity(text) {

        this.setState({
          show: text!="" ? true : false,
          showview:text!="" ? false : true,
            inputText: text,
            opacity: 0
        },()=>{
          if(this.state.show==true){
            this.props.navigation.setParams({tabBarVisible:false});
          }else{
             this.props.navigation.setParams({tabBarVisible:true});
          }
        });
    }

     //textinput的鍵盤點擊事件
         searchProducts = (e) => {
           console.log(e.nativeEvent.key);
      if(e.nativeEvent.key == "Enter"){
      this.insertSearch(this.state.inputText);
       this.props.navigation.navigate('tosearch',{menukind:{kind:this.state.inputText}});
      }
    }

    //textinput的失焦事件
    Blur(){
    console.log(this.state.show);
    if(this.state.show==false){
     this.havefocus=false;
      //this.hideList();
      this.Animate();
      }
    }
    //textinput的焦點事件
    focus(){
      this.havefocus=true;
      this.Animate();

    }
    //圖片複選框
    _handleImagePress = (id,type) => {
      console.log(type);
      if(this.state.selectedIds.includes(id)) {
        this.props.navigation.setParams({tabBarVisible :false});
        let newSelectedIds=this.state.selectedIds.filter(function(item, index, array) {
          return item !==id
        });
        this.setState({selectedIds : newSelectedIds},()=>{
           if(this.state.selectedIds.length==0){
            if(type==1){
               this.props.navigation.setParams({tabBarVisible:true});
            }
            this.setState({
              hide:false
            })
            }else{
              this.props.navigation.setParams({tabBarVisible:false});
              this.setState({
              hide:true
            })
              }
        });
      } else {
          this.props.navigation.setParams({tabBarVisible:false});

        let newSelectedIds = [...this.state.selectedIds, id];
        this.setState({selectedIds : newSelectedIds,hide:true});
      }
    }

    //菜單類型
     menukind(){
      return(
          <SectionList
          keyboardShouldPersistTaps='always'
          renderItem={(info)=>{return(<View></View>);}}
          renderSectionHeader={this._renderSectionHeader}
          sections={this.sectionSource2}
          keyExtractor = {this._extraUniqueKey}
          />
          );
    }
    _renderSectionHeader=(item)=>{
        return(
            <View style={{backgroundColor:'rgba(210,197,205,0.5)', justifyContent:'center',alignItems:'center',paddingTop:20,paddingBottom:30}}>
                <FlatList
                    data={item.section.data}
                    renderItem={this._flatrender}
                    extraData={this.state}
                    keyExtractor={this._extraUniqueKey}
                    numColumns={2}
                >
                </FlatList>
            </View>
        );
    }
    _flatrender=({item,index})=>{
                         isSelected = this.state.selectedIds.includes(item.name);
                         if(isSelected){
                          show='rgba(100,100,100,0.5)';
                         }else{
                          show='rgba(0,0,0,0.5)';
                         }
        return (
         <View style={{backgroundColor: index%2==0 ?'white':'rgba(193,130,169,0.5)',
                    justifyContent:'center',
                    alignItems:'center',
                    width:viewwidth/2.5,marginBottom:20,marginLeft:index%2==0 ?0:20,marginTop:20}}>
                    {item.name=="全部"||item.name=="詳細類別"? <TouchableOpacity
                     activeOpacity={0.75}
      onPress={() => {
        if(item.name=="全部"){
          this.props.navigation.navigate('tosearch',{menukind:{kind:["全部"]},menuresult:this.state.menukind})
        }else{
            //this.props.navigation.navigate('showmenu')
            this.Showmenu();
        }
        }}
      onLongPress={() => {this.props.navigation.navigate('tosearch',{menukind:{kind:["全部"]},menuresult:this.state.menukind});}}
    >

      <View style={{position:'relative',backgroundColor:'rgba(0,0,0,0.3)',width:viewwidth/2.5,height:120,resizeMode:'cover'}}>
            <Text style={{ fontSize:24,
        lineHeight:120,justifyContent:'center',height:120,textAlign:'center',width:viewwidth/2.5,color:'white',backgroundColor:show}}>{item.name}
           </Text>
            </View>
                 </TouchableOpacity>: <TouchableOpacity
                     activeOpacity={0.75}
      onPress={() => {this._handleImagePress(item.name,1)}}
    >

      <ImageBackground key={item.name} source={item.re} style={{position:'relative',width:viewwidth/2.5,height:120,resizeMode:'cover'}}>
            <Text style={{ fontSize:24,
        lineHeight:120,height:120,justifyContent:'center',textAlign:'center',width:viewwidth/2.5,color:'white',backgroundColor:show}}>{item.name}
           </Text>
            </ImageBackground>
             { isSelected && <MaterialIcons name = {'check-box'}  style={{position:'absolute',top:0,right:0,fontSize:30,backgroundColor:'white'}}
             />
         }</TouchableOpacity>}
        </View>
        );
      }
     //sectionlist消除黃色警告
    _extraUniqueKey(item ,index){
      return "index"+index+item;
      }
    Showmenu(){
       this.props.navigation.setParams({tabBarVisible:false});
       this.sectionSource=[
      {
        title:"詳細類別",
        data:this.searchkind
      }
    ];
      this.setState({showmenu:true})
    }
    ShowList(){
    if(this.state.searchHistory!=""){
     this.sectionSource=[
      {title:"搜尋紀錄",
        data:this.state.searchHistory
      }
    ];
     return  <SectionList
      keyboardShouldPersistTaps='always'
      renderItem={(data)=>{
       if(data.index>=15&&this.state.searchheight==true){
          this.height=0;
          this.height2=0;
        }else{
          this.height=40;
          this.height2=20;
        }

        isSelected = this.state.selectedIds.includes(data.item);

            return(
              <View>

            <View style={{height:this.height}}>
             <TouchableOpacity
                     activeOpacity={0.75}

      onPress={() => {
        this.insertSearch(data.item);}}
    >
          <View style={{flexDirection:'row',padding:5}}>

             <View style={{justifyContent:'center',alignItems: 'center',marginRight:5}}>
          <AntDesign name = {'clockcircleo'}  style={{textAlign:'center',fontSize:15,color:'gray',width:20,lineHeight:20,height:this.height2}}/>
         </View>
          <Text style={{color:'black',fontSize:20}}>{data.item}</Text>
          </View>
          <View style={styles.separatorStyle}></View>
           </TouchableOpacity>
        </View>
        {data.index==14&&this.state.searchHistory.length!=15&&this.state.searchheight==true? <TouchableOpacity onPress={()=>{this.setState({searchheight:false})}}style={{alignItems: 'center',justifyContent:'center',width:this.state.viewwidth,height:50}}><View style={{width:200,height:50}}><Text style={{textAlign:'center',lineHeight:50,color:'gray',fontSize:20}}>load more ...</Text></View></TouchableOpacity>:(data.index==data.section.data.length-1&&this.state.searchheight==false?<TouchableOpacity onPress={()=>{this.setState({searchheight:true})}}style={{alignItems: 'center',justifyContent:'center',width:this.state.viewwidth,height:50,marginBottom:20}}><View style={{width:200,height:50}}><Text style={{textAlign:'center',lineHeight:50,color:'gray',fontSize:20}}>收起</Text></View></TouchableOpacity>:null)}
        </View>
        )

      }}
      renderSectionHeader={({section: {title}}) => (<Text style={{backgroundColor:'gray',color:'white',fontSize:23,padding:5}}>{title}</Text>)}
      sections={this.sectionSource}

      keyExtractor = {this._extraUniqueKey}
      />
  }else{
    return(
      <View style={{width:viewwidth,height:viewheight-80,justifyContent:'center',alignItems: 'center'}}>
      <Text style={{color:'gray',fontSize:20}}>無搜尋紀錄</Text>
      </View>
      )
    }


                }
    render() {
      const ViewWidth = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [viewwidth * 0.9, viewwidth * 0.8]
        });
        const Opacity = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });
        const marginLeft = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [viewwidth * 0.3, viewwidth * 0.1]
        });
   if(this.state.showmenu==true){
      return(
      <View style={{flex:1}}>
      <ScrollView>
    <SectionList
      keyboardShouldPersistTaps='always'
      renderItem={(data)=>{

        isSelected = this.state.selectedIds.includes(data.item);
        return(
              <View>
              <TouchableOpacity
                 activeOpacity={0.75}
      onPress={() => {this._handleImagePress(data.item)}}
    >
          <View style={{flexDirection:'row',padding:5}}>
           <View style={{justifyContent:'center',alignItems: 'center',marginRight:5}}>
          <AntDesign name = {'search1'}  style={{textAlign:'center',fontSize:15,color:'gray',width:20,lineHeight:20}}/>
          </View>
          <Text style={{color:'black',fontSize:20}}>{data.item}</Text>
          { isSelected && <MaterialIcons name = {'check'}  style={{position:'absolute',top:2,right:10,fontSize:30,backgroundColor:'white'}}

             />

         }

          </View >
           <View style={styles.separatorStyle}></View>
           </TouchableOpacity>
              </View>)

      }}
      renderSectionHeader={({section: {title}}) => (
        <View style={{backgroundColor:'gray',height:120}}>

           <TouchableWithoutFeedback onPress={() =>{this.hideList();this.setState({showmenu:false})}}>
    <FontAwesome name = {'angle-left'}  style={{padding:10,fontSize:30,color:'white',width:30,height:50}}/>
    </TouchableWithoutFeedback>
    <View style={{justifyContent: 'center',width:viewwidth,alignItems: 'center'}}>
        <Text style={{color:'white',fontSize:23}}>{title}</Text>
        </View>
        </View>
        )}
      sections={this.sectionSource}

      keyExtractor = {this._extraUniqueKey}
      />
      </ScrollView>
        {
        this.state.hide==true?
        <View>
         <TouchableOpacity style={{justifyContent: 'center',flexDirection:'row',alignItems: 'center',backgroundColor:'white',borderWidth:4,borderStyle:'dashed',borderRadius:1,borderColor:'gray',width:viewwidth,height:50}}  onPress={()=> {
                this.props.navigation.navigate('tosearch',{menukind:{kind:this.state.selectedIds},menuresult:this.state.menukind});
                this.hideList();
                }}>
         <Text style={{fontSize:20,color:'rgb(218,172,201)', fontWeight: 'bold',marginRight:10}}>送出</Text>
         <AntDesign name = {'rightcircle'}  style={{fontSize:20,color:'rgb(218,172,201)',backgroundColor:'white'}} />
         </TouchableOpacity>
        </View>:null
      }
      </View>);
   }else{
        return (

            <View style={styles.searchContainer}>
            <View style={{justifyContent: 'center',alignItems: 'center',}}>
                <View style={styles.search}>
                    <TouchableOpacity onPress={()=>{this.refs.textInput.blur();this.hideList();}} style={styles.image}>
                        <Animated.Text style={{
                            opacity: Opacity
                        }}>取消</Animated.Text>
                    </TouchableOpacity>
                    <Animated.View
                        style={{
                            height: 35,
                            width: ViewWidth,
                            backgroundColor: '#efefef',
                            position: 'absolute',
                            top: 0,
                            borderRadius: 10,
                            left: viewwidth*0.05,
                        }}
                    />
                    <TextInput style={styles.inputs}
                               onFocus={this.focus.bind(this)}
                                onBlur={this.Blur.bind(this)}
                               underlineColorAndroid='transparent'
                               // placeholder= "请输入搜索关键字"
                               ref="textInput"
                               onEndEditing={()=>{this.setState({inputText:""})}}
                               onChangeText={
                                this._Opacity.bind(this)}
                               onSubmitEditing={()=>{this.insertSearch(this.state.inputText);}}
                               //onKeyPress={this.searchProducts.bind(this)}
                               value={this.state.inputText}
                    />
                    <TouchableOpacity style={styles.ProText} onPress={()=>{this.refs.textInput.focus();}}>
                        <Animated.Text style={{
                            left: marginLeft,
                            opacity: this.state.opacity
                        }}>
                            請輸入搜索關鍵字
                        </Animated.Text>
                    </TouchableOpacity>
            </View>
            </View>
            {this.state.show==true?
               <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'
               onScroll={() => {
                Keyboard.dismiss()
              }}
               >
              <View style={styles.list}>
              {this.ShowList()}
              </View>
              </ScrollView>
            :null
            }
          <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'
          onScroll={() => {
            Keyboard.dismiss()
          }}>
           {this.state.showview?
          <View>
        {this.menukind()}
        </View>
         :null
       }
        </ScrollView>
         {
        this.state.hide==true?
        <View>
         <TouchableOpacity style={{justifyContent: 'center',flexDirection:'row',alignItems: 'center',marginBottom:15,backgroundColor:'white',borderWidth:4,borderStyle:'dashed',borderRadius:1,borderColor:'gray',width:viewwidth,height:50}}  onPress={()=> {
                this.props.navigation.navigate('tosearch',{menukind:{kind:this.state.selectedIds},menuresult:this.state.menukind});
                this.hideList();
                }}>
         <Text style={{fontSize:20,color:'rgb(218,172,201)', fontWeight: 'bold',marginRight:10}}>送出</Text>
         <AntDesign name = {'rightcircle'}  style={{fontSize:20,color:'rgb(218,172,201)',backgroundColor:'white'}} />
         </TouchableOpacity>
        </View>:null
      }
        </View>
        );
      }
    }
  tryLogin = () => {
    Keyboard.dismiss()
  }
}

/*------------------------CSS---------------------------*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
     searchContainer: {
        flex: 1,
        position: 'relative',
        top: 15
    },
    search: {
        height: 40,
        width: viewwidth,
        position: 'relative',
        top: 0,
        marginBottom:10,
    },
    ProText: {

        width: viewwidth * 0.8,
        position: 'absolute',
        top: 8,
        left: 0,
    },
    image: {
        width: viewwidth * 0.1,
        height: viewwidth * 0.1,
        position: 'absolute',
        top: 10,
        right: viewwidth * 0.035,
    },
    inputs: {
        width: viewwidth * 0.7,
        height:35,
        borderWidth: 1,
        paddingLeft: 5,
        borderColor: '#efefef',
        borderRadius: 4,
        position: 'absolute',
        left: viewwidth * 0.1,
        top:0
    },
  list:{
    marginTop: 5/PixelRatio.get(),
    marginLeft:5,
    marginRight:5,
    //height:200,
    borderColor:'#ccc',
    borderTopWidth: 1/PixelRatio.get(),
  },
  item:{
    fontSize:16,
    padding:5,
    paddingTop:10,
    paddingBottom:10,
    borderWidth: 1/PixelRatio.get(),
    borderColor:'#ddd',
    borderTopWidth:0,
  },
  separatorStyle:{
  backgroundColor:'gray',
  height:1,
  margin:5
  },

});
export default withNavigation(App);
