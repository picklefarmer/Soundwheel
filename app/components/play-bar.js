import Ember from 'ember';
import edit from './instances/edit-base';
import lyrics from './instances/lyrics-base';
import chord from './instances/chord-base';
import omni from './instances/omni-base';

const butte = {
  chord,omni,edit,lyrics
};
export default Ember.Component.extend({

  song:Ember.inject.service(),
  classNameBindings:['inline:inline-block','playbar'],
  willRender(){
//    console.log(this.get('peep'),'peep')
  },
  buttons:Ember.computed('base', function(){
      console.log( butte[this.get('base').split('.')[2]], `this 
          is
          base`)
      return butte[ this.get('base').split('.')[2] ];
  }),

	
});
