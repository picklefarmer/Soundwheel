import Ember from 'ember';
export default function(direction,ctrl){
console.log(this.get('song.isBeat'), 'isBeat')


	if(this.get('song.isBeat')){
		if(ctrl && this.get('song.beatInputIndex')===undefined){
						// .length
			//this.get('song.beatInputIndex').insertAt(0,1,this.get('song.beat'))
			this.set('song.beatInputIndex',this.get('song.beat'))
		}
		this[direction]('song.beat')
	}else if(this.get('song.isPart')){
		this[direction]('song.selected.partIndex')
	}else{
		if(ctrl && this.get('song.inputIndex')===undefined){
			//this.get('song.inputIndex').insertAt(0,1,this.get('song.selected.index'))
			this.set('song.inputIndex',this.get('song.selected.index'))
		}
		this[direction]('song.selected.index')
	}
}
