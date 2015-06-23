App.OptionsService = Em.Service.extend({
 song:Em.inject.service(),
 ls:function(){}.property(), 
  clear(){
		this.get('centerView').clearRect(0,0,1400,300)
  },
  load(){},
  save(){
    var selected = this.get('song.selected');
    var song = JSON.stringify(this.get('song.score'));
    var storage = JSON.parse(localStorage.songs);
    
    storage[selected] = song
    localStorage.songs= JSON.stringify(storage) 
console.log('saved')
  },
	actionNames:[
	 {	name:	"load",		type:"core"	},
	 {	name:	"save",		type:"core"	},
	 {	name:	"onLine",	type:"check",class:"slideThree"},
	 {	name:	"clear",	type:"core"},
	 {	name:	"isFaded",	type:"check",class:"slideThree"},
	 {	name:	"isCleared",type:"check",class:"slideThree"},
	 {	name:	"noteType",	type:"check",class:"slideThree"}
	],


})
