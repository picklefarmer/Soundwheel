App.AboutView = Ember.View.extend({
	tagName:"canvas",
	fifths:[],
	classNames:['circle'],
	didInsertElement:function(){var self = this;
 		$(document).keydown(function(e) {
		if(e.keyCode === 32){
			Em.run(self,'clear')
			Em.run(self,'circle')
			}
		})
		this.set('ctx',this.get('element').getContext('2d'));
		var canvas = this.get('element')
		canvas.height = 300;
		canvas.width = 300;

		var mnt = 100;
		var arr= [];
	//	ctx.font = "16px sans-serif";
		var x,y,h;	
		for(var i = 0;i<12;i++){
				x = 125 + mnt*Math.cos((i-1)/1.9);
				y = 125 + mnt*Math.sin((i-1)/1.9);
				h = i*(360/12) ;

		this.fifths.push([x,y,h])
		}
		for(var i = 0;i<3;i++){
		arr.push(~~(Math.random()*12))
		}
		Em.run(this,'circle')
	},

	draw:function(start){
		var arrs = this.get('fifths'),
			pointOne = arrs[start],
			pointTwo = arrs[(start+5)%12],
			pointThree = arrs[(start+10)%12]
			scale = 50;
				

		var ctx  = this.get('ctx');
		ctx.fillStyle = "hsl(1,0%,19%)"
		ctx.strokeStyle = '#fff'
		ctx.beginPath()
		ctx.moveTo(arrs[start[0]][0]+ scale/2
				  ,arrs[start[0]][1]+ scale/2 )
		for (var i =0; i < start.length; i++ ) {
			ctx.lineTo(arrs[start[i]][0]+ scale/2,
					   arrs[start[i]][1]+ scale/2)
		}
		ctx.closePath()
			
	ctx.stroke()	
		ctx.fill()
	},
	dot:function(i){
		var x,y,h,arr;
		try{
		var note = this.get('notes')[i];
		}catch(e){
			console.log(i,this.get('notes'))
		}
		var ctx = this.get('ctx');
		var fifths = this.get('fifths'),
			scale = 50;	

		arr = fifths[i];
	//	console.log(arr,i,fifths)
			 x = arr[0]; y = arr[1]; h = arr[2];

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
				note.volume = 1
				}
				},l,l*25)}
			
					},
	circle:function(){
		for (var i  = 0; i < 12; i++){
				Em.run.later(this,"dot",i,i*150)
		//	ctx.fillRect(x,y,27,27)
		//	ctx.fillStyle = "black"
		//	ctx.fillText(i+1 , x+8, y+16 )
			}
		},
clear:function(){

this.get('ctx').clearRect(0,0,300,300)
},
click:function(){
	var three = 4,rand = [],r;
	Em.run(this,'clear')

	while(three--){
			r = ~~(Math.random()*12)
			rand.push(r)
			Em.run(this,'dot',r)
	}

	Em.run(this,'draw',rand)
	//Em.run(this,'circle')
},	
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
			





})
