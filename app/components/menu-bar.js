import Ember from 'ember';

export default Ember.Component.extend({
//	classNameBindings:['col-lg-12'],
//    settings:Em.inject.service(),
	menubar:"menubar",
	barVisible:true,
	sidebar:"sidebar",
	active:"song",
	actions:{
		click(){
		  this.toggleProperty('barVisible')
    },
   	forActive:function(e){
	  	//	console.log(e)
	  	//	this.notifyPropertyChange('active')
		this.set('active',e)
	  	//	console.log(this.get('active'))
		}
	},
	menuArray:[],
  menuBar:function(){
   // this.get('logger.menuBar')
   //   .then(data => this.set('menuArray',data))
  }.on('init'),


});
