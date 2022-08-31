import React from 'react';
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
} from 'react-native';

 let {width, height} = Dimensions.get('window');
     console.log('通过Dimensions得到的宽度：' + width);
     console.log('通过Dimensions得到的高度：' + height);

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
export default class Restaurant extends React.Component{
  _separator = () => {
		return <View style={{height:1, backgroundColor:'#7b7b7b'}}/>
	};
    render() {

      return(
        <View style={styles.container}>
        <ScrollView>

          <FlatList
          data={[
            {title:' 餐廳',
             id:' 菜色',
             intro:' 介紹',
            },
            {title:' 餐廳',
             id:' 菜色',
             intro:' 介紹',
            },
            {title:' 餐廳',
             id:' 菜色',
             intro:' 介紹',
            },
            {title:' 餐廳',
             id:' 菜色',
             intro:' 介紹',
            },
            {title:' 餐廳',
             id:' 菜色',
             intro:' 介紹',
            },
          ]}
  						renderItem={({item}) => <Text style={styles.button}>{'\n'}{item.title}{'\n'}{item.id}{'\n'}{item.intro}{'\n'}</Text>}
  					>

  					</FlatList>


          </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container:{
    flex:5,
    padding:10,
  },
  button:{
    width: width,
    alignItems:'center',
    borderBottomWidth:0.5,
    borderBottomColor:'#4ccbff',
    fontSize:15,
  }
});

AppRegistry.registerComponent('Restaurant', () => MyApps);
