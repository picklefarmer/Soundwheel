import Ember from 'ember';
var DEBUG;

export default Ember.Route.extend({

		model:function(params){
		
			console.log( 'init , from song route model ',params)
    
			Ember.run(this,'checkOnline',params.isOnline,params.y)

			if(this.get('isAutoplay')){
			  Ember.run(this,'autoplay',params.y)
      }


			return params
		},
			//			params.y = [params.y.split("")][params.x] || params.y
    isAutoplay:true,
		checkOnline(isOnline,name){
			if(isOnline === "online"){
					this.set('song.isOnline',true)	
				}else{
					this.router.replaceWith('song',{isOnline:"offline",y:name})
					//this.set('song.isOnline',false)
				}
		},
		autoplay(songName){

		let arg = "fetching clock! from song route",
//				songName = "showbury" ,//this.get('context.y'),
				song = this.get('song');

		console.log(songName,'model')
		console.log('clock from song')


		song.set('pause',true)
		
		song.set('selected',songName)
//		Ember.run.next(song,'clock',arg)
		//		mrun(song, )

		
		},

		actions:{

			ride:function(x,y){

				this.router.replaceWith("song",{x:x,y:y})

			},
			loading:function(){	console.log ( "THIS _ IS _ LOADING" ) 

			}
		}
})
