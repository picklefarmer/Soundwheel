App.MeasureBarComponent = Ember.Component.extend({
    classNames:["scroll","sidebar"],
    time:Em.computed.oneWay('controller.editScore.length'),
    tagName:"ul",
    attributeBindings:["dims:style"],
    dims:function(i,ii,iii){
    let height = $(document).height(),
    	width =  (this.get('width') || 1)* ~~(height/18) +"px";
    	console.log( height, width) 
    	return "height:"+ height+"px;width:"+width
    }.property('width'),
    range:[1,2,3,4],
    
})

App.RgbPalletComponent = Em.Component.extend({
  didInsertElement(){
    console.log('init rgb palle')
     $('.color-box').colpick({
    	colorScheme:'dark',
    	layout:'rgbhex',
    	color:'ff8800',
    	onSubmit:function(hsb,hex,rgb,el) {
	    	$(el).css('background-color', '#'+hex);
	    	$(el).colpickHide();
    	}
    }).css('background-color', '#ff8800')
  }
})

App.BooleanSwitchComponent = Em.Component.extend({
  checkedObserver:function(){
    console.log(`
                check changed
                `,this.get('bar.options'),this.get('bar.enabled'))
      try{
        Em.run(this,this.get('update'),this.get('bar'))
      }catch(e){
        console.log(e)
      }
  }.observes('bar.enabled','bar.options'),
})

App.LMeasureComponent = Ember.Component.extend({
	classNameBindings:'active:hit',
	tagName:"li",
	measure:function(measure){
		measure = this.get('index').toString()
		if(	measure[1] )	{
			return measure
		}
			return "0"+measure

	}.property('index'),
	click:function(e,f){
			let ii = this.get('index')

        this.set('parentView.song.selected.index',ii)
	},
})

App.LiController = Ember.Controller.extend({
    needs: ['application'],
});

App.LyricsPaneComponent = Ember.Component.extend({
	classNames:"lyrics",
    song:Em.inject.service(),
    actions:{
      update(data){
        console.log(data)
      }
    }

})

