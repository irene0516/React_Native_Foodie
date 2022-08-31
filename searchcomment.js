/*------------------------機器選擇---------------------------*/
import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    TextInput,
DeviceEventEmitter
} from 'react-native';

import TakeMenu from'./menukind.js';
import local from'./DeviceStorage.js';
import {Card} from 'react-native-shadow-cards';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
  import ViewMoreText from 'react-native-view-more-text';
  import SwipeableRating from 'react-native-swipeable-rating';

    var Dimenions = require('Dimensions');
  var viewwidth = Dimenions.get('window').width;
export default class searchcomment extends React.Component {

 static navigationOptions = ({ navigation }) => ({
        title: '評論',
         headerRight: (
             navigation.state.params && navigation.state.params.right == false?<TouchableOpacity onPress={()=>{
                if(navigation.state.params.username!==''&&navigation.state.params.username!==0){
                     DeviceEventEmitter.emit('right',true);
                     navigation.setParams({right:true})
                }else{
                    Alert.alert(
                    '提示',
                    "登入後評論", [{
                        text: '確定',
                        onPress: () =>navigation.navigate('login')
                    }])

                }
                }}style={{width:30,marginRight:10}}>
            <Entypo name = {'plus'}  style={{fontSize:25}}/>
            </TouchableOpacity>:<TouchableOpacity onPress={()=>{
                navigation.setParams({right:true});
                TakeMenu.storecommentinsert(navigation.state.params.storename.trim(),navigation.state.params.username,navigation.state.params.rating,navigation.state.params.text).then((response) => {
                            if(response="新增成功"){

     DeviceEventEmitter.emit('addcomment', 'test');
     navigation.goBack();


        }else{

              Alert.alert(
                    '提示',
                    "新增失敗", [{
                        text: '確定',

                    }]);
        }
    });
            }}style={{width:50,marginRight:10}}>
            <Text style={{fontSize:15}}>傳送</Text>
            </TouchableOpacity>
    ),
    });
     constructor(props) {
     super(props);
        this.state=({
        search:[],
         rating: 0,
         insert:false,
   })

 }
 componentWillMount(){

    var { params } = this.props.navigation.state;
    this.type=params.type;
    this.storename=params.storename;
     this.username=params.username;
    this.setState({
        search:params.search,
        right:params.right
    },()=>{
        console.log(this.type);
        console.log(this.state.right);
    })

 }
 componentWillUnmount(){
     this.subscription.remove();
 }
  componentDidMount() {
       this.subscription = DeviceEventEmitter.addListener('right', this.getsearch);
   }
   getsearch=(data)=>{
    this.setState({
           right:data
        });

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
  renderViewMore(onPress){
      return<Text style={{marginBottom:20,marginTop:-20}} onPress={onPress}>View more</Text>

    }
        handleRating = (rating) => {

    this.setState({rating},()=>{
           this.props.navigation.setParams({rating:this.state.rating});
    });
    console.log(this.state.rating);
  }
    renderViewLess(onPress){
      return<Text style={{marginBottom:20,marginTop:-20}} onPress={onPress}>View less</Text>
    }
    render() {
        return (

                   <View style={styles.container}>
            <View style={{backgroundColor:'rgba(233,174,65,1)',justifyContent: 'center',alignItems: 'center',width:viewwidth,height:50}}>
            <Text style={{fontSize:26, color:'white',}}>{this.storename}</Text>
            </View>
            <ScrollView style={{backgroundColor:'rgb(234,224,205)'}}>


<View style={{justifyContent: 'center',alignItems: 'center',}}>


                <View style={{marginTop:30,marginBottom:30}}>
     {
        this.state.search!="無評論"&&this.type==1&&this.state.right==false?
     this.state.search.map(function (name,index) {

              return (
                 <Card style={{padding: 10, margin: 10,width:viewwidth*0.7,minHeight:200,position:'relative'}}>
                 <Text style={{fontSize:20,marginBottom:10}}>{name.userid}</Text>
                     <View style={{flexDirection:'row',marginBottom:10}}>
          {this.getstar(parseFloat(name.score))}
          </View>
          <ViewMoreText
          numberOfLines={3}
          renderViewMore={this.renderViewMore}
          renderViewLess={this.renderViewLess}
          textStyle={{fontSize:15,color:'gray',marginBottom:20}}
        >
           <Text>{name.mind}</Text>
          </ViewMoreText>


        <Text style={{color:'gray',position:'absolute',bottom:0,fontSize:15,margin:10}}>{name.time}</Text>
      </Card>
                );

            },this):this.type==2&&this.state.right==false?<Card style={{padding: 10, margin: 10,width:viewwidth*0.7,minHeight:200,position:'relative'}}>
                 <Text style={{fontSize:20,marginBottom:10}}>{this.state.search.userid}</Text>
                     <View style={{flexDirection:'row',marginBottom:10}}>
          {this.getstar(parseFloat(this.state.search.score))}
          </View>

           <Text style={{fontSize:15,color:'gray',marginBottom:30}}>{this.state.search.mind}</Text>

        <Text style={{color:'gray',position:'absolute',bottom:0,fontSize:15,margin:10}}>{this.state.search.time}</Text>
      </Card>:this.state.right==true?
        <Card style={{padding: 10, margin: 10,width:viewwidth*0.7,minHeight:200,justifyContent: 'center',alignItems: 'center'}}>
             <View style={{borderBottomColor: 'black',borderBottomWidth:2,marginTop:10,marginBottom:10,flexDirection:'row',justifyContent: 'center',alignItems: 'center',paddingHorizontal:10}}>
            <FontAwesome name = {'user-circle-o'}  style={{fontSize:20,color:'black',marginRight:10}}/>
            <Text style={{ fontSize:20}}>{this.username}</Text>
            </View>
      <View style={{marginBottom:10,width:160}}>
        <SwipeableRating
          rating={this.state.rating}
          size={32}
          gap={0}
          allowHalves={true}
          swipeable={true}
          minRating={0.5}
          maxRating={5}
          color={'rgba(94,121,166,1)'}
          emptyColor={'rgba(94,121,166,1)'}
          xOffset={(viewwidth-160)/2}
          onPress={this.handleRating}
        />
      </View>
      <View style={{ width:viewwidth*0.7,borderColor:'gray',borderTopWidth:2,paddingTop:10}}>
      <TextInput
      style={{textAlignVertical: 'top'}}
      placeholder="評論(可留空)"
      placeholderTextColor="grey"
       multiline = {true}
         numberOfLines = {10}
         onChangeText={(text) => this.setState({text},()=>{
            this.props.navigation.setParams({text:this.state.text});
         })}
         value={this.state.text}
                    />
                    </View>

      </Card>
      :<View style={{ justifyContent: 'center',alignItems: 'center',}}>
            <Card style={{padding: 10,margin:10,width:viewwidth*0.7,height:200,justifyContent: 'center',alignItems: 'center'}}>
                 <Text style={{fontSize:20,marginBottom:10}}>此店家無評論</Text>
      </Card>
        </View>


   }
      </View>
      </View>
            </ScrollView>

            </View>


        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 5,

        backgroundColor: '#fff',
    },
     searchContainer: {
        flex: 1,
        position: 'relative',
        top: 30
    },
});
