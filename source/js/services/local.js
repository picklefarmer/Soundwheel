
App.LocalService = Em.Service.extend({
  selected:function(_,selected = "fizz",oldSelected){
    console.log(_,selected,oldSelected)
    _ = this;
    new Em.RSVP.Promise((res,rej)=>{
      var om = JSON.parse(JSON.parse(localStorage.songs)[selected])
      console.log('promise')
      res(_.set('songSelection',om))
    })
    return selected
  }.property(),

  debugOfChords:function(){
   return "e"
  }.property(),
  chords(res,rej){
    console.log('in chords')
      var om = JSON.parse(localStorage.chords)
      res(om)
  },
  names:function(res,rej){

    var names = Object.keys(JSON.parse(localStorage.songs))
    res( Em.A(names) ) 
//    return Em.A(names) //|| ["fizz","fuzz"]
  }

})
