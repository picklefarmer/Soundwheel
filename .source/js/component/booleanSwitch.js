App.BooleanSwitchComponent = Em.Component.extend({
  checkedObserver:function(){
      if(this.get('action')){
         this.set('main.'+this.get('bar.name')+".enabled",
                  this.get('bar.enabled'))
      }
     Em.run(this.get('main'),'update',this.get('bar'))
  }.observes('bar.enabled','bar.options'),
})


