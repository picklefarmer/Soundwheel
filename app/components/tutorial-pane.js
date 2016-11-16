
import Ember from 'ember';
export default Ember.Component.extend({
  song:Ember.inject.service(),
  classNames:['tutorial-pane'],
  actions:{
    incInd(){
      this.incrementProperty('imageIndex');
    }
  },
  images:[
    'omni_bar',
    'chord_dash'
  ],
  imageIndex:Ember.computed('images',{get(){return "0"},
    set(_,a){
      return (a%this.get('images.length'))+""
    }
  }),
  imageSrc:Ember.computed('imageIndex',function(){
    return this.get('images').objectAt(this.get('imageIndex'))
  })
})
