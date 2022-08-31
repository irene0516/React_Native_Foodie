import React, { Component } from 'react';
import {Text,View,Platform,Keyboard,StyleSheet,TouchableOpacity,Image,Animated,Easing,ScrollView,Dimensions,Modal,SectionList,FlatList,TextInput,TouchableWithoutFeedback,} from'react-native';
import TakeMenu from'./menukind.js';
import { Header , withNavigation } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Foundation from "react-native-vector-icons/Foundation";
import AntDesign from "react-native-vector-icons/AntDesign";
import local from'./DeviceStorage.js';
import {secondsearch} from'./regular.js';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import Geolocation from '@react-native-community/geolocation';
   var boo=true,kind;
   var judge=true;
     var Dimenions = require('Dimensions');
    var menukind2=[];
    var searchstring="";
    const myIcon = <FontAwesome name="search" size={25} color="#900" />;
class App extends React.Component {
 static navigationOptions = ({ navigation }) => ({
    //header:null,
   /* headerStyle:{
      height:30
    }
    */
   header: null,
  });

   constructor(props) {
    super(props);
    this.viewheight=new Animated.Value(0);
    this.triangle=new Animated.Value(0);
    this.triangle2=new Animated.Value(0);
    this.triangle3=new Animated.Value(0);
    this.menukind=0;
    this.kind=0;
    this.search=0;
    this.search2menukind=[];
    this.state=({
      show:false,
      viewwidth:Dimenions.get('window').width,
      currentAlpha:0,
      hvalue:0,
      trihvalue:0,
      trihvalue2:0,
      trihvalue3:0,
      searchshow:false,
      menukind2:[],
      results: [],
      searchHistory:[],
      inputText: '',
       selectedIds:[],
       searchheight:true,
      indeterminate: true,
      dropheight:0,
      tomenu:[],
    })
    this.searchkind=["吐司","中式","麵","飯","炒飯","水餃","鍋貼","湯","早餐","漢堡","速食","泰式","點心","炸物","鍋燒","義式","炒飯","飲料店","燒烤","日式","韓式"];
    this.ifsearchkind=true;
	this.indeterminate=true;
 	this.dropheight=0;
 	this.menukind2=[];
 	this.showfavorite=false;
  }

    componentWillUnmount() {
         this.timer && clearTimeout(this.timer);
         this.focusListener.remove();
    }

  componentDidMount() {
  	const { navigation } = this.props;
  	this.Searchmenuget();
  	  Geolocation.getCurrentPosition((info)=>{ 
                this.getcurrentposition=info.coords;
                  for(let i=0;i<this.menuresult.length;i++){
                  
                  if(typeof(this.menuresult[i].region)!='undefined'){
                      this.menuresult[i].distance=Math.sqrt(Math.pow((this.getcurrentposition.latitude-this.menuresult[i].region.lat),2)+Math.pow((this.getcurrentposition.longitude- this.menuresult[i].region.lng),2));
                  }else{
                  	  console.log("no");
                  }
                
                 }
              },(err) => {
    console.log(err);

}, { enableHighAccuracy: true, timeout: 2000, maximumAge: 3600000 });
  	 local.get('menu','1001').then(ret => {
            this.totomenu=ret;
        }).catch(err => {
          console.log("error") //拋出的錯誤
        })   
     this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      // Call any action
          this.state.menukind2.map(v => {
          TakeMenu.storedata({storename:v.menu.storename,username:0,password:0}).then((response) => {
        if (response!="無評論") {
        	if(v.menu.star[0].star !==response[0].star){
        		var menukind2 = [...this.state.menukind2]; 
    			var index = menukind2.findIndex(obj => obj.menu.storename == v.menu.storename); 
    			menukind2[index].menu.star = response; 
    			this.setState({menukind2}); 
        
        	}
        }
       })
    })     
           this.menukind.kind.map((name) => {
            if(this.menukind.kind[0]!=="全部"&&this.menukind.kind[0]!=="好評推薦"&&this.menukind.kind[0]!=="小編推薦"&&this.menukind.kind[0]!=="口袋名單"){
              this.search2menukind.push(name)
       }
           });            //複選框
     local.get("searchHistory").then(ret=>{
            if(ret==null){
                this.setState({
                    searchHistory:[],
                    selectedIds:this.search2menukind,
                    tomenu:this.totomenu,
                })
                 //console.log("ret=null")
            }else{
                this.setState({searchHistory:ret,
                	selectedIds:this.search2menukind,
                	tomenu:this.totomenu

                  
           })
               // console.log("ret is not null")
            } 
    })
    });


      
    this.timer = setTimeout(
      () => { this.setState({
         indeterminate: false,
      }) },
      1500
    );
  }

    /*========================================================================================================================*/
