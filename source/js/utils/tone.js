
App.WebaudioService = Em.Service.extend({
  instruments:Em.inject.service(),
  song:Em.inject.service(),

  tone(freqs,volume){
  
      return  this.get('toneObject')
                  .create({
                    instruments:this.get('instruments'),
                    freqs:freqs,
                    masterVolume:this.get('masterVolume'),
                    ac:this.get('ac')
                   })
  },

  masterVolume:function(){
    var ac = this.get('ac'),
        gain = ac.createGain();
        gain.connect(ac.destination)

        return gain
  }.property(), 
  

  masterVolumeObserver:function(_,I){
    console.log('value on masterVolume Observer')
  
    this.get('masterVolume').gain.value = I || .06
  }.property('song.volume'),
  ac:function(){
    return  new (window.AudioContext || window.webkitAudioContect || Object)
  }.property(),

  toneObject:Em.Object.extend({
    init(){
      var MV   = this.get('masterVolume'),
          tone = this.get('tone'),
          ctx  = this.get('ctx'),
          ac   = this.get('ac');

      console.log('tone init')
      this.get('instruments.selected')
      Em.run(this,"instrumentObserver")
      this.get('tone').start(0)
      tone.connect(ctx)
      ctx.gain.value = 0.135
      ctx.connect(MV)

    },
    
    instrumentObserver:function(){
     
      console.log('tone init_instrumentObserver')

      var instrument = this.get('instruments.selected');

      if(instrument){
        let tone = this.get('tone'),
            ctx = this.get('ctx'),
            ac = this.get('ac'),
            W,
            I;  
       
        if( typeof instrument === "object"){
          
          I = this.get('instruments.selected');
          W =  ac.createPeriodicWave(  I.real, I.imag)
          console.log(I,"tone object map")

          tone.setPeriodicWave(W);

        }else if(typeof instrument === "string"){
          W= ac.createPeriodicWave(new Float32Array([0.0,0.0]),
                                   new Float32Array([1.0,1.0]));
          tone.setPeriodicWave(W)
          console.log('default') 
        }
      }   

    }.observes('instruments.selected'),

    freq:function(name,tone){
      return this.get('freqs').objectAt(tone)
    }.property('freqs'),
    
     ctx:function(){
      return this.get('ac').createGain()
    }.property('ac'),

    tone:function(){
      return this.get('ac').createOscillator()
    }.property('ac'),

    play:function(){
      var ctx = this.get('ctx'),
          tone= this.get('tone'),
          currentTime = ctx.context.currentTime;
      
      ctx.gain.exponentialRampToValueAtTime(0.5,currentTime+.125)
      tone.frequency.exponentialRampToValueAtTime(this.get('freq'),currentTime)
      ctx.gain.exponentialRampToValueAtTime(0.01,currentTime+1)
    }.observes('freq'),

    pause(){
      // console.log( 'pause' ) 
      this.get('ctx').gain.exponentialRampToValueAtTime(0.01,this.get('ctx').context.currentTime)
    	//this.ctx.disconnect()
    },

    volume:function(value){
  		this.get('ctx').gain.value = value;
    
  	}.property()
  })
})


