
export default Ember.Component.extend({
  actions:{
    update(val){
			console.log('action from select-property')	
      this.action(val)
    }
  }
})
