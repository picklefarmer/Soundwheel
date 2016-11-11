const barTypes = ['meter','measure','part'];
export default function(val){

	let current = barTypes.indexOf(this.get('song.barType'));

	val = current+val


	if(val > 2 || val < 0){
		return 	
	}else if(val === 0){
		this.set('song.isBeat',true)
	}else{
		this.set('song.isBeat',false)
	}
	if(val === 2){
		this.set('song.isPart',true)
	}else{
		this.set('song.isPart',false)
	}
	this.set('song.barType',barTypes[val]) 

};