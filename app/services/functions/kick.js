export default function(mv){
		let audioContext = this;

    var osc = audioContext.createOscillator();
    var osc2 = audioContext.createOscillator();
    var gainOsc = audioContext.createGain();
    var gainOsc2 = audioContext.createGain();

    osc.type = "triangle";
    osc2.type = "sine";
		let gain = 5;

    gainOsc.gain.setValueAtTime(gain, audioContext.currentTime);
    gainOsc.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
    

    gainOsc2.gain.setValueAtTime(gain, audioContext.currentTime);
    gainOsc2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
  

    osc.frequency.setValueAtTime(120, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

    osc2.frequency.setValueAtTime(50, audioContext.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

    osc.connect(gainOsc);
    osc2.connect(gainOsc2);
    //gainOsc2.connect(mixGain);
    //gainOsc.connect(mixGain);
    gainOsc.connect(mv);
    gainOsc2.connect(mv);

//    mixGain.gain.value = 1;

    osc.start(audioContext.currentTime);
    osc2.start(audioContext.currentTime);

    osc.stop(audioContext.currentTime + 0.5);
    osc2.stop(audioContext.currentTime + 0.5);



}
