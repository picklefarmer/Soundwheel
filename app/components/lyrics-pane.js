import Ember from 'ember';
import Acts from './instances/lyricsActions';

export default Ember.Component.extend({
		acts:Acts,
		classNames:["lyrics","horizontal-align"],
//		classNameBindings:["full:horizontal-align"]
    song:Ember.inject.service(),
    full:false,
    fullPage:Ember.computed(function(){
    
      let fullPage = this.find('song.selected','lyrics');
      console.log(fullPage,'fullPage')
        return fullPage
    }),
    partsOrder:Ember.computed('song.selected.composition',function(){
			let names= this.get('song.selected.partNames');
      return this.get('song.selected.composition').map( function(e){
        return {name:names[e[0]],index:e[0],instance:e[1]}
      })
    }),
		isStats:true,
    actions:{
			toggleTools(){
				this.toggleProperty('isStats')
			},
			update(partInstance,instance,index,value){
					if(!value.length){return}
					if(this.get('song.onLine')){
							console.log(index,instance,partInstance,value,`action of the
											 	lyrics' pane`)

							this.get('song.group')
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
