App.RsvpProxy = Em.Object.extend(Em.PromiseProxyMixin)

App.UpdateMethods = Ember.Mixin.create({
  firebase:Em.inject.service(),
  local:Em.inject.service(),
  init(bravo){
    console.log('mixin init',bravo)
  },
  chordSave(){
    var chords = this.get('chordBank');
    var chords = JSON.stringify(this.get('chordBank'));
        
        localStorage.chords = chords 
  },

  promise(method){
    var promise = new Em.RSVP.Promise((res,rej) =>{
            Em.run(this.get('content'),method,res,rej)
        })
        return App.RsvpProxy.create({promise: promise})
  }, 

  chords:function(_){
    return this.promise(_)
  }.property('onLine'),

  names:function(_){
    return this.promise(_)
  }.property('onLine')

})


App.SongService  = Em.ObjectProxy.extend(App.UpdateMethods,{
  content:function(){
    var online = this.get('onLine')?"firebase":"local"

    return this.get(online)
  }.property('onLine'),
  onLine:false,

  score:function(_,nw,ld){
    return this.get('songSelection') || Em.A([{notes:[0,0,0,0]}])
  }.property('songSelection'),
  
  measure:function(){
    console.log('meaure in init',this.get('score'),this.get('score'))
    return this.get('score').objectAt(this.get('index')) || {notes:[]}
  }.property('index','score'),

  index:function(a,b){
    console.log(b,"index")
    if(b < 0){
      b = this.get('score').length-1
    }
    a = b%this.get('score').length || 0;
    return a
  }.property('score.[]'),

  meter:function(){
    return ~~((60/(this.get('tempo')))*1000) 
  }.property('tempo'),


  bpm:320,

  tempo:function(_,__){
    return 2264 - this.get('bpm')
  }.property('bpm'),

  pause:false,

  cacheNotes:[[]],

  clock:function(){
    if(this.pause){ 
         this.incrementProperty('index')
         Em.run.later(this,'clock',this.get('tempo'))    
    }
  }.observes('pause'),

  tempChord:[],

  chordSelection:function(_,I){
    console.log(I)
    return I 
  }.property(),

  update(params){
    console.log('asdfasdf',params)    
    if(this.get('onLine')){
        this.get('user')
            .child('songs/'+this.get('selected')+"/"+this.get('index'))
            .update({notes:params.toArray()})
    }

  },



})
