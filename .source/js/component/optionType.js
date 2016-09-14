App.OptionTypeComponent   = Em.Component.extend({
  actions:{
    updater(val,index){
      var main = this.get('main'),
          option    = this.get('bar.name');
      console.log(main, "should be main", index !== undefined)

      if(index !== undefined){
        console.log('main',"index found", index, val)
        main.set(option+'.options.'+index,val)
        this.get('bar.options').replace(index,1,val)
      }else{
        console.log('main',"No index ", index, val)
        this.set('bar.options',val)
        main.set(option+'.options',this.get('bar.options'))
      }
//        console.log(main.get(option).options,this.get('bar.options'))
        main.set(option+'.options',this.get('bar.options'))

      Em.run(main,main.get('update'),this.get('bar'))
      console.log('option type action') 
    }
  }
})


