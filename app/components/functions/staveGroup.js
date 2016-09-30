export default function(){

		let eighthArray = this.get('barArray'),
				length			= eighthArray.length,
				ix					=	0,
				grouping		= [];

		for(ix;ix < length;ix++){
			//if even
			if(ix%2){
				grouping[ix-1].push(eighthArray[ix])
			//if odd
			}else{
				grouping[ix] = []
				grouping[ix].push(eighthArray[ix])
			}
		}	
		grouping = grouping.filter(e=>e !== undefined)
		console.log(grouping, ' grouping ',grouping.length )
		return grouping

};

