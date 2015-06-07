App.LogInComponent = Em.Component.extend({
  variab:"TRICK:",
  actions:{
    logout(){
      this.sendAction('logout')
    },
    login(){
      this.sendAction('login')
    }
  }
})
