App.ConsoleRoute = Ember.Route.extend({
actions:{

		urlUpdater:function(a,menu){
		a = a.map(function(e){
				var scoreIndex = e.scoreIndex;
				if(e.scoreIndex < 10){
					scoreIndex = "0"+scoreIndex
				}
			//	console.log(scoreIndex)
			return e.skip?e.expression[0]+scoreIndex+""+e.beat+""+e.sine:[]}).join("")	
		
		b = this.get('controller');
		b = b.get('volume')+"_"+b.noteLength+"_"+b.meter;
		console.log("urlUpdater",b,a)
			this.router.replaceWith("menu",b,a)
			Em.run(menu,"time")
		}
	},
  setupController: function(controller, model) {
    controller.set('model', model);//console.log("P")
  }

});

App.ConsoleController = Ember.Controller.extend({
needs:"menu",
title:"APP",
meter:9,
isPlaying:false,
playProp:false,
tope:"play",
noteLength:50,
model:function(_,_new,_prev){
	//	//console.log("index",_new,_prev)	
	var _new,_newLength,objToReturn,_newKeys,self = this;
	if(_new){
		if(_new.ison){
	
			//console.log('index.son',_new.son)	
				
					_new = _new.ison.split("_")
					//console.log("controlers" ,_new)
					objToReturn = {};
					_newKeys = ["volume","noteLength","meter"]
					_new.forEach(function(e,f){
					//	console.log(e,_newKeys[f])
						objToReturn[_newKeys[f]] = e;
						this.set(_newKeys[f],e)  
					},this) 

					return objToReturn;
		}else{

	var cb = function(e){
				//console.log("this",this)
				if(	_prev[e] !== _new[e]){
				this.set(e,_new[e])  
				}
			}

		
			Object.keys(_prev).forEach(cb,this)
			return _new
		}
	}else{
			return {volume:1,noteLength:25,meter:9}
			}
			
		
	}.property(),



	volume:function(a,_new,_prev){
		//	console.log("volume_setter",_new)
			if(_new >= 0 && _new <= 1){
				this.get('controllers.menu.notes').map(function(e){
						e.volume = _new
				})
			return _new
			}
			if(_prev){
				this.notifyPropertyChange('volume')
				return _prev
			}else{
				return .125
			}
	}.property('controllers.menu.notes'),

	actions:{
	urlUpdater:function(a){
		//console.log('leap2')
		this.send("urlUpdater",this.getModel,a)
		return true
	}

	},
})


