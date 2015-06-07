App.TheGreatComponent = Ember.Component.extend({
	tagName:"canvas",
	classNameBindings:['more'],
	attributeBindings:['id','style','width','height'],
	id:"canvas",
	tone:false,
	height:120,
	width:90,
	show:true,
	model:0,
	sine:0,
	volume:Em.computed.alias('parentView.volume'),
	meter:Em.computed.alias('parentView.meter'),
	animated:Em.computed.alias('parentView.animated'),
	count:Em.computed.alias('parentView.count'),
	beat:Em.computed.alias('parentView.beat'),
	scoreIndex:Em.computed.alias('parentView.scoreIndex'),

	noteLength:function(a,b){
			//console.log(b)
			return b/100
	}.property(),
	
	score:function(){
		var a = this.get('sine');
		var expression = Math.abs(Math[this.get('expression')](a)).toString()
		
	if(expression[1] && (expression !== "-Infinity")){
		return expression.split(".").join("").split(/(1[0-1]|[0-9])/g).filter(function(e){return (e && e !== "e-") ?true:false});
		}else{
			return []
		}
	}.property('sine','expression'),


	style:function(){
						return  "height:"+this.get('height')+
								";width:"+this.get('width')+
								";background:black";
	}.property(),	
	
	ctx:function(){
		var init = this.get('element').getContext('2d');
		init.fillStyle = "yellow"
		init.font;
		
		return init;
	}.property(),
	stream:function(m,animated){
			console.log(animated,"animated")
		return !this.get('animated')?"draw":"animate"
	}.property('animated'),
	animate:function(note,nextNote){
		var width = this.get('width')
		var height = this.get('height')
		var scale = height/4;
		var	ctx  = this.get('ctx');
		var x = (note%3)*scale;
		var y = (note%4)*scale;
		var _x = (nextNote%3)*scale;
		var _y = (nextNote%4)*scale;
		var radius = scale/2;
		var hsl = "hsl("+ ~~(255/12)*note+",100%,";
		var meter = this.get('meter');
		var meterCount = meter;
		var deltaX = (_x-x)/meter;
		var deltaY = (_y-y)/meter;
		
	 	
		function update(X,Y){
			var rad = ctx.createRadialGradient(X+radius,
											   Y+radius,
											   radius/2,
											   X+radius,
											   Y+radius,
											   radius)
				rad.addColorStop(0,	hsl+"50%)")		
				rad.addColorStop(.2,hsl+"25%)")
				rad.addColorStop(1,	hsl+"0%)")

		 
			ctx.clearRect(0,0,width,height)

			ctx.beginPath()
			ctx.arc(X+scale/2,Y+scale/2,scale/2,0,2*Math.PI)
			ctx.fillStyle = rad
			ctx.fill()
			if(--meterCount >-1 ){
			Em.run.later(update,_x-deltaX*meterCount,_y-deltaY*meterCount,40)
		
			}
		}
			
	
		update(x,y)
	},
	draw:function(note){

		var width = this.get('width')
		var height = this.get('height')
		var scale = height/4;
		var	ctx  = this.get('ctx');
		var x = (note%3)*scale;
		var y = (note%4)*scale;
		var radius = scale/2;
		var hsl = "hsl("+ ~~(255/12)*note+",100%,"

		
	 		var rad = ctx.createRadialGradient(x+radius,
											   y+radius,
											   radius/2,
											   x+radius,
											   y+radius,
											   radius)
				rad.addColorStop(0,	hsl+"50%)")		
				rad.addColorStop(.2,hsl+"25%)")
				rad.addColorStop(1,	hsl+"0%)")
	
			ctx.clearRect(0,0,width,height)

			ctx.beginPath()
			ctx.arc(x+scale/2,y+scale/2,scale/2,0,2*Math.PI)
			ctx.fillStyle = rad
			ctx.fill()

	},

	melody:function(){
		if(this.get('count')=== ~~this.get('beat'))
		Em.run(this,"measure")
			
//		if(this.get('loopValue')>0)
//		this.decrementProperty('loop')

	},

	measure:function(){
		var score,notes;//,notelength;
		if(this.get('tone'))
		{
		notes = this.get('notes');

		score = this.get('score');
	//	notelength = this.get('notelength');
		scoreIndex = this.get('scoreIndex'),
		sound = notes[score[scoreIndex]];
	if(sound){sound.play()
	Em.run(this,'audioLength',scoreIndex)
		
		////console.log(notes[score[a]].currentTime)
		

			if(score[scoreIndex+1]){
//				console.log()	
				//	//console.log(this.get('scoreIndex'))
try{
		this.incrementProperty('scoreIndex');
	}catch(e){
		console.log('update fail')
	}
			}else{
					
				this.set('scoreIndex',0)
			}

		
			Em.run(this,this.get('stream'),score[scoreIndex],score[scoreIndex+1]||score[0])
		}	
		}
	},
audioLength:function(a){
				var noteLength,
				notes = this.get('notes'),
				scoreIndex = a;
				score = this.get('score')[scoreIndex],
				sound = notes[score];
								
			if(sound){
				noteLength = this.get('noteLength');
			//	console.log(noteLength)	
	  		if(sound.currentTime>noteLength){
	  			
				sound.pause()
				sound.currentTime=0
			//	sound.volume = this.get('volume')
			}else{
				if(this.get('playProp'))
				Ember.run.later(this,function(){
					Em.run(this,"audioLength",a)
					},20)
				}
			}
	  		//console.log(audio.currentTime)
  	},	  
	play:function(){
	
	if(this.get('score'))	
	Em.run(this,"melody")

	 	
	//melody(this.get('sine'),this.get('loop'))
//console.log('playing')
	}.observes('playProp')



})


