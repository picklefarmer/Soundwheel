App.CheckOptionComponent = Em.Checkbox.extend({

    checkedBinding:'option',

    optionsCheck:Em.computed('option',{
		get(){
			return this.get('parentView.options').get(this.get('name'))
		}
		
	}),

	name:Em.computed({
		set(_,f){
			this.set('option',Em.computed.alias('parentView.options.song.'+f))
			return f  
		}
	})

})


