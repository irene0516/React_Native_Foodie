import menu from'./menukind.js';
var text="中式麵";
var allmenu;
var menukind=[];
var firstkind=[];

function getmeal(str){
  var meal=[];
    return menu.getallmeal().then((response) => {
    allmenu=response;
    console.log(response);
    /*========================================================================================================================*/
/*========================================店菜單的搜尋===========================================================*/

     var qRegExp = /\S+/g;
    var no=str.match(qRegExp);
    var boo=true;
   for(let j=0;j<allmenu.length;j++){
    for(let k=0;k<no.length;k++){
       searchstring =new RegExp("\w?"+no[k]+"\w?","g");
       for(let i=0;i<allmenu[j].meal.length;i++){
     if(searchstring.test(allmenu[j].meal[i])==true&&!(meal.includes(allmenu[j].storename))){
         meal.push(allmenu[j].storename);
     }
       } 

    }
   }


//console.log(meal);
  return meal;
/*========================================================================================================================*/
   })
}
function getsearch(str){
   var name=[];
   var kind=[];
   return menu.menukind().then((response) => {
   allmenu=response;
/*========================================================================================================================*/
/*========================================店名稱的搜尋===========================================================*/

     var qRegExp = /\S+/g;
    var no=str.match(qRegExp);
    var boo=true;
   for(let j=0;j<allmenu.length;j++){
    for(let k=0;k<no.length;k++){
       searchstring =new RegExp("\w?"+no[k]+"\w?","g"); 
     if(searchstring.test(allmenu[j].storename)==true){
         name.push(allmenu[j].storename);
     }
    }
   }


//console.log(name);

/*========================================================================================================================*/
/*========================================種類的搜尋===========================================================*/
   for(let i=0;i<allmenu.length;i++){

    if(!(menukind.includes(allmenu[i].storekind.trim()))&&allmenu[i].storekind.trim()!=""){
      menukind.push(allmenu[i].storekind.trim());
    }
        if(!(menukind.includes(allmenu[i].storekind1.trim()))&&allmenu[i].storekind1.trim()!=""){
      menukind.push(allmenu[i].storekind1.trim());
    }
        if(!(menukind.includes(allmenu[i].storekind2.trim()))&&allmenu[i].storekind2.trim()!=""){
      menukind.push(allmenu[i].storekind2.trim());
    }
        if(!(menukind.includes(allmenu[i].storekind3.trim()))&&allmenu[i].storekind3.trim()!=""){
      menukind.push(allmenu[i].storekind3.trim());
    }
        if(!(menukind.includes(allmenu[i].storekind4.trim()))&&allmenu[i].storekind4.trim()!=""){
      menukind.push(allmenu[i].storekind4.trim());
    }
        if(!(menukind.includes(allmenu[i].storekind5.trim()))&&allmenu[i].storekind5.trim()!=""){
      menukind.push(allmenu[i].storekind5.trim());
    }
        if(!(menukind.includes(allmenu[i].storekind6.trim()))&&allmenu[i].storekind6.trim()!=""){
      menukind.push(allmenu[i].storekind6.trim());
    }
   }
   var qRegExp = /\S+/g;
    var no=str.match(qRegExp);
    
    var boo=true;
   for(let j=0;j<menukind.length;j++){
    for(let k=0;k<no.length;k++){
        console.log(no[k]);
       //searchstring =new RegExp("\w?"+menukind[j]+"\w?","g"); 
       searchstring =new RegExp("^"+menukind[j]+"$","g"); 
      // console.log(searchstring);
     if(searchstring.test(no[k])==true&&!(kind.includes(menukind[j]))){
         kind.push(menukind[j]);

     }
    }
 
   }
     // console.log(kind);
/*========================================================================================================================*/
/*========================================================================================================================*/
search={name:name,kind:kind};
//console.log(search);
return search;

   })
}
export  async function secondsearch(str) {
  var tosearch=[];
  var name=[];
  var kind=[];
  var meal=[];

  await getsearch(str).then((response) => {
    name=response.name;
    kind=response.kind;
  })
  await getmeal(str).then((response) => {
    meal=response;
  })
  tosearch={name,kind,meal};
 return tosearch;

} 

