import Ember from 'ember';
import Stave from './instances/stave';

export default Ember.Component.extend(Stave,{
  tagName:'canvas',
  attributeBindings:['height','width'],
  classNames: "note-length-btn",
  classNameBindings:'selected:hit',
  selected:Ember.computed('name','selection',function(){
    let name = this.get('name'),
        selection = this.get('selection');
    console.log( name, selection, 'note-btn selected toggle')
    return name === selection
  }),
  width:40,
  height:40,
  willRender(){

    let ctx = this.get('element').getContext('2d'),
        type = this.get('type');
        
        this.set('ctx',ctx)
        Ember.run(this,'renderGraphic',type)
  },

  renderGraphic(type){
    console.log(type, 'type function')
    type.call(this,2,4) 
  },

});