/*========================================   搜尋框動畫       ===========================================================*/
  Animate(){
    this.state.hvalue=this.state.hvalue==0?1:0;
        Animated.timing(
            this.viewheight,
            {
                toValue: this.state.hvalue,
                duration: 300,
                 easing: Easing.linear,
            },
        ).start();

      
    }
    Animatetri(whichtri){
    
      if(whichtri==1){
        this.state.trihvalue=this.state.trihvalue==0?100:0;
        this.state.trihvalue2=0;
        this.state.trihvalue3=0;
        if(this.state.trihvalue==100){
        	  var tomenukind2=this.sortstar();
        	 
        }else{
            var tomenukind2=this.state.menukind2.reverse();
        }
      }else if(whichtri==2){
         this.state.trihvalue2=this.state.trihvalue2==0?100:0;
         this.state.trihvalue=0;
        this.state.trihvalue3=0;
            if(this.state.trihvalue2==100){
           var tomenukind2=this.state.menukind2.sort(function (a, b) {   
            return a.menu.moneytop- b.menu.moneytop; 
    });
          
        }else{
            var tomenukind2=this.state.menukind2.reverse();
        }

      }else if(whichtri==3){
        this.state.trihvalue3=this.state.trihvalue3==0?100:0;
        this.state.trihvalue=0;
        this.state.trihvalue2=0;
                    if(this.state.trihvalue3==100){

           var tomenukind2=this.state.menukind2.sort(function (a, b) {  
           if(typeof(a.menu.region)!='undefined'){
           	 if(a.menu.region!==0){
             
            return a.menu.distance- b.menu.distance;
            }else{
               console.log(a.menu.storename);
            }
           } 
            
    });
          
        }else{
            var tomenukind2=this.state.menukind2.reverse();
        }
      }
            this.setState({
          menukind2:tomenukind2
        })
        Animated.timing(
            this.triangle,
            {
                toValue: this.state.trihvalue,
                duration: 300,
                 easing: Easing.linear,
            },
        ).start();
           Animated.timing(
            this.triangle2,
            {
                toValue: this.state.trihvalue2,
                duration: 300,
                 easing: Easing.linear,
            },
        ).start();
            Animated.timing(
            this.triangle3,
            {
                toValue: this.state.trihvalue3,
                duration: 300,
                 easing: Easing.linear,
            },
        ).start();
    }
    sortstar(){
    	      var sortstar2=this.state.menukind2.sort(function (a, b) {  
            if(a.menu.star!=="無評論"){
               return a.menu.star[0].star < b.menu.star[0].star ? 1 : -1;
            } 
    });
    	      return sortstar2;
    }
  _show(){
     this.menukind2=[];
    this.setState({
      show: this.state.show===true? false : true,
      
    })
    //this.viewheight.setValue(this.state.hvalue);
    this.Animate();
  }
   _Opacity(text) {
        this.setState({
         
            inputText: text,
           
        });
    }


    /*tosearch頁面複選框*/
      _handleImagePress(id){
    if(this.state.selectedIds.includes(id)) {
 this.props.navigation.setParams({tabBarVisible :false});
      let newSelectedIds=this.state.selectedIds.filter(function(item, index, array) {
  return item !==id
  });
      
        //console.log("test",newSelectedIds);
        this.setState({selectedIds : newSelectedIds});

      } else {

        let newSelectedIds = [...this.state.selectedIds, id];

        this.setState({selectedIds : newSelectedIds});
      }
}
      /*增加搜尋紀錄*/
