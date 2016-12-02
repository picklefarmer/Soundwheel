export default function(composition,ref, index,instance,direction,apendix){
	let length = composition.length;

	for(var i = index; i < length;i++){
		console.log(composition[i])
		ref.update({[i]:composition[i]})
	}


	if(direction < 0){//delete
		ref.child(length).remove()
		return
	}else if(apendix){//insert
		ref.update({[index]:[instance,apendix]})
	}else{//append
		ref.update({[index]:[instance,0]})
	}
	
//	ref.update({[length]:composition[length-1]})
}
