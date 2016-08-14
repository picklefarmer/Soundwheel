import Ember from 'ember';

export default Ember.Service.extend({

	song:Ember.inject.service(),

	clear(){
		this.get('centerView').clearRect(0,0,1400,300)
	},
  new(){
    console.log('new')
  },
	save(){
    	console.log('saving',this.get('song.selected.selection'),this.get('song.selected.content'))
    	try{
    		let selected = this.get('song.selected.selection'),
    		    song = JSON.stringify(this.get('song.selected.content'));
        if(!localStorage.songs){
          localStorage.songs = "{}"
        }

    		let storage = JSON.parse(localStorage.songs);
      console.log('storage is current', storage) 
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
	 //{	name:	"onLine",	type:"check-option",class:"slideThree"},
	 //{	name:	"clear",	type:"core-option"},
	 //{	name:	"isFaded",	type:"check-option",class:"slideTwo"},
	 //{	name:	"isCleared",type:"check-option",class:"slideTwo"},
	 //{	name:	"noteType",	type:"check-option",class:"slideTwo"}
	]

});