insertSearch(test){
  
  this.ifsearchkind=false;
  secondsearch(test).then((response) => {
 this.props.navigation.setParams({menukind:response,menuresult:this.state.tomenu,str:test});
  this.setState({ selectedIds:[],searchshow:false,searchheight:true},()=>{this.Searchmenuget();});
  });
 
searchstring=test;  

      if(test!=""){
        if(this.state.searchHistory.indexOf(test)!=-1){
            //本地歷史已經有搜索內容
            let index=this.state.searchHistory.indexOf(test);
            let tempArr = local.arrDelete(this.state.searchHistory,index,1)
            tempArr.unshift(test);
            local.set("searchHistory","",tempArr,'1000*60*24');
        }else{
            //本地歷史沒有搜索內容
            let tempArr=this.state.searchHistory;
            tempArr.unshift(test);
            local.set("searchHistory","",tempArr,'1000*60*24');
        } 
       }

    }


      /*========================================================================================================================*/
/*=================================================================================================================================*/
    _extraUniqueKey(item ,index){
      return "index"+index+item;
      }  


    /*========================================================================================================================*/
/*========================================   使用者在複選框勾選的類別      ===========================================================*/
  Searchmenuget(){
   var { params } = this.props.navigation.state;
    this.menuresult=params.menuresult;
   console.log(this.menuresult);
   if(params.menukind!=null){
     this.menukind=params.menukind;

     if(params.str!=null){
      console.log(params.str);
      this.ifsearchkind=false;
      searchstring =params.str;       
     }
     if(this.menukind.kind!=null){ 
      if(this.ifsearchkind==true){
         searchstring ="";
         
        	 for(let i=0;i<this.menukind.kind.length;i++){
        		
        		    if(!(searchstring.includes(this.menukind.kind[i]))) {
        if(i==this.menukind.kind.length-1){
        searchstring = ''.concat(searchstring,this.menukind.kind[i]); 
        }else{
        searchstring = ''.concat(searchstring,this.menukind.kind[i]," "); 
      }
       }
   }

   
     
      }  
    
     }
      this.menu();

                
   }
  }

  menu(){
    this.menukind2=[];

    let menuname=[];    
        if(this.menukind.kind!=null){
         if(this.menukind.kind[0]!=="全部"&&this.menukind.kind[0]!=="好評推薦"&&this.menukind.kind[0]!=="小編推薦"&&this.menukind.kind[0]!=="口袋名單"){
    for(let j=0;j<this.menukind.kind.length;j++){
      let count=0;
     for(let i=0;i<this.menuresult.length;i++){
        kind=this.menukind.kind[j];
        if(this.menuresult[i].storekind.trim()==kind||this.menuresult[i].storekind1.trim()==kind||this.menuresult[i].storekind2.trim()==kind||this.menuresult[i].storekind3.trim()==kind||this.menuresult[i].storekind4.trim()==kind||this.menuresult[i].storekind5.trim()==kind||this.menuresult[i].storekind6.trim()==kind){
          boo=true;
          mkind=[];
          if(!(menuname.includes(this.menuresult[i].storename))){ 
            menuname.push(this.menuresult[i].storename);
            this.menukind2.push({menu:this.menuresult[i],kind:[kind]});
             index=menuname.indexOf(this.menuresult[i].storename);
          }else{
             index=menuname.indexOf(this.menuresult[i].storename);
            this.menukind2[index].kind.push(kind); 
          }
        
      }
      }
    }
       var menukind3=this.menukind2.sort(function (a, b) {   
            return b.kind.length-a.kind.length; 
        })
        this.menukind2=menukind3;
   }else{
  	if(this.menukind.kind[0]=="口袋名單"){
this.showfavorite=true;
}
    for(let i=0;i<this.menuresult.length;i++){
       this.menukind2.push({menu:this.menuresult[i],kind:[kind]});
    }
  }
  }
 
    if(this.menukind.name!=null){
      for(let j=0;j<this.menukind.name.length;j++){
         for(let i=0;i<this.menuresult.length;i++){
          if(this.menuresult[i].storename.trim()==this.menukind.name[j]){
            boo=true;
               if(!(menuname.includes(this.menuresult[i].storename))){ 
                   menuname.unshift(this.menuresult[i].storename);
                 this.menukind2.unshift({menu:this.menuresult[i]});
               }else{
                index=menuname.indexOf(this.menuresult[i].storename);
                 into=this.menukind2[index];
              this.menukind2.splice(index, 1);
                menuname.splice(index,1);
               this.menukind2.unshift(into);
               menuname.unshift(into.menu.storename);
               }
          }
         }
      }
    }
     if(this.menukind.meal!=null){
      for(let j=0;j<this.menukind.meal.length;j++){
         for(let i=0;i<this.menuresult.length;i++){
          if(this.menuresult[i].storename.trim()==this.menukind.meal[j]){
            boo=true;
               if(!(menuname.includes(this.menuresult[i].storename))){ 
                   menuname.unshift(this.menuresult[i].storename);
                 this.menukind2.unshift({menu:this.menuresult[i]});
               }else{
                index=menuname.indexOf(this.menuresult[i].storename);
                 into=this.menukind2[index];
              this.menukind2.splice(index, 1);
                menuname.splice(index,1);
               this.menukind2.unshift(into);
               menuname.unshift(into.menu.storename);
               }
          }
         }
      }
    }
   
    this.setState({
      menukind2:this.menukind2
    })
  }
      /*========================================================================================================================*/
