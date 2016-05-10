import Ember from 'ember';

export default Ember.Component.extend({
//App.SwitchComponent = Em.Select.extend({
  content:['edit','muSong','song'],
		valueDidChange:function(a,b,c){
				console.log( a ,b , c ) 
//			this.get('controller').send('ride',this.get('value'),this.get('controller.model.y'))
		}.observes('value')

});
