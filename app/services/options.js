import Ember from 'ember';

export default Ember.Service.extend({

	song:Ember.inject.service(),

	clear(){
		this.get('centerView').clearRect(0,0,1400,300)
	},
	save(){
    	console.log('saving',this.get('song.selected.selection'),this.get('song.selected.content'))
    	try{
    		var selected = this.get('song.selected.selection');
    		var song = JSON.stringify(this.get('song.selected.content'));
    		var storage = JSON.parse(localStorage.songs);
    
    		storage[selected] = song
    		localStorage.songs= JSON.stringify(storage) 
			console.log('saved')
		}catch(e){
		    console.log(e)
  		}
	},

	actionNames:[
	 {	name:	"new",		type:"core-option"	},
	 {	name:	"save",		type:"core-option"	},
	 {	name:	"onLine",	type:"check-option",class:"slideThree"},
	 {	name:	"clear",	type:"core-option"},
	 {	name:	"isFaded",	type:"check-option",class:"slideTwo"},
	 {	name:	"isCleared",type:"check-option",class:"slideTwo"},
	 {	name:	"noteType",	type:"check-option",class:"slideTwo"}
	]

});
