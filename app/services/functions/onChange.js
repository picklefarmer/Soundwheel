import Ember from 'ember';
/*
const bindProperty	= function(_){
	let [index,part] = this.scope;
			return ref.child(part,key+'/fretboard/'+index+'/'+_).on('value',this.raise)
};
*/

const fromObject = function(obj,length){
	//stanza count
	obj.length = length;
 	return Array.from(obj)	
}
export default function(ref,parts){

	console.log(ref,parts)
	var i = 0;
	for(let part of parts){
		let _part = part
		 //	Ember.ObjectProxy.extend({
		//	content:part,
		//	})
		//})
		let index = 0;
		for(let n of parts[i].fretboard){
			_part.fretboard[index] = Ember.Object.create({
				scope:[i,index],

				_map	:ref.child( i +"/fretboard/"+index+'/map'),
				_notes	:ref.child( i +"/fretboard/"+index+'/notes'),

				init(){
					this._map.on('value',this.raise,this)
					this._notes.on('value',this.raise,this)
				},
				raise(c,prev){
					if(c.key==='notes'){
						prev = c.val()
						prev = prev.length?prev:fromObject(prev,6)
						prev = prev.map( string => string.length?string:fromObject(string,8))
						this.set(c.key, prev ) 
					}else{
						console.log(c.key,c.val(),this.scope,'raise',this)
						this.set(c.key,c.val())
					}
				},
				isDestroying(){
					this._map.off()
					this._notes.off()
				}
					/*
					 * option  1: selected [ part.key ] .fretboard [ index ] 
					notes:Ember.computed(bindProperty.call(this,ref,part,index)),
					lyrics:Ember.computed(bindProperty.call(this,ref,part,index)),
					content:ref.child(part.key+"/fretboard/"+index),
					notes:Ember.computed('content',
					 *{	get:bindProperty }})
					 */
			})
			index+=1
		}
		parts[i++]=_part
	}
	console.log('onChange', parts,ref)
	return parts
}
