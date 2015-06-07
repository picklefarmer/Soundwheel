
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


Em.Application.initializer({
  name:"firebase-compile",

  initialize(container,App){

    		App.inject('component:menu-bar', 'logger', 'login:side')
    		App.inject('route:song',	 'settings', 'settings:side')
        App.inject('component:pa-nels','settings', 'settings:side')
        App.inject('component:tool-bar','settings', 'settings:side')

        App.inject('component:option-panel','song', 'service:song')
        App.inject('component:play-bar','song', 'service:song')
        App.inject('component:measure-bar','song', 'service:song')
        App.inject('component:fret-board','options', 'service:options')
        App.inject('component:fret-board','song', 'service:song')
        App.inject('controller:song','song', 'service:song')
//        App.inject('view:song','song', 'service:song')

        App.inject('component:pa-nels','_actions', 'settings:actions')
        App.inject('route:user', 'auth', 'service:auth')
        App.inject('component:log-in', 'auth', 'service:auth')

    }

})

var DEBAG;

App.register('service:local',Em.Object.extend({
  //play properties

  /*
  score:function(_,nw,ld){
    return this.get('songSelection') || Em.A([[]])
  }.property('songSelection'),
 */
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
  /*
  chordBank:function(_,nw){
    console.log(nw, "BANK CHORD")
    return this.get('chordCache') || Em.A([[]]) 
  }.property('chordCache'),
*/
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

  /*
  chordSelection:function(_,I){
    console.log(I)
    return I 
  }.property(),
  index:function(a,b){
    console.log(b,"index")
    if(b < 0){
      b = this.get('score').length-1
    }
    a = b%this.get('score').length || 0;
    return a
  }.property('score.[]'),
/
  meter:function(){
    return ~~((60/(this.get('tempo')))*1000) 
  }.property('tempo'),
  bpm:320,
  tempo:function(_,__){
    return 2264 - this.get('bpm')
  }.property('bpm'),
  pause:false,
  cacheNotes:[[]],
  measure:function(){
    console.log('meaure in init',this.get('score'),this.get('score'))
    return this.get('score').objectAt(this.get('index'))
  }.property('index','score'),

  clock:function(){
    if(this.pause){ 
         this.incrementProperty('index')
         Em.run.later(this,'clock',this.get('tempo'))    
    }
  }.observes('pause'),
  tempChord:[],
 */
  names:function(){
    var names = Object.keys(JSON.parse(localStorage.songs))
    return Em.A(names) //|| ["fizz","fuzz"]
  }.property()
}))
