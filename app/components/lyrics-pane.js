import Ember from 'ember';

export default Ember.Component.extend({
		classNames:["lyrics",'form-control','field'],
    song:Ember.inject.service(),
    actions:{
				update(data){
						console.log(data,`action of the
											 	lyrics' pane`)
				this.set('song.selected.lyrics',data)
				}
    }


});