/*======================================== =========================================== ===========================================================*/
  getstar(storedata){ 
    var starlist=[];
    var assess=true;
    if(storedata!="無評論"&&storedata.length!=0){
      
      if(storedata[0].star>=0){
          //console.log(this.state.storedata[0].star);
          var star= storedata[0].star*10;  
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
                  <View key={theKey} style={{flexDirection:'row',}}>
                  {(name=="yes")&&<FontAwesome name = {'star'}  style={{fontSize:20,color:'rgb(255,224,70)'}}/>}
                  {(name=="half")&&<FontAwesome name = {'star-half-o'}  style={{fontSize:20,color:'rgb(255,224,70)'}}/>}
                  {(name=="no")&&<FontAwesome name = {'star-o'}  style={{fontSize:20,color:'rgb(255,224,70)'}}/>}
                  {(index==starlist.length-1)&&((assess==true)?<Text style={{color:'gray',marginLeft:5}}>({star/10})</Text>:<Text style={{color:'gray',marginLeft:5}}>沒有評論</Text>)}
                  </View>
                );   
            })
  }
 getSearch(){
  return(
 <ScrollView style={{marginBottom:50}} keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag' onScroll={() => { 
      Keyboard.dismiss()
  }}>
    <SectionList 
    keyboardShouldPersistTaps='always'
      renderItem={(data)=>{
        //console.log(data.section.data.length);
        if(data.index>=8&&this.state.searchheight==true){
          this.height=0;
          this.height2=0;
        }else{
          this.height=40;
          this.height2=20;
        }
        
        isSelected = this.state.selectedIds.includes(data.item);
        if(data.section.title!="熱門類別"){
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
        {data.index==7&&this.state.searchHistory.length!=8&&this.state.searchheight==true? <TouchableOpacity onPress={()=>{this.setState({searchheight:false})}}style={{alignItems: 'center',justifyContent:'center',width:this.state.viewwidth,height:50}}><View style={{width:200,height:50}}><Text style={{textAlign:'center',lineHeight:50,color:'gray',fontSize:20}}>load more ...</Text></View></TouchableOpacity>:(data.section.title!="熱門類別"&&data.index==data.section.data.length-1&&this.state.searchheight==false?<TouchableOpacity onPress={()=>{this.setState({searchheight:true})}}style={{alignItems: 'center',justifyContent:'center',width:this.state.viewwidth,height:50}}><View style={{width:200,height:50}}><Text style={{textAlign:'center',lineHeight:50,color:'gray',fontSize:20}}>收起</Text></View></TouchableOpacity>:null)}
        </View>
        )
        }else{
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
              </View>
              )
          
        }
       
      }}
      renderSectionHeader={({section: {title}}) => (
    <Text style={{backgroundColor:'gray',color:'white',fontSize:23,padding:5}}>{title}</Text>
      )}
      sections={this.sectionSource2}
      
      ListFooterComponent={()=>{return(<View style={{width:this.state.viewwidth,height:50}}/>)} }
      keyExtractor = {this._extraUniqueKey}
      
      />
       </ScrollView>
      )
 }
  render() {
if(this.state.searchHistory!=""){
     this.sectionSource2=[
      {title:"搜尋紀錄",
        data:this.state.searchHistory
      },{
        title:"熱門類別",
        data:this.searchkind
      }
    ];   }else{
        this.sectionSource2=[
      {
        title:"熱門類別",
        data:this.searchkind
      }
    ];  
    }
   
    const viewHeight = this.viewheight.interpolate({
            inputRange: [0, 1],
            outputRange: [1* 0, 1 * 45]
        });
    const  viewHeight2= this.viewheight.interpolate({
            inputRange: [0, 1],
            outputRange: [1* 0, 1 * 30]
        });
         const triangleAnimation = this.triangle.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '180deg']
        });
           const triangleAnimation2 = this.triangle2.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '180deg']
        });
           const triangleAnimation3 = this.triangle3.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '180deg']
        });
     // this.sectionSource=[
     // {title:"搜尋紀錄",
      //  data:this.menukind[0].storename
      //},
    //];   
    
    if(boo==true){
      //console.log(menukind2.length);
      this.sectionSource=[{title:this.menukind.kind,data:this.state.menukind2}];
    }else{
      this.sectionSource=[{title:"no",data:"no"}];
    }
         const { goBack } = this.props.navigation;
      return (

    <View style={styles.container}>

 {this.state.indeterminate==true? <OrientationLoadingOverlay
          visible={true}
          >
          <View>
            <Image
              source={require('./icon/loading-cat.gif')}
              />
          </View>
        </OrientationLoadingOverlay>:null}
      

        {this.state.searchshow==false?

          <View style={styles.container}>
          
           <View style={{height:Header.HEIGHT+5,width:this.state.viewwidth}}>
           
           <View style={{width:this.state.viewwidth,height:Header.HEIGHT,flexDirection:'row',borderBottomColor:'gray',borderBottomWidth:2,borderStyle:'solid'}}>
      <View style={{fontSize:30,color:'black',width:Header.HEIGHT,lineHeight:Header.HEIGHT,justifyContent:'center'}}>
       <TouchableWithoutFeedback onPress={() => goBack()}>
    <FontAwesome name = {'angle-left'}   style={{textAlign:'center',fontSize:25,color:'black',width:Header.HEIGHT,lineHeight:Header.HEIGHT}}/>
    </TouchableWithoutFeedback>
        </View>
        <FontAwesome name={"search"} style={{textAlign:'right',fontSize:15,width:20,lineHeight:Header.HEIGHT, color:'gray' }}/>
           <TextInput style={{ width:this.state.viewwidth-2*Header.HEIGHT,height:Header.HEIGHT}}
                            placeholder={searchstring}
                              onFocus={
            () =>{ this.setState({searchshow:true});}}
                    />
        </View>

          
     
       
         </View>
         <View style={{flexDirection:'row',height:50}}>
         <TouchableOpacity style={{flexDirection:'row',justifyContent: 'center',width:this.state.viewwidth/3}} onPress={this.Animatetri.bind(this,1)}>
         <Text style={{lineHeight:50}}>好評排行</Text>
         <Animated.Text style={
                        {transform: [
                            {rotate:triangleAnimation},
                           
                        ]}} ><AntDesign name = {'caretdown'}  style={{fontSize:10,color:'black',lineHeight:46}}/></Animated.Text>
         </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'row',justifyContent: 'center',width:this.state.viewwidth/3}}  onPress={this.Animatetri.bind(this,2)}>
         <Text style={{lineHeight:50}}>價格高低</Text>
         <Animated.Text style={
                        {transform: [
                            {rotate:triangleAnimation2},
                           
                        ]}} ><AntDesign name = {'caretdown'}  style={{fontSize:10,color:'black',lineHeight:46}}/></Animated.Text>
         </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'row',justifyContent: 'center',width:this.state.viewwidth/3}}  onPress={this.Animatetri.bind(this,3)}>
         <Text style={{lineHeight:50}}>距離遠近</Text>
         <Animated.Text style={
                        {transform: [
                            {rotate:triangleAnimation3},
                           
                        ]}} ><AntDesign name = {'caretdown'}  style={{fontSize:10,color:'black',lineHeight:46}}/></Animated.Text>
         </TouchableOpacity>
         </View>
   
        <ScrollView style={{backgroundColor:'rgb(234,224,205)'}} >
       <SectionList 
       extraData={this.state.menukind2}
      renderItem={(data)=>{    
        return(
          <View style={{justifyContent: 'center',alignItems: 'center',margin:15}}>
          <TouchableOpacity activeOpacity={0.75} 
          onPress={()=>{this.props.navigation.navigate('tosearchend',{search:data.item.menu});}}
          style={{shadowOpacity: 0.8,
              shadowRadius: 2,elevation:10,backgroundColor:'white',height:250,width:this.state.viewwidth*0.8}}>
               <Image
  
                source={data.item.menu.image}
                style={{height:150,width:this.state.viewwidth*0.8}}
            />
            {boo==true? <Text style={{lineHeight:30,fontSize:20,padding:5,color:'black'}}>{data.item.menu.storename.trim()}</Text>: <Text style={{lineHeight:30,fontSize:20,padding:5,color:'black'}}>{data.section.data}</Text>}
               <View style={{flexDirection:'row'}}>
        {
        	typeof(data.item.menu.star)!='undefined'?this.getstar(data.item.menu.star):null
        	}
        <View style={{marginLeft:10,backgroundColor:'rgba(171,178,185,0.5)',flexDirection:'row',width:60,justifyContent: 'center',alignItems: 'center'}}>
        <MaterialIcons name = {'monetization-on'}  style={{fontSize:15}}/>
        <Text>{data.item.menu.moneybottom}-</Text>
        <Text>{data.item.menu.moneytop}</Text>
        </View>
        </View>
                <View style={{flexDirection:'row',width:this.state.viewwidth*0.8,}}>
              {boo==true&&data.item.kind!=null&&this.menukind.kind[0]!=="全部"&&this.menukind.kind[0]!=="好評推薦"&&this.menukind.kind[0]!=="小編推薦"&&this.menukind.kind[0]!=="口袋名單"?
          data.item.kind.map(function (name,index) {
            var theKey = "key"+index;
                return <Text style={{lineHeight:15,fontSize:15,margin:5,color:'gray'}} key={theKey}>{name}</Text>
            }):null
        }

              </View>

              </TouchableOpacity></View>);
      
      }}
      
      renderSectionHeader={({section: {title}}) => (
        <View style={{height:100,backgroundColor:'rgba(233,174,65,1)',width:this.state.viewwidth}}>
        <View>
        {this.showfavorite==true?<Text style={{ 
        fontWeight: 'bold',
        fontSize:26,
        lineHeight:40,
        color:'white',
        padding:10}}>口袋名單
        </Text>
        	:<Text style={{ 
        fontWeight: 'bold',
        fontSize:26,
        lineHeight:40,
        color:'white',
        padding:10}}>搜尋結果
        </Text>

        }
    
        </View>
        {this.state.menukind2==""?<Text style={{fontSize:20,color:'gray',paddingLeft:10}}>總共0筆資料</Text>:<Text style={{fontSize:20,color:'gray',paddingLeft:10}}>總共{this.state.menukind2.length}筆資料</Text>}
        

</View>


      )}
      sections={this.sectionSource}
      
       
      keyExtractor = {this._extraUniqueKey}
      />
        </ScrollView>
 
 
       

        




          <Animated.View style={{
                           height:viewHeight,
                            width: this.state.viewwidth,
                            backgroundColor: '#efefef',
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                            position:'absolute',
                            top:45
                        }}> 
          <View style={{flexDirection:'row'}}>
          <Animated.View style={{height:viewHeight,justifyContent:'center'}}>
          <Animated.Text style={{height:viewHeight2,width:this.state.viewwidth*0.33,borderRightColor:'gray',borderStyle:'solid',borderRightWidth:2,lineHeight:viewHeight2, textAlign:'center',}}>熱門搜索</Animated.Text>
          </Animated.View>
          <Animated.View style={{height:viewHeight,justifyContent:'center'}}>
          <Animated.Text style={{height:viewHeight2,width:this.state.viewwidth*0.33,borderRightColor:'gray',borderStyle:'solid',borderRightWidth:2,lineHeight:viewHeight2,textAlign:'center',}}>最近熱銷</Animated.Text>
          </Animated.View>
          </View>
          </Animated.View>
          </View>: 
          <View style={{flex:1}}>
          
        <Animatable.View
        animation='flipInY'
        >

      <View style={{width:this.state.viewwidth,height:Header.HEIGHT,flexDirection:'row',borderBottomColor:'gray',borderBottomWidth:2,borderStyle:'solid'}}>
      <View style={{fontSize:25,color:'black',width:Header.HEIGHT,lineHeight:Header.HEIGHT,justifyContent:'center'}}>
      <FontAwesome name = {'search'}  style={{textAlign:'center',fontSize:25,color:'black',width:Header.HEIGHT,lineHeight:Header.HEIGHT}}/>
        </View>
         

           <TextInput style={{ width:this.state.viewwidth-2*Header.HEIGHT,height:Header.HEIGHT}}

                            placeholder={searchstring}
                               autoFocus={true}
                               selectionColor={'black'}
                               onEndEditing={()=>{this.setState({inputText:""})}}
                               onChangeText={this._Opacity.bind(this)}
                              onSubmitEditing={()=> {this.insertSearch(this.state.inputText);}}
                          
                               //onKeyPress={this.searchProducts.bind(this)}
                               value={this.state.inputText}
                    />
          
         <View style={{width:2,height:Header.HEIGHT,justifyContent: 'center',alignItems: 'center'}} >
         <Text style={{width:2,height:Header.HEIGHT/2,borderLeftWidth:2,borderStyle:'solid',borderLeftColor:'black'}}></Text>
         </View>
          <TouchableWithoutFeedback 
          onPress={()=>{this.setState({selectedIds:this.search2menukind,searchshow:false})}}
          >

          <Text style={{width:Header.HEIGHT,height:Header.HEIGHT,lineHeight:Header.HEIGHT,textAlign:'center'}}>取消</Text>
          </TouchableWithoutFeedback>
           
        </View>
        </Animatable.View>

        <Animatable.View
        animation='flipInX'
        style={{backgroundColor:'white'}}
              ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}
             
            >
            <View>
            {this.getSearch()}
          </View>
        </Animatable.View>
        <View style={{position:'absolute',bottom:0,width:this.state.viewwidth,height:50}}>
         <TouchableOpacity style={{justifyContent: 'center',flexDirection:'row',
        alignItems: 'center',backgroundColor:'white',borderWidth:4,borderStyle:'dashed',borderRadius:1,borderColor:'gray',width:this.state.view,height:50}}  
        onPress={()=> {
                  this.props.navigation.setParams({menukind:{kind:this.state.selectedIds},str:null});
                  this.ifsearchkind=true;
                  this.setState({searchshow:false},()=>{this.Searchmenuget();});
                  
                }}>
                
         <Text style={{fontSize:20,color:'rgb(218,172,201)', fontWeight: 'bold',marginRight:10}}>送出</Text>
         <AntDesign name = {'rightcircle'}  style={{fontSize:20,color:'rgb(218,172,201)',backgroundColor:'white'}}
             />
          
             </TouchableOpacity>
                </View>
        </View>
      }
        
     
        </View>
      );
    
  }
}


/*------------------------CSS---------------------------*/
var styles = StyleSheet.create({
   container: {
        backgroundColor: '#fff',
        flex:1,
    },
   separatorStyle:{

  backgroundColor:'gray',
  height:1,
  margin:5
},
})
export default withNavigation(App);