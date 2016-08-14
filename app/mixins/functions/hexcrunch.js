export default function(e,f){
		let count = this.get('count') || 0;
	if(typeof e === 'object'){
		count = count < e.length ? e.length : count
		this.set('count',count)
		console.log('count', count, e)
		console.log('this', this) 
	}
		return e 
  /*if(typeof e === 'object'){
		let hex = "0x"+e.shift(),
				notes = e,
				length = 0,
				output = [];
						
		while(hex>>=1){
			   //   console.log(hex%2);
			output[length++] = hex%2 ?
			notes.shift():null;
		}

		count = length>count?length:count;
				
		return output  

 	}else{

		return e

	}*/
}
