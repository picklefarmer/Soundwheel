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
				update(data){
						console.log(data,`action of the
											 	lyrics' pane`)
				this.set('song.selected.lyrics',data)
				}
    }


});
