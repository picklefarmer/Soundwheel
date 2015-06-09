function play_tone(freq,volume) {
 
  var samples = [];
  var samples_length = 44100;            // 1 second (44.1 KHz)
  for (var i=0; i<samples_length; i++) { // fills array with samples
    var t = i/samples_length;            // time from 0 to 1
    // Generate samples using sine wave equation (between 0 and 255)
    samples[i] = 128+Math.round(127*Math.sin(freq*2*Math.PI*t));
  }
 
  var wave = new RIFFWAVE();          // Create raw wav file
      wave.header.sampleRate = 44100; // 44.1Khz (1 second)
      wave.header.numChannels = 1;    // 1 channel (mono)
      wave.Make(samples);
 
  var audio = new Audio();    // Create <audio> tag
      audio.src=wave.dataURI;
	  audio.volume=volume
return audio

}	

App.WebaudioService = Em.Service.extend({
     instruments:Em.inject.service(),
     tone(freqs,volume){

        return this.get('toneObject')
                   .create({
                      instruments:this.get('instruments')
                      ,freqs:freqs
                   })
     },
     toneObject:Em.Object.extend({
//        freqs,
          init(){
              var tone = this.get('tone'),
                  ctx = this.get('ctx'),
                  ac = this.get('ac');
          var I = this.get('instruments.organ')
          tone.setPeriodicWave(ac.createPeriodicWave(I.real, I.imag));
              tone.connect(ctx)
              ctx.gain.value = 0.135
              tone.start(0)
              ctx.connect(ac.destination)

          },
          freq:function(name,tone){
            return this.get('freqs').objectAt(tone)
          }.property('freqs'),
          ac:new (window.AudioContext || window.webkitAudioContect),
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


