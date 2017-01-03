import deleteIndex  from './reseat/reseatDelete';
import copyIndex  from './reseat/reseatCopy';
import appendIndex  from './reseat/reseatAppend';


export default function(index,update){

		let score 			= this.get('song.selected.part.fretboard.content'),
				partIndex	=	this.get('song.selected.partInstance'),
				ref	 			= this.get('song.user').child('songs/'+this.get('song.selected.selection')).child('parts/'+partIndex+'/fretboard/');

		switch(update){
			case undefined:	deleteIndex.call(this,score,partIndex,ref,index);break;
			case false		:	appendIndex.call(this,score,partIndex,ref,index);break;
			default				:	copyIndex.call(this,score,ref,index,update);break;

		}

	}

