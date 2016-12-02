import Ember from 'ember';
import LiveObject from './liveObject';

const {get} = Ember;

const checkStasis = function(val){

	let newStat = val.numChildren(),
			oldStat	=	get(this,'length'),
			dif	=	Math.abs(oldStat - newStat);

	console.log({oldStat,newStat,dif}, ' this is of the part of the indexWatcher operation ')	
	if(	!dif )return

	if(newStat < oldStat){
		while(dif--){
			get(this,oldStat-dif-1).stop().popObject()
		}
	}else{
		while(dif--){
			this.pushObject(LiveObject.call(
						this,
						get(this,'ref')
							.child((oldStat-1)-dif)
						))
		}
	}
		
}

export default function(ref,childStat){

	return Ember.ArrayProxy.create({
		ref,
		childStat,
		start(){
			get(this,'ref').off()
			get(this,'ref').on('child_changed',checkStasis,this)
		},
		content:Ember.A([])
	}) 


}
