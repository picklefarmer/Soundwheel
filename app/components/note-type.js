import Ember from 'ember';
import whole_note from './functions/whole_note';
import half_note from './functions/half_note';
import quarter_note from './functions/quarter_note';
import eight_note from './functions/eight_note';
/*temp*/
//import test_note from './functions/test_note';

export default Ember.Component.extend({
  classNames:"note-type",
  notes:[
    whole_note,
    half_note,
    quarter_note,
    eight_note
    ],
  actions:{
    select(name){
      console.log(name,'select type')
      this.set('selection',name)
    }
  }
});
