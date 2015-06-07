
App.MenuController = Ember.ArrayController.extend({
isPlaying:false,
playProp:false,
tope:"play",
needs:['console'],
console:Em.computed.alias('controllers.console'),
meter:Em.computed.alias('console.meter'),
noteLength:Em.computed.alias('console.noteLength'),
volume:Em.computed.alias('console.volume'),
model:function(_,_new,_prev){
//console.log(_new,_prev)	
//parses url
var _new,_newLength,objToReturn,_newKeys;
	if(_new){	
		if(_new.son){

			//console.log('son',_new.son)	
				
				_new = _new.son.match(/[a-z]([\d.]){1,}/g)
			 	if(_new){

					_newLength = _new.length
					objToReturn = [] 

					while(--_newLength > -1){
					
						objToReturn[_newLength] = {

											sine:_new[_newLength].slice(4),
											beat:_new[_newLength][3],
											scoreIndex:_new[_newLength].slice(1,3),
											expression:_new[_newLength][0],
											skip:true,
											}

					}
					//console.log('son_end',objToReturn)

				}else{
					//console.log('parse error',"returning default Value")
					return  [{scoreIndex:0,beat:1,sine:Math.PI,expression:"sin",skip:true}]
				}
				
		}else{
			objToReturn = _prev
		
				
					//console.log('_prev', objToReturn)		
					objToReturn[_new.id] = _new.context
			
		}
	}else{
		objToReturn = []
	}

	return objToReturn


}.property(),

notes:function(){

	var volume = .25 //this.get('volume');
	var notes = [
		261.63,
		277.18,
		293.66,
		311.13,
		329.63,
		349.23,
		369.99,
		392,
		415.3,
		440,
		466.16,
		493.88]
		
		notes = notes.map(function(e){
		return play_tone(e,volume)})

		return notes

}.property(),
	actions:{
	play:function(oldTime){
		this.set('isPlaying',true)
		this.set('tope',"pause")
		this.send('urlUpdater',this.get('model'),this)
		
	
	},
	pause:function(){
		this.set('isPlaying',false)
		this.set('tope',"play")
		},

	
	adding:function(){
	
	
		var letstrythis = this.get('model').concat([{
								skip:true,
								beat:~~(Math.random()*4),
								sine:(Math.random()*50).toPrecision(3),
								expression:["s","c","l","t"][~~(Math.random()*4)],
								scoreIndex:0
								}])
	
		this.send('urlUpdater',letstrythis,this)	
		}
	},
	time:function(oldTime,count){
		var meter = this.get('meter')
		var count = count || 3;
	//	console.log(meter)
		var oldTime = oldTime || Date.now()/100;
		var currentTime = Date.now()/100;
		var dT = currentTime - oldTime;
		if(this.get('isPlaying')){
		if(dT>=meter/4){
		

			this.toggleProperty("playProp")
		//	console.log('played note')
			this.set('count',++count%4)
		}else{
			currentTime = oldTime
		}
		Em.run.later(this,function(){
			Em.run(this,'time',currentTime,count)
		//console.log('nay')
		},25)
		}
	},

})

App.AAComponent = Ember.Component.extend({
layoutName:"a-great",
classNameBindings: ['animated:enabled:disabled'],
actions:{
	play:function(){
			this.toggleProperty("tone")
	},
	toggle:function(){
			this.toggleProperty('show')
				this.send('play')
		},
	animate:function(){
			this.toggleProperty('animated')
		}
	},
show:true,
playProp:false,
tone:true,
animated:false,
beat:1,
sine:function(a,b){
			return b
}.property(),
updateModel:function(a,b){
			//console.log("update",this.get(b))

			var index = this.get('contentIndex');
			var expression = this.get('expression')[0];
			var sine = this.get('sine');
			var skip = this.get('show');
			var beat = this.get('beat');
			var scoreIndex = this.get('scoreIndex')
			//console.log(expression,sine,skip)
		
			this.set('controller.model',{"id":index,"context":{
					"skip":skip,
					"expression":expression,
					"sine":sine,
					"beat":beat,
					"scoreIndex":scoreIndex
				}})


}.observes('sine','expression',"show","beat"),
expression:function(_,a,b){
		if(a)
		if(a.length === 1){
			return {"s":"sin","c":"cos","t":"tan","l":"log","r":'sqrt'}[a]
		}
		return a || "atan"
}.property(),
names: ["sin", "cos","tan","log",'sqrt'],
counts:["0","1","2","3"],
scoreIndex:function(a,b){
	return ~~b 
}.property()
}) 
