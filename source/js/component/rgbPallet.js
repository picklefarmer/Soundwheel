App.RgbPalletComponent = Em.Component.extend({
  classNames:['color-box'],
  didInsertElement(){
    var index = this.get('index'),
        color = this.get('color')   ||  this.get('bar.options');


    console.log('init rgb pallet',color,index)

     $(this.get('element')).colpick({
    	colorScheme:'light',
    	layout:'rgbhex',
    	color:color,
    	onSubmit:(hsb,hex,rgb,el)=> {
            
	    	$(el).css('background-color', '#'+hex);
	    	$(el).colpickHide();
            console.log('hex Submit')
            this.sendAction('action',hex,this.get('name'))
    	}
    }).css('background-color', '#'+color)
  },   
  willDestroyElement(){
    $('.colpick').remove()
  }
})


