import Ember from 'ember';

export default Ember.Component.extend({
  classNames:['color-box'],
  didInsertElement(){
    var index = this.get('index'),
        color = this.get('color');


    console.log('init rgb pallet',color,index)

     Ember.$(this.get('element')).colpick({
    	colorScheme:'light',
    	layout:'rgbhex',
    	color:color,
    	onSubmit:(hsb,hex,rgb,el)=> {
            
	    	Ember.$(el).css('background-color', '#'+hex);
	    	Ember.$(el).colpickHide();
        console.log('hex Submit')

//        this.set('color',hex)
        this.sendAction('action',hex)
    	}
    }).css('background-color', '#'+color)

  },   
  willDestroyElement(){
    Ember.$('.colpick').remove()
  }

});
