import Ember from 'ember';
import Clock from '../mixins/clock';

export default Ember.Component.extend(Clock,{
	classNames:['menu-bar'],
//    settings:Em.inject.service(),
  song:Ember.inject.service(),
  icon:'\uD83D\uDD61',
	titleTask:Ember.computed('song.selected.selection',function(){
		return this.get('song.selected.selection')
	}),
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
	willRender(){
		console.error( this.get('y'), 'y')
	},
	isOnline:Ember.computed('song.onLine',function(){
		if(this.get('song.onLine')){
			return this.get('song.options.pairingParam')
		}else{
			return 'offline'
		}
	}),
	songOptions:['edit','lyrics','stave','chord'],
	actions:{
		click(){
		  this.toggleProperty('barVisible')
    },
	},
	menuArray:[],
  menuBar:function(){
   // this.get('logger.menuBar')
   //   .then(data => this.set('menuArray',data))
  }.on('init'),


});
