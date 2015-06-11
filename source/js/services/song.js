
App.SongService = Em.ObjectProxy.extend(App.UpdateMethods,{
    content:function(){
      var online = this.get('onLine')?"firebase":"local"
  
      return this.get(online)
    }.property('onLine'),
    onLine:false,
  
    score:function(_,nw,ld){
      return this.get('selected') || Em.A([{notes:[0,0,0,0]}])
    }.property('selected'),
      //}.property('songSelection'),
    
    measure:function(){
      console.log(`
                  measure
                  `)
      return this.get('score').objectAt(this.get('index')) || {notes:[]}
    }.property('index','score'),
  
    update:function(_,I){
  
      if(this.get('onLine'))
        Em.run(this.get('selected'),"salve",this.get('index'),I)
  
    }.property(),

    index:function(a,b){
      console.log(b,"index")
      if(b < 0){
        b = this.get('score.length')-1
      }
      a = b%this.get('score.length') || 0;
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
  

    chordSelection:function(_,I){
      console.log(I)
      return I 
    }.property(),
  
})
