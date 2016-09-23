export default function(e){

		var arr = this.get('song.chordSelection'),
			low = this.get('song.chordLow'),
			[  x , y  ]	= Ember.run(this,"mouseFormat",e);

		if( (x !== this.get('cacheX')) || ( y !==this.get('cacheY')) ){
			this.setProperties({cacheX:x,cacheY:y }) 

			console.log(x,y,"cache",arr)	
			let diffX = ~~((this.get('song.chordDifference')/2) -0.5),
				diffY = ~~(arr.length/2);
				
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

			Ember.run(this,'dotChord',arr)

		}
}
	
