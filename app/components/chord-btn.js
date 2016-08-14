import Ember from 'ember';

export default Ember.Component.extend({
	tagName:"td",
	classNameBindings:['value:chordbtn'],
	value:true,
	name:"+",
  fret:Ember.computed({
    set(_,amount)
    {
      console.log(amount,'fret set chord-btn')
      return amount
    }
  }),
	actions:{
		toggleSelected(string,fret){
			console.log([string,fret], 'chord-btn action')
			this.sendAction('action',string,fret)
		}
	}

});
