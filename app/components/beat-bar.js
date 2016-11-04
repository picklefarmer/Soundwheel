

import Ember from 'ember';

export default Ember.Component.extend({

	song:Ember.inject.service(),
	classNames:["scroll","sidebar","bar-beat"],
	classNameBindings:['active:bar-hit'],
	willRender(){
    this.set('active',Ember.computed.equal('boundValue',this.get('index')))
  },

	tagName:"ul",
	kitSet:Ember.computed('kitBin',function(){
	
		let bin = this.get('kitBin').toString(2);
			while(bin.length <= 2){
				bin = "0"+bin
			}
		return bin
	}),
	actions:{
		valueUp(index){
			let set = this.get('kitSet'),
					list = set.split(''),
					v		= list[index];

				list[index] = +v ? 0 : 1
//			set.replace(index,1, +v ? 0 :1)
				let value = [parseInt(list.join(''),2)]

			this.get('song.measureKit').replace(this.get('index'),1,value)
			console.log(list,set,`value:${value}`,`list[index]:${v}`,index,this.get('song.selected.measure.kit'))
		}
	}


});
