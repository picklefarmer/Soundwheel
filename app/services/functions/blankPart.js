import blank from './generateBlank';
import IndexWatcher from './indexWatcher';
import LiveObject from './liveObject';

export default function(ref,partIndex,online){
  let part = {
    name:null,
    lyrics:[[]],
		kit:[[0,0,0,0,0,0,0,0]]
	};
	if(!online){
    part.fretboard = [
      blank.call(this)    
  	  ]
	}else{
		part.fretboard	=	 IndexWatcher.call(this,ref.child(partIndex+'/fretboard/'),1)
		part.fretboard.pushObject(LiveObject.call(this,ref.child(partIndex+'/fretboard/0'),0,0))
	}
	return part
}
