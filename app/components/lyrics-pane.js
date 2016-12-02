import Ember from 'ember';

export default Ember.Component.extend({
		classNames:["lyrics"],
    song:Ember.inject.service(),
    full:false,
    fullPage:Ember.computed(function(){
    
      let fullPage = this.find('song.selected','lyrics');
      console.log(fullPage,'fullPage')
        return fullPage
    }),
    partsOrder:Ember.computed('song.selected.composition',function(){
      return this.get('song.selected.composition').map( function(e){
        return {index:e[0],instance:e[1]}
      })
    }),
    actions:{
				update(partInstance,instance,index,value){
					if(!value.length){return}
					if(this.get('song.onLine')){
							console.log(index,instance,partInstance,value,`action of the
											 	lyrics' pane`)

							this.get('song.user')
								.child('songs/'+this.get('song.selected.selection')+'/parts/')
								.child(partInstance)
								.child('lyrics')
								.child(instance)
								.update({[index]:value})
					}
				//this.set('song.selected.lyrics',data)
				}
    }


});
