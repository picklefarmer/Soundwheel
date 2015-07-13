		
App.SongController = Em.Controller.extend({
		needs:'inventory',
    init:function(){
      console.log('songController, INIT') 
    },
		songs:function(){

						
            var one = localStorage
						console.log ( one , "LOCAL STORAGE") 
						return one

		}.property(),

		onLine:function(e,f,g){
				console.log(f)
				return f || false
		}.property(),

		songNames:function(){

				return this.get('songs').names
				//return this.get('songs').names

				}.property('songs'),
                
		editScore:function(){

				return Em.A([[]])

				}.property(),
		
		editIndex:function(a,b){
				if(b < 0){b = this.get('editScore').length-1}
			
				return b%this.get('editScore').length ||0

				}.property(),

		lyric:function(e,f,g){

							//	console.log(e,f,g)
					var base  = this.get('editScore.'+this.get('editIndex'))
								if (base ){
					//					console.log("lyric found" , base )
										return base
								}
								return ""

				}.property('editScore','editIndex'),
		play:function(i,ii){
			console.log(ii,i, "play+prop" ) 
			if(	ii[1] ){ return ii}
			return ii > -1 ? ii : []
		}.property(), 
		actions:{
				play(f,g){
					if(g){	
						this.set('play',[f ,g]) 
					}else{
						this.set('play',f )
					} 
						console.log( "play" , f  ,g) 
				},	
				
				check:function(value){
				
					var y = this.get('model.y')
					var x = this.get('model.x')
					sub = this.get('direction')
						//	x += sub
						y[x] = value
						this.set('model.y',y)
						this.notifyPropertyChange('model')
							console.log("check",x, this.get('model.x'),this.get('model.y'),value)
						},
				captureChord(){
					console.log ( 'capture chord' ) 
				debug  =  Em.copy(this.get('editScore').objectAt(this.get('editIndex'))).map(e=>e[0]||'')
				
				console.log( debug) 
					this.get('controllers.inventory.model').addObject(debug) 
						
				},	
				save:function(){

		var online = this.get('onLine')
			console.log(online)
				 let name = this.get('model.y'),
                     tempNameCheck;
					if(online){
				   	   if(this.get('songNames').indexOf(name)){
								tempNameCheck = prompt("update" +name+" "+online+"?\n(this option is secured)\n" + name + " online?")	
							
								if(tempNameCheck ==="-"+name){
									name = this.get('model.y')
								}else{
									name = false
								}
					   		
						}else{	
							name = confirm("save"+ name + " online?")	
						}
					
						if(name){
								Firebase.set(base.child(name),this.get('editScore'))
									this.send('ride',"edit",this.get('model.y'))
//									this.toggleProperty('state')
									Em.run.later(()=>{
	//									this.toggleProperty('state')
									},3000)
								}
					}else{
						 console.log(" F" , name);
						if(localStorage[name]){	
							localStorage[prompt("update song ?",name)] = JSON.stringify(this.get('editScore'))
						}else{
							localStorage[name] = JSON.stringify(this.get('editScore'))
						}
					}
					var self = this; 
					Em.run.later(function(){
//							self.toggleProperty('state')
					},3000)

				},
				
				load:function(e,x,y){
		
                },
				line:function(){
						console.log( 'online' ) 	
						this.toggleProperty('onLine')
				
						},
	
				clear:function(){
		
						this.toggleProperty('clear')
				
						},
			
				cleared:function(){
					
						this.toggleProperty('isCleared')
						},
			
				faded:function(){
					
						this.toggleProperty('isFaded')
						},
				
				type:function(){
						console.log(' typeToggle')		
						this.incrementProperty('playTypeToggle',1)
						console.log(this.get('playTypeToggle'))	
				},
/*			
				alone:function(e,f){
		
						console.log(this.get('editScore'),e)
						},
*/				
				songRead:function(e){
			
					var tab = [[],[],[],[],[],[]];
					var test = 	e.split("\n")
								.filter(function(e){return e})
								.map(function(e){return e.substring(1,e.length)})
								.forEach(function(e,f){
									tab[f%6].push(e.slice(1,e.length-1))
								})
						blues = tab.map(function(e){return e.join("")})
						console.log(tab)
						},
			
				
			},
		tempo:1250,
		clear:true,
		isCleared:true,
		isFaded:false,
		octaves:[3,2,1,0],
//		playTypeToggle:function(e,f){
//				return f%3 || 0 
//			}.property(),
		playTypeBinding:"model.x",
})


