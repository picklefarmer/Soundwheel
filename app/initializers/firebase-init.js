export function initialize(App) {

		//default . routes
		
   App.register('login:side',Ember.Object.extend({
        song:Em.inject.service(),
        menuBar:Em.computed({
					get(){
          		return this.get('song.options')
          		return thi$.getJSON("./json/routes.json")
					}
				})
   }));

	 //user . routes

   App.register('login:auth',Ember.Object.extend({
        song:Em.inject.service(),
        menuBar:Em.computed({
			get(){
          		return this.get('song.options')
          		return $.getJSON("./json/routesAuth.json")
			}
		})
   }));

	//default . config
    
  App.register('settings:side',Ember.Object.extend({
  	song:Em.inject.service(),
    menuBars:["left","right","bottom","top","center","middle"],
		datas:Em.computed({
			get(){
				console.log('fetch panel-data' )
				this.get('data').then(data => this.set('datas',data));
			}
		}),
		data:Em.computed({
			get(){
				return this.get('song.panels')
				return $.getJSON('./json/panelsAuth.json',function(err){});
			}
		})
   }));   

	App.register('settings:auth',Ember.Object.extend({
    auth:Em.inject.service(),
    song:Em.inject.service(),
    menuBars:["left","right","bottom","top","center","middle"],
		datas:Em.computed({
			get(){
      	console.log('fetch auth panel-data' )
		    this.get('data').then(data => {
        	console.log(data, "information from settings") 
          this.set('datas',data)
      	});
			}
   	}),
    data:Em.computed({
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
