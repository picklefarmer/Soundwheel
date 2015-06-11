
App.LocalService = Em.Service.extend({

  selected(res,rej,selection){

      var om = JSON.parse(JSON.parse(localStorage.songs)[selection])
      res(om)
  },

  chords(res,rej){

      var om = JSON.parse(localStorage.chords)
      res(om)
  },

  names:function(res,rej){

    var names = Object.keys(JSON.parse(localStorage.songs))
    console.log(names)
    res( Em.A(names) ) 
  }

})
