export default function(e,f){
  if(typeof e === 'object'){
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

	}
}
