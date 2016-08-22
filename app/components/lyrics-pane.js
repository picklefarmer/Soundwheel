import Ember from 'ember';

export default Ember.Component.extend({
		classNames:["lyrics",'form-control','field'],
    song:Ember.inject.service(),
    full:false,
    fullPage:Ember.computed(function(){
    
      let fullPage = this.find('song.selected','lyrics');
      console.log(fullPage,'fullPage')
        return fullPage
    }),
    actions:{
				update(data){
						console.log(data,`action of the
											 	lyrics' pane`)
				this.set('song.selected.lyrics',data)
				}
    }


});
