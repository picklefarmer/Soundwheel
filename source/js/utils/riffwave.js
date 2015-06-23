/*
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
*/

