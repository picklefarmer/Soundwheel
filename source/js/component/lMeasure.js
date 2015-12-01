App.LMeasureComponent = Ember.Component.extend({

	classNameBindings:'active:hit',
	tagName:"li",

	measure:Em.computed('index',{
		get(){
			var measure = this.get('index').toString()

			if(	measure[1] ){
				return measure
			}

			return "0"+measure
		}
	}),

    envelope:Em.computed('boundValue',{
		get(){
      		return this.get('boundValue')
		}
	}),

	click(e,f){
		let ii = this.get('index')

        //this.set('parentView.song.selected.index',ii)
        this.set('boundValue',ii)
	},
})


