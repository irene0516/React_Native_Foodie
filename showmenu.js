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
DeviceEventEmitter,
SectionList
} from 'react-native';
import local from'./DeviceStorage.js';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

    var Dimenions = require('Dimensions');
  var viewwidth = Dimenions.get('window').width;
export default class showmenu extends React.Component {
constructor(props) {
  super(props);
    this.sectionSource=[{title:"熱門類別",data:["吐司","中式","麵","飯","炒飯","水餃","鍋貼","湯","早餐","漢堡","速食","泰式","點心","炸物","鍋燒","義式","炒飯","飲料店","燒烤","日式","韓式"]}];
    this.state=({
          isSelected: false,
             hide:false,
            selectedIds:[],
          })      
   //this.searchkind=["吐司","中式","麵","飯","炒飯","水餃","鍋貼","湯","早餐","漢堡","速食","泰式","點心","炸物","鍋燒","義式","炒飯","飲料店","燒烤","日式","韓式"];
   /* this.sectionSource=[
      {title:"搜尋紀錄",
        data:this.state.searchHistory
      },{
        title:"熱門類別",
        data:this.searchkind
      }
    ] */
}
 componentDidMount() {
    const { navigation } = this.props;
    local.get('menu','1001').then(ret => {
      this.setState({
          menukind:ret,
        })}).catch(err => {
          console.log("error") //拋出的錯誤
        })

}
 _handleImagePress = (id) => {
      if(this.state.selectedIds.includes(id)) {
      
        let newSelectedIds=this.state.selectedIds.filter(function(item, index, array) {
          return item !==id
        });
        this.setState({selectedIds : newSelectedIds},()=>{
           console.log(this.state.selectedIds.length);
           if(this.state.selectedIds.length==0){
            this.setState({
              hide:false
            })
            }else{
              this.setState({
              hide:true
            })
              }

        });
        
           
      } else {
        
    
        let newSelectedIds = [...this.state.selectedIds, id];
        this.setState({selectedIds : newSelectedIds,hide:true});
      }
    }
       _extraUniqueKey(item ,index){
      return "index"+index+item;
      }  
render(){
  console.log(this.state.hide);
  return( 
     <View style={{ flex: 1 }}>
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
      renderSectionHeader={({section: {title}}) => (<Text style={{backgroundColor:'gray',color:'white',fontSize:23,padding:5}}>{title}</Text>)}
      sections={this.sectionSource}
     
      keyExtractor = {this._extraUniqueKey}
      />
      </ScrollView>
  
       {
        this.state.hide==true?
        <View>
         <TouchableOpacity style={{justifyContent: 'center',flexDirection:'row',alignItems: 'center',marginBottom:10,backgroundColor:'white',borderWidth:4,borderStyle:'dashed',borderRadius:1,borderColor:'gray',width:viewwidth,height:50}}  onPress={()=> {       
                this.props.navigation.navigate('tosearch',{menukind:{kind:this.state.selectedIds},menuresult:this.state.menukind});
            
                }}>
         <Text style={{fontSize:20,color:'rgb(218,172,201)', fontWeight: 'bold',marginRight:10}}>送出</Text>
         <AntDesign name = {'rightcircle'}  style={{fontSize:20,color:'rgb(218,172,201)',backgroundColor:'white'}} />
         </TouchableOpacity>
        </View>:null
      }
     
      </View>
      )
}
}
/*------------------------CSS---------------------------*/
const styles = StyleSheet.create({

  separatorStyle:{
  backgroundColor:'gray',
  height:1,
  margin:5
  },

});
