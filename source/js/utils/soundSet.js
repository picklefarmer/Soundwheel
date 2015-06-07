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


App.TonesService = Em.Service.extend({
    webaudio:Em.inject.service(),
    strings:function(){
    //  console.log('init from notes' ) 
    var notesMap = [ ],
        octaves =     [.5,1,2,4],
        strings = [ ],
        string = 5,
        frequencies = [
                   		261.63,	//	0
              				277.18,	//	1
              				293.66,	//	2 
              				311.13,	//	3 
              				329.63,	//	4 
              				349.23,	//	5 
              				369.99,	//	6 
              				392,	  //	7
              				415.3, 	//	8
              				440,	  //	9	
              				466.16,	//	10 
              				493.88  //	11 
                      ];
        notesMap  = octaves
                      .map( multiplier => frequencies
                      .map( frequency => multiplier * frequency ))
                      .reduce((e,f)=>e.concat(f))
        while(string >= 0){
          let start; 
          switch(string){
              case 5:  start = 4 + ( 4*5 ) + 4 ;break;
              case 4:  start = 4 + ( 3*5 ) + 4 ;break;
              default: start = 4 + ( string*5 );break;
          }
           strings[string] = notesMap.slice(start,start+22)
           strings[string].unshift(1)
           string--
        }
        return strings.reverse()
      }.property(),
      init(){
        var strings = this.get('strings').map(this.get('webaudio.tone'),this.get('webaudio'))
        DEBUG = strings 
      //  console.log("STRINGS in service map",strings,this.get('strings'))
        this.set('tone',Em.A(strings))
      },
    
 })
