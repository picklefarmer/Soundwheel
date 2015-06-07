
App.MountView = Em.View.extend({

tagName:"canvas",

attributeBindings:['id',"style"],
style:function(_,y,x){
		console.log(_,this.get('x'),this.get('y'))
		x = 40;
		y = 42;
		var v = "px;";
		return "position:absolute;"+"left:"+x+v+"top:"+y+v;
}.property(),
x:Em.computed.oneWay('this.controller.model.x'),
y:Em.computed.oneWay('this.controller.model.y'),
id:"fishing",
notes:function(){
console.log("F")
	var volume = 1//.25 //this.get('volume');

	// circle of fifths 
	//  
	var notes = [
		261.63,
		392,
		293.66, 
		440,	
		329.63, 
		493.88, 
		369.99, 
		277.18, 
		415.3,  
		311.13, 
		466.16, 
		349.23] 
		
		notes = notes.map(function(e){
		return play_tone(e,volume)})

		return notes

}.property(),	
dot:function(x,y,i){
	//var x,y,h,arr;
	x*=24
	y*=24
		try{
		var note = this.get('notes')[i];
		}catch(e){
			console.log(i,this.get('notes'))
		}
		var ctx = this.get('ctx');
		var fifths = this.get('fifths'),
			scale = 24;	

//		arr = fifths[i];
	//	console.log(arr,i,fifths)
//			 x = arr[0]; y = arr[1]; h = arr[2];
var h  = (360/12)*i;
		note.volume = .75;
		for(var l = 0; l <8; l++){	
				note.play()
					Em.run.later(this,function(l){
				//	ctx.clearRect(x,y,scale/2,scale/2)
					
					if(note.volume >= .12)	
					note.volume -=.12
					ctx.fillStyle = "hsl("+ h +",100%,50%)";
					ctx.beginPath()
					ctx.arc(x+scale/2,
							y+scale/2,
							((scale/2)/8)*l,
							0,2*Math.PI)
					ctx.fill()
				
				if(l === 7){
				note.pause()
				note.volume = .75; 
				note.currentTime = 0;
				}
				},l,l*15)}
			
},
clear:function(x,y){
	this.get('ctx').clearRect(0,0,300,300)
},
draw:function(){
	var type = this.get('block')? 4:1;

		Em.run(this,'clear')

		if(type === 4){
			Em.run(this,'dot',this.get('x'),this.get('y'),type)
		}else{
			Em.run(this,'dot',this.get('x')-1,this.get('y'),5)
			Em.run(this,'dot',this.get('x')+1,this.get('y'),7)
			Em.run(this,'dot',this.get('x'),this.get('y')-1,9)
			Em.run(this,'dot',this.get('x'),this.get('y')+1,11)
		}
},
mapAllocation:function(){
	var map = [], _x = 13, _y = 6;
	
		while(_x--){
				map.push([])
			while(_y--){
					console.log(map[10-_x],_x)
				map[12-_x].push(~~(Math.random()*2))
			}
			_y = 6
		}

	return map
}.property(),

block:function(){
		return this.get('mapAllocation')[this.get('x')][this.get('y')]
}.property('x','y'),

drawObserver:function(_,x,y){
	//	console.log(_.get(x),x,y)
		if(this.get('ctx')){
			Em.run.debounce(this,'draw',7*15)
		}	
}.observes('x','y'),


didInsertElement: function(){
		var self = this;
		this.set('ctx',this.get('element').getContext('2d'))
     $(document).keydown(function(e) {

			 //if(this.get('pinch')){
					 
			//	self.toggle('pinch')

			console.log("fired")	
			self.get('controller.target')
				.send('ride',e.keyCode,
					  self.get('x'),
					  self.get('y'))
     });
	 
	 
},


})

App.MountRoute = Em.Route.extend({
model:function(params){
console.log(params)
return params
},
init:function(){
	console.log('f')
},

beforeRender:function(){
	console.log("j",this.get('model'))
		
},
renderTemplate: function() {
   		this.render();
	console.log("D")
		this.render("nav", {
            outlet: "nav",
            into: "application" // important when using at root level
        });

  },

actions:{

ride:function(e,x,y){
	var is;
	switch(e){
	
		case 37:is = true;model= this.get('model');x--;break;
		case 38:is = true;model= this.get('model');y--;break;
		case 39:is = true;model= this.get('model');x++;break;
		case 40:is = true;model= this.get('model');y++;break;
		default:break;	
	}
	if(is){

	this.router.replaceWith("mount",{x:x,y:y})
	}	
}}
})


