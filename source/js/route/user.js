App.UserRoute = Em.Route.extend({
  auth:Em.inject.service(),
  actions:{
    login: function(){
      this.auth.login() 
    },
    logout: function(){
      this.auth.logout() 
    }

  }
})


