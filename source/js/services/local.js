
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

  chordSave(){
    var chords = this.get('chordBank');
    var chords = JSON.stringify(this.get('chordBank'));
        
        localStorage.chords = chords 
  },

  chords:function(_,async,__){
    var _ = this;
    console.log("chords",async,__)
    if(!async){
      new Em.RSVP.Promise((res,ref)=>{
       var om = JSON.parse(localStorage.chords)
       console.log('promise chord')
       res(_.set("chordCache",om))
     })
    }
    return async 
  }.property(),

  names:function(){
    var names = Object.keys(JSON.parse(localStorage.songs))
    return Em.A(names) //|| ["fizz","fuzz"]
  }.property()

})
