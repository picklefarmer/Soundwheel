import Ember from 'ember';

export function initialize(App) {

  App.register('settings:side',Ember.Object.extend({
  	song:Ember.inject.service(),
    menuBars:["left","right","bottom","top","center","middle"],
		datas:Ember.computed({
			get(){
				console.log('fetch panel-data' )
				this.get('data').then(data => this.set('datas',data));
			}
		}),
		data:Ember.computed({
			get(){
				return this.get('song.panels')
				//return $.getJSON('./json/panelsAuth.json',function(err){});
			}
		})
   }));   

	App.register('settings:auth',Ember.Object.extend({
    auth:Ember.inject.service(),
    song:Ember.inject.service(),
    menuBars:["left","right","bottom","top","center","middle"],
		datas:Ember.computed({
			get(){
      	console.log('fetch auth panel-data' )
		    this.get('data').then(data => {
        	console.log(data, "information from settings") 
          this.set('datas',data)
      	});
			}
   	}),
    data:Ember.computed({
			get(){
					//var om = this.get('auth.settings')
         	var om = this.get('song.panels')
            	console.log(om)
	  	  	  	return om
					//return $.getJSON('./json/panelsAuth.json',function(err){       });
			}
		})
 }));   

}


export default {
  name: 'firebase-init',
	before: 'firebase-compile',
  initialize
};
