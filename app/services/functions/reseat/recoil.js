export default function(last,index,score,ref){
	let top = true;
	for(;last>index;last--){
		//update
		let {notes,map} = score[last-1];
		console.log(last,notes.length,map.length, ' first check ' ) 
		ref.child(last).update({notes,map})
		//reseat
		if(!top){
			score.replace(last,1,score[last-1])
		}else{
			top = false
		}
	}
	return last
}
