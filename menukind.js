import React,{Components} from 'react';
import {Alert} from 'react-native';
import Geocode from 'react-geocode';
//120.108.111.85

var TakeMenu = {
	menukind(){
	 return fetch("http://120.108.111.85/~foodie/menuget.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'

		},

	}).then((response) => {return response.json();}).catch((error) => {
		return "123";
		//console.error(error);
	});

},

storedata(data){
	//console.log(data);
	 return  fetch("http://120.108.111.85/~foodie/assessget.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',

		},
		 body: JSON.stringify({
		 			'username':data.username,
		 			'password':data.password,
                    'storename':data.storename,
                })
	}).then((response) => {
		return response.json()}).catch((error) => {
		return error;

	});

},
storecomment(data){
	//console.log(data);
	 return  fetch("http://120.108.111.85/~foodie/assessget2.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',

		},
		 body: JSON.stringify({
                    'storename':data.storename,
                })
	}).then((response) => {
		return response.json()}).catch((error) => {
		return error;
		//console.error(error);
	});

},
storecommentinsert(store,user,star,mind){
	 return  fetch("http://120.108.111.85/~foodie/assessinsert.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',

		},
		 body: JSON.stringify({
                    'storename':store,
                    'username':user,
                    'star':star,
                    'mind':mind,
                })
	}).then((response) => {
		return response.json()}).catch((error) => {
		return error;
		//console.error(error);
	});

},
favorite(store,user,type){
	 return  fetch("http://120.108.111.85/~foodie/favorite.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',

		},
		 body: JSON.stringify({
                    'storename':store,
                    'username':user,
                    'type':type,
                })
	}).then((response) => {
		return response.json()}).catch((error) => {
		return error;
		//console.error(error);
	});
},
recommend(){
	 return  fetch("http://120.108.111.85/~foodie/recommend.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',

		},

	}).then((response) => {
		return response.json()}).catch((error) => {
		return error;
		//console.error(error);
	});
},
meal(store){
	 return  fetch("http://120.108.111.85/~foodie/getmeal.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',

		},
			 body: JSON.stringify({
                    'storename':store,
                })
	}).then((response) => {
		return response.json()}).catch((error) => {
		return error;
		//console.error(error);
	});
},
getallmeal(){
	 return  fetch("http://120.108.111.85/~foodie/getallmeal.php", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',

		},
	}).then((response) => {
		return response.json()}).catch((error) => {
		return error;
		//console.error(error);
	});
},
mapdata(address){
	Geocode.setApiKey('AIzaSyB5rHbKcLF_XW_U00SNle7OkEN6TC9VPGk');
	return Geocode.fromAddress(address).then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    return {lat:lat,lng: lng};
  },
  error => {
    return 0;
  }
)
}

}
module.exports=TakeMenu;
