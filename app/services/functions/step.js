import Ember from 'ember';
export default function(direction,ctrl){
console.log(this.get('song.isBeat'), 'isBeat')


	if(this.get('song.isBeat')){
		if(ctrl && this.get('song.beatInputIndex')===undefined){
			this.set('song.beatInputIndex',this.get('song.beat'))
		}
		this[direction]('song.beat')
	}else if(this.get('song.isPart')){
		if(ctrl && this.get('song.partInputIndex')===undefined){
			this.set('song.partInputIndex',this.get('song.selected.compIndex'))
		}
		this[direction]('song.selected.compIndex')
		console.log(this.getProperties('song.selected.part'))
	}else{
		if(ctrl && this.get('song.inputIndex')===undefined){
			this.set('song.inputIndex',this.get('song.selected.index'))
		}
		this[direction]('song.selected.index')
	}
}
