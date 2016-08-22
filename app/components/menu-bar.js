import Ember from 'ember';

export default Ember.Component.extend({
//	classNameBindings:['col-lg-12'],
//    settings:Em.inject.service(),
  song:Ember.inject.service(),
	menubar:"menubar",
	barVisible:false,
	sidebar:"sidebar",
	active:"song",
	isActive:Ember.computed('currentPath',function(){
		let active = this.get('currentPath').split('.');
		console.log(active, 'computed active')
		return {
					option:active[2],
					path:active[1]||active[0]
				}

	}),
	isOnline:Ember.computed(function(){
				return this.get('song.isOnline')?"online":"offline"
	}),

	songOptions:['edit','lyrics','stave','chord'],

	actions:{
		click(){
		  this.toggleProperty('barVisible')
    },
   	forActive:function(e){
			console.log(e, this,this.get('controller'), 'active action')
	  	//	console.log(e)
	  	//	this.notifyPropertyChange('active')
		//this.set('active',e)
	  	//	console.log(this.get('active'))
		}
	},
	menuArray:[],
  menuBar:function(){
   // this.get('logger.menuBar')
   //   .then(data => this.set('menuArray',data))
  }.on('init'),


});
