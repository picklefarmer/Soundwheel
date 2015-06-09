App.UserRoute = Em.Route.extend({
  actions:{
    login: function(){
      this.auth.login() 
    },
    logout: function(){
      this.auth.logout() 
    }

  }
})


