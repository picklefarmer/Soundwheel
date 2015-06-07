App.SubRouteService = Em.Service.extend({
  tablature:function(){
		var self = this;
			console.log("D")
			Em.run(this,'clear')
			this.get('mapAllocation').forEach(function(e,x){
							e.forEach(function(v,y){
								Em.run(self,'dots',x,y,v)
							})
						})
				this.set('dotsIndex',0)
		},

	muSongLength:function(){return bfa.length}.property(),
	muSongIndex:function(a,b){
				if(b < 0){b = this.get('muSongLength')-1}
				b = b%this.get('muSongLength')
				this.set('controller.model.x',b)
				return b
		}.property(),
	range:function(){
			var range = this.get('controller.model.y')[this.get('muSongIndex')]
			return range || null
		}.property('controller.model.x'),
	muSong:function(direction){
			
				var index = this[direction]('muSongIndex') ;
		console.log(this.get('muSongIndex'),index)
				var note = bfa[index];
				var board = this.get('mapAllocation');
				var y =18,tmp,x = [],range = this.get('range');
		if(	range ) {
			while(y--){
					tmp = board[y].indexOf(note)
					if(tmp !== -1){
						x.push([y,tmp])
					}
				}
				x = [x[range]]	
		}else{
			while(y--){
					tmp = board[y].indexOf(note)
					if(tmp !== -1){
						x.push([y,tmp])
					}
					
				}	
		}
		//	console.log(x+1,y,note,index)	
				if(x[0]) {
				x.forEach(function(e,f){
				if(this.get('isCleared')){
					Em.run(this,'clear')
					}
					Em.run(this,'dot',e[0],e[1],note)
				},this)
				}		
		},
	block:function(){
			//	return this.get('mapAllocation')[this.get('x')][this.get('y')]
		}.property('x','y'),
     drawObserver:function(_,x,y){
				if(this.get('frontView')){
			//		Em.run.debounce(this,'draw',7*15)
				}	
		}.observes('x','y'),

	songLength:function(){return blues[0].length}.property(),
	songIndex:function(a,b){
				
				if(b < 0){b = this.get('songLength')-1}
				return b%this.get('songLength')
		}.property(),
	song:function(direction){
				 	var length = blues[0].length,
					i = this[direction]('songIndex'),
					y = 6, v,x = [],tmp;
						
					while(y--){
						tmp = ~~blues[y][i];
						if(tmp)
							x.push([tmp-1,y])
					} 	
					
			if(x[0])
				x.forEach(function(x,f){
						var y = x[1],x = x[0]; 
				v = this.get('mapAllocation')[x][y];
			//		console.log("y:",y+1,"x:",x,"note:",v,"index:",i)
				if(this.get('isCleared')){
					Em.run(this,'clear')
					}
					Em.run(this,"dot",x,y,v)
					},this)
		}	
})
