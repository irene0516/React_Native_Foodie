import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';


const storage=new Storage({

	//最大容量，默認值1000條數據循環儲存
	size:5000,

	//儲存引擎:對於RN使用AsyncStorage，對於web使用window.localStorage
    // 如果不指定則數據只会保存在内存中，重啟後即丢失
	storageBackend:AsyncStorage,

	//數據過期時間，默認一整天(1000*3600*24毫秒)，設為null則永不過期
	defaultExpires:1000*3600*24,
	
	//讀寫在內存中緩存數據，默認啟用
	enableCache:true,
	sync:{

	}

});
var local={

/*
set(data){
	storage.save({
  key: 'loginState', // Note: Do not use underscore("_") in key!
  data: data,
 
  // if expires not specified, the defaultExpires will be applied instead.
  // if set to null, then it will never expire.
  expires: 1000 * 3600
});
},
*/


set(key,id,data,expires){
	console.log(typeof(data));
	if(typeof(data)!="object"){
		var setValue=JSON.stringify(data)
	}
	 
	
	if(id){
		storage.save({
			key:key,
			id:id,
			data:data,
			expires:expires ? expires:null
		})
		
	}
	else{
		storage.save({
			key:key,
			data:data,
			expires:expires ? expires:null
		})
		}
},

get(key,id){

	if(id){
		return storage.load({
			key:key,
			id:id

		}).then(ret =>{
			if(typeof(ret)!="object"){
			return JSON.parse(ret);
		}else{
			return ret;
		}
		}).catch(err=>{
				 return null;
			 
			//throw err;
		})

	}else{
		return storage.load({
			key:key
		}).then(ret=>{
			if(typeof(ret)!="object"){
			return JSON.parse(ret);
		}else{
			return ret;
		}

		}).catch(err=>{
			return null;
			//throw err;
		})
	}

},
remove(key,id){
	if(id){

		storage.remove({
			key:key,
			id:id
		})
	}else{
		storage.remove({
			key:key
		})
	}

},
clearMap(){
	storage.clearMap();
},
clearMapForKey(key){
	storage.clearMapForKey(key)

},
getAllDateForKey(key){
	return storage.getAllDateForKey(key).then(ret=>{
		return ret
	})
},
getIdsForKey(key){
	return storage.getIdsForKey(key).then(ids=>{
		return ids;
	})
},
arrDelete(arr,index,length = 1) {
    let tempArr = arr;
    arr.splice(index, length);
    return tempArr;
},
}
global.storage = storage;
module.exports=local;
