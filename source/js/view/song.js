
App.SongsView = Em.CollectionView.extend({
	
	content:['backView','frontView','centerView'],
	classNames:['lest'],
	attributeBindings:['id',"style"],
	x:Em.computed.oneWay('this.controller.model.x'),
	y:Em.computed.oneWay('this.controller.model.y'),
	id:"hing",
	mouseFormat(E){
//		console.log( this.get('element') ) 
		var [ x , y ]=[ E.offsetX == undefined ? E.pageX - (this.get('element').offsetLeft +40): E.offsetX,
			   			E.offsetY == undefined ? E.pageY - (this.get('element').offsetTop +100): E.offsetY];
		
			E = [ x , y ]=[~~((x-10)/(1472/23)),~~((y-5)/(300/6))];
		return E
	},
	style:function(_,y,x){
		//		console.log(_,this.get('x'),this.get('y'))
				x = 100;
//				x = 1220;
				y = 360;
				var v = "px;";
				var p = "%;";
				return "height:"+y+v+"width:"+x+p;
		}.property(),
		
	isFaded:Em.computed.oneWay('controller.isFaded'),
	isCleared:Em.computed.oneWay('controller.isCleared'),
	playType:Em.computed.oneWay('controller.playType'),
	tempo:Em.computed.oneWay('controller.tempo'),
	noteType:Em.computed.alias('controller.noteType'),	
	playTo:function(){
			let play = this.get('controller.play') 
			if(play[1]){
					this.toggleProperty('pause')
					Em.run(this,"play",play[1])
			}else{
					Em.run(this,"edit",null,play)
		console.log('view play')
			}
	}.observes('controller.play'),
    globalKeydown:Em.inject.service(),	
	didInsertElement(){
      console.log('getting it in') 
		this.forEach((item,index) => {
			if(item.element)
		this.set(item.content,item.element.getContext('2d'))})

	    $(document).keydown(e => Em.run(this,this.get('globalKeydown.begin'),e))
	},
    willDestroyElement(){
      console.log( 'destroy, view') 
      $(document).off('keydown')
    },
	frontView:function(a,ctx){
				if(ctx){
					ctx.font="bolder 22px serif"
        			ctx.fillStyle = "white" 
				}
				return ctx || null
		}.property(),
	centerView:function(a,ctx){
				if(ctx){
					ctx.font="bolder 22px serif"
				}
				return ctx || null
		}.property(),
	backView:function(a,b){
				var twentyFour = 24,width = this.get('width'),dots = 2,
					size = Math.ceil(1600/24),fret = new Image();
					fret.src = "images/fret.jpg";
					console.log(width) 
		//			fret.src = "lightning.svg";
				fret.onload = function(){
					b.fillStyle = "#012";
		    //		b.fillRect(0,0,1600,300);
		    		b.fillRect(0,0,width,300);
					b.globalAlpha = .65;	
						b.save()
					b.translate(0,300)
					b.scale(1, -1)
					b.globalCompositeOperation = "lighter"
				while(dots--){
		//		b.drawImage(fret,600*dots,0,600,488)
				}
		//		b.drawImage(fret,2905,300)
					b.restore()
					b.fillStyle = "rgba(44,77,150,.122)"
					b.lineWidth = "5"
				b.beginPath()
				b.moveTo(770,160)
				b.lineTo(795,160)
				b.lineTo(745,80)
				b.lineTo(765,140)
				b.lineTo(740,140)
				b.lineTo(790,220)
				b.closePath()
				b.fill()
				b.fillStyle = "#333333"
		//b.stroke()
		
				dots = 4
				while(twentyFour--){
				
				b.fillStyle = "hsl(180,11%,32%)"
					b.fillRect(size*twentyFour,0,9,300)
				b.fillStyle = "hsl(180,11%,42%)"
					b.fillRect(size*twentyFour+2,0,5,300)
				}
				
				b.fillStyle = "hsl(180,11%,32%)"
				while(dots--){
					b.beginPath()
					b.arc(size*2.5+3+(dots*size*2),150,16,0,2*Math.PI)
					b.fill()
				}
				dots = 4;
				while(dots--){
					b.beginPath()
					b.arc(size*14.5+3+(dots*size*2),150,16,0,2*Math.PI)
					b.fill()
				}
				dots = 2;
		
				while(dots--){
					b.beginPath()
					b.arc(size*11.5+3,75+150*dots,16,0,2*Math.PI)
					b.fill()
				}
			
				twentyFour =6;
				while(twentyFour--){
				b.fillStyle = "hsl(0,0%,5%)"
					b.fillRect(0,22+50*twentyFour,width,6)
				b.fillStyle = "hsl(0,0%,40%)"
					b.fillRect(0,24+50*twentyFour,width,3)
				}
			}
		}.property(),

	itemViewClass: Ember.View.extend({
			mouseMoveBinding:"mouseSelection",
			mouseSelection:function(){
				if(this.get('parentView.controller.selection'))
					return this.get('console')
				return null
			}.property('parentView.controller.selection'),
			console(e){
				Em.run.throttle(this.get('parentView'),'console',e,2)
			},
			click(e){
				if(this.get('parentView.controller.selection')){
					Em.run.once(this.get('parentView'),this.get('parentView.pushChord'),e)
				}else{
					Em.run.once(this.get('parentView'),this.get('parentView.prePushEdit'),e)
				}
			},
			mouseLeave:function(){
				if(this.get('parentView.controller.selection')){
					Em.run.once(this.get('parentView'),'clear','centerView')
				 }
			},
			tagName:"canvas",
			classNames:["tablature"],
			attributeBindings:['width','height'],
			heightBinding:"parentView.height",
			widthBinding:"parentView.width",
		}),
	height:300,
	width:1472,
	prePushEdit:function(e){
	//			console.log ( 'parent' ) 
				var f = Em.run(this,"mouseFormat",e),
				note = [f[0],this.get('mapAllocation')[f[0]][f[1]]],
				obj = {};
				obj[f[1]] = note;
		
	//			console.log ( f  )
				Em.run(this,'editPush',obj)
	},
	pushChord(e){
			var chord = this.get('chordTemp'),noteMap = this.get('mapAllocation');
				
				pos =  this.get('song.score')[this.get('song.index')];

//			chord = chord.map(([x,y])=>[x,y,noteMap[x/67][y/50]])
//			console.log( "__CHORD___",chord) 
			for(var [x,y] of chord){
				x/=67;
				y/=50;
				pos[y] = [x,noteMap[x][y]]
			}
			
			Em.run(this,'edit',null,this.get('song.index')) 
	},

	console:function(e){
			var arr = this.get('controller.selection'),
				low = this.get('controller.low'),
		[  x , y  ]	= Em.run(this,"mouseFormat",e);

			if( (x !== this.get('cacheX')) || ( y !==this.get('cacheY')) ){
			
				this.setProperties({cacheX:x,cacheY:y }) 
				
				var diffX = ~~((this.get('controller.difference')/2) -1);
				var diffY = ~~(arr.length/2);
				
			console.log(diffX,diffY,this.get('controller.difference'))
		
				arr = arr.map((fret,string)=>{
					fret-=low;
					fret+=x;	
					string+=y;					
					fret-=diffX;
					string-=diffY;
					fret*=67;
					string*=50;
					return [fret,string]
				})
				Em.run(this,'dotChord',arr)
			}
		},
		
	editPush:function(notes){
				var pos =  this.get('song.score')[this.get('song.index')],name = Object.keys(notes)[0];
		//		console.log( this.get('song.score'),pos,"index: " +  this.get('song.index') , notes ) 
				if(pos){
					if(!pos[name]){
						console.log( "add" ,name,notes[name]) 				
						pos[name] = notes[name]
						Em.run(this,'dot',notes[name][0],name,notes[name][1])
		
					}else{
						console.log( "remove" + name ) 
		//				Em.run(this,'dot',notes[name][0],name,notes[name][1],true)
						Em.run(this,'erase',67*notes[name][0],50*name,'frontView')
		
		//				Em.run(this,'dot',pos[name][0],name,pos[name][1],true)
						Em.run(this,'erase',67*pos[name][0],50*name,'frontView')
		
						delete pos[name]
					}
				}else{
					this.get('song.score').push(notes)}
//					console.log(this.get('song.score'),pos,name) 
					//Em.run(this,'dot',notes[name][0],name,notes[name][1],true)
					Em.run(this,'erase',67*notes[name][0],50*name)
		},
	dotsIndex:0,
	dots:function(x,y,i){
		
				Em.run.later(this,'dot',x,y,i,this.incrementProperty('dotsIndex')*this.get('tempo'))
		
		},
	erase:function(x,y,ctx){
		this.get(ctx).clearRect(x+8,y,50,50)	
	},
	chordTemp:[],
	dotChord(chord){
				
			var offset = 18,
				scale = 36,
				l = 8,
				ctx = this.get('centerView');
			
			for(var [x,y] of this.get('chordTemp')){
				Em.run(this,"erase",x+8,y+8,'centerView')
			}
			
				ctx.globalCompositeOperation = "source-over"
				ctx.globalAlpha=.5
				ctx.fillStyle = "white" 
			
				for(var [x,y] of chord){
					ctx.beginPath()
					ctx.arc(offset+x+scale/2,
						offset/2+y+scale/2,
						((scale/2)/8)*l,
						0,2*Math.PI)
					ctx.fill();
				}
				this.set('chordTemp',chord)
				ctx.globalAlpha=1
	},	
    playNotes:function(){
      var chord =  this.get('song.score').objectAt(this.get('song.index')).notes,
      	x = 67
          y = 50
          offset = 18,
          rate = 4,
      	tempo = 15,
          scale = 36,
          tempChord = this.get('song.tempChord'),
          ctx =  this.get('frontView');
           
         // console.log("premap",chord) 
          chord = chord.map((e,f) => { 
                  if(e){
                    return  [ offset+(e*x)+scale/2,
                              offset/2+(y*f)+scale/2
                            ]}}).filter(e => e?e:false)
                 console.log ("postmap", chord ) 

        /* NOES 
         * {"3":[4,10]}
         * [0,3,12,4]
         * {'notes':[0,4,11],'lyrics':'string'}
        */

        tempChord.map(([fret,string]) => ctx.clearRect(fret-scale/2,string-scale/2,scale,scale))
        this.set('song.tempChord',chord)


//			ctx.globalCompositeOperation = "source-over"

            //			note.play()

			for(var l = 0; l <rate; l++){	
				Em.run.later(this,(l)=>{
					ctx.beginPath()
        	        chord.map(([fret,string]) => {  
                      ctx.arc(fret,	string,	((scale/2)/rate)*l,	0,2*Math.PI)
                    ctx.closePath();
                     })
					ctx.fill()
			    },l,l*tempo);
			}	

            //Em.run.later(this,()=>note.pause(),(rate-1)*tempo)

    }.observes('song.index'),

	dot:function(x,y,i){
			x*=67
			y*=50
//			try{
				var note = this.get('notes')[i];
//			}catch(e){
//				console.log(e)
//			}
			var offset = 18,
			ctx = this.get('frontView'),
			//fifths = this.get('fifths'),
            rate = 4,
			tempo = 15,
            scale = 36;
			//fade = this.get('isFaded'),
			//h  = (360/12)*i,
			//names =   ["C","G","D","A","E","B","F#","C#","G#","D#","A#","F"][i%12],
			//initVol = this.get('volume')

						//	arr = fifths[i];
						//	console.log(note,x,y,i,"notes")
						//  x = arr[0]; y = arr[1]; h = arr[2];
			  
			ctx.clearRect(offset+x,offset/2+y,scale,scale)

//			ctx.globalCompositeOperation = "source-over"
			note.play()

			for(var l = 0; l <rate; l++){	
				Em.run.later(this,(l)=>{
					ctx.beginPath()
					ctx.arc(offset+x+scale/2,
							offset/2+y+scale/2,
							((scale/2)/rate)*l,
							0,2*Math.PI)
						ctx.fill()
			    },l,l*tempo);
			}	

            Em.run.later(this,()=>note.pause(),(rate-1)*tempo)
		//	note.volume = initVol; 
		//	note.currentTime = 0;
            /* LEGACY
             * ctx.clearRect(x,y,scale/2,scale/2)
             * if(note.volume >= .12)
             * note.volume -=.12
             * ctx.fillStyle = "hsl("+ h +",100%,"+l*7+"%)";
             * ctx.fillStyle = "hsl("+ h +",100%,40%)"
             * ctx.fillText(names,(offset/2)+(names[1]?-5:1)+x+scale/2,offset/2+8+y+scale/2)
             * ctx.fill()
			*/		
		},
	clearObserver:function(){
			Em.run.next(this,'clear')
		}.observes('controller.clear'),
	clear:function(ctx='frontView'){
				this.get(ctx).clearRect(0,0,1400,300)
		},
	draw:function(){
			var type = this.get('block'),map = this.get('mapAllocation'),x = this.get('x'),y = this.get('y');
		
				Em.run(this,'clear')
		
				//	Em.run(this,'dot',this.get('x')-1,this.get('y'),(type-1)%12)
				//	Em.run(this,'dot',this.get('x')+1,this.get('y'),(type+1)%12)
					Em.run(this,'dot',x,y,type)
					Em.run(this,'dot',x,y-1,map[x][y-1])
					Em.run(this,'dot',x,y+1,map[x][y+1])
		},
	mapAllocation:function(){
			var map = [], _x = 22, _y = 6,deFifth = (function(){
						var count =4,arr = [0,7,2,9,4,11,6,1,8,3,10,5],self = [];
								while(count--){
									self.push(arr.map(function(e){return e+12*(3-count)}))	
								}
								self = self.reduce(function(a,b){return a.concat(b)})
								return  self }());
						 
				while(_x--){
						map.push([])
					while(_y--){
		//					console.log(map[17-_x])
						map[21-_x].push( deFifth[(5+(21-_x)+ _y*5+(_y>3?-1:0))%48])
					}
					_y = 6
				}
		
			return map
		}.property(),
		
	
	editPlay:function(direction,note){
			var index;
		  console.log( 'is playing ' ) 	
			//note = this.get('song.score').objectAt(this.get('song.index'))
			note = this.get('song.score').objectAt(this.get('song.index'))
		  console.log( note, " name, error " ) 	
			Object.keys(note).forEach(function(e){
				var name;		
				if(this.get('isCleared')){
					Em.run(this,'clear')
				}
				if(e === "l"){
					console.log(note[e])		
				}else if(e[1]){
				//	console.log(e)
					name = e.split(",");
					Em.run(this,'dot',name[0],name[1],note[e])
				}else{
					name = note[e];
					//console.log("ASDF",name[0],name[1],e)
					Em.run(this,'dot',name[0],e,name[1])
					}
			},this)
    },
//}.observes('song.index'),
			
	pause:true, 
	play:function(direction,tempo,playType){
//		console.log(this.get('playType'))	

			tempo = tempo || this.get('tempo');
			playType = playType || this.get('playType');
	
			if(!this.get('pause')){
					Em.run.later(this,"play", direction, tempo, playType, tempo)	
//					Em.run.schedule(this,playType,direction)		
					this[direction](playType+"Index")
				}
		},
	volume:.25,
	notes:function(){
		console.log("F")
			var volume = this.get('volume');
		
			// circle of fifths 
			var octaves = [.5,1,2,4],octaveIndex = 4;
			var	noteType = this.get('noteType')?play_tone:play_tone_webAudio;
			console.log ( noteType ) 
			var notes = [
				261.63,	//	0
				392,	//	7
				293.66,	//	2 
				440,	//	9	
				329.63,	//	4 
				493.88,	//	11 
				369.99,	//	6 
				277.18,	//	1
				415.3, 	//	8
				311.13,	//	3 
				466.16,	//	10 
				349.23]	//	5 
				
				while(octaveIndex--){
					octaves[3-octaveIndex] = notes.map(function(e){return e*octaves[3-octaveIndex]})
				}
				notes = octaves.reduce(function(a,b){return a.concat(b)})
				notes = notes.map(function(e){
				return noteType(e,volume)})
		
				return notes

		}.property('noteType'),
		
		
})
		
