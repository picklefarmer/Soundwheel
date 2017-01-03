import Ember from 'ember';

const fromObject = function(obj,length){
	//stanza count
	obj.length = length;
 	return Array.from(obj).map( val => val===undefined?null:val)	
}

const liveObj = Ember.Object.extend({
		start(ref){
			console.log( 'starting object',ref.path.o[6])

			this.setProperties({
				_map	:ref.child('/map'),
				_notes:ref.child('/notes')
			})
			this._map.on('value',this.raise,this)
			this._notes.on('value',this.raise,this)
		
			return this
		},
		stop(){
			console.log( this._map.path.o[6], 'removing object')
			this._map.off()
			this._notes.off()
			return this
		},
		raise(update){
			let key = update.key,
					val	=	update.val();

			if(key	=== 'notes') {
				try{
					val = val.length? val : fromObject(val,6);
				}catch(e){
					console.error(e , this.get('_notes'),'notes')
				}
				val	= val.map( string => !string?	[]:string.length?
																	string:fromObject(string,8))
			}
			console.log(val,key)
			this.set(key,val)	
		}
});

export default function(ref,i,index){
	console.log( ' liveobjectpush ')
	return liveObj.create({
		scope:[i,index],
	}).start(ref)
}
