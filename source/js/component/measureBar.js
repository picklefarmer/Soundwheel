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

App.SelectSetComponent  =   Em.Component.extend({
    list:function(){
      var arr = [],
          property = this.get('bar.options');

          console.log(property, 'property of select-set component')

          arr = Object.keys(property).map( key  =>  {
                  return {"name":key,"hex":property[key]}
                }) 
      return arr
    }.property('bar.options'),
    actions:{

      updater:function(val,key){
        var main = this.get('main'),
            name = this.get('bar.name'),
            hash = {};
            hash[key] = val;

        main.set(name+".options."+key,val)
        Em.run(main,main.get("update"),hash ,name+"/options/")

       console.log(val,key,'_root actions')


//         this.sendAction('action',val,key)
      }
   }
})

App.OptionTypeComponent   = Em.Component.extend({
  actions:{
    updater(val,index){
      var main = this.get('main'),
          option    = this.get('bar.name');
      console.log(main, "should be main", index !== undefined)

      if(index !== undefined){
        console.log('main',"index found", index, val)
        main.set(option+'.options.'+index,val)
      }else{
        console.log('main',"No index ", index, val)
        this.set('bar.options',val)
      }
        console.log(main.get(option).options,this.get('bar.options'))
        main.set(option+'.options',this.get('bar.options'))

      Em.run(main,main.get('update'),this.get('bar'))
      console.log('option type action') 
    }
  }
})

App.SelectRangeComponent  =   Em.Component.extend({
  actions:{
  
    updater:function(val,index){
      console.log(val,index,'_root actions')
        this.sendAction('action',val,index)
    }
  }

})

App.OptionSetComponent  =   Em.Component.extend({
  selected:function(_,I,II){
    console.log(II,I)
    if(I && II)
      if(I !== II)
        this.send('updater',I, this.get('index')) 

    return I || this.get('selection') || this.get('bar.options')
  }.property(),

  actions:{
    updater:function(val,index){
      this.sendAction('action',val,index)
      console.log('actions',val,index)
    }
  }
})

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

App.BooleanSwitchComponent = Em.Component.extend({
  checkedObserver:function(){
      if(this.get('action')){
         this.set('main.'+this.get('bar.name')+".enabled",
                  this.get('bar.enabled'))
      }
     Em.run(this.get('main'),'update',this.get('bar'))
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

