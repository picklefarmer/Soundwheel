App.SelectMeComponent = Ember.Component.extend({
  content:[],
  actions:{
    updateSelected(value){
      this.set('selection',value)
    }
  },
  selection:"null"
})
