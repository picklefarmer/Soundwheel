export default function(mv){
				
		let audioContext = this;				
		var gainOsc4 = audioContext.createGain();
    var fundamental = 40;
    var ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];

    var bandpass = audioContext.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 10000;

    var highpass = audioContext.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 7000;


    ratios.forEach(function(ratio) {

        var osc4 = audioContext.createOscillator();
        osc4.type = "square";
        osc4.frequency.value = fundamental * ratio;
        osc4.connect(bandpass);

        osc4.start(audioContext.currentTime);
        osc4.stop(audioContext.currentTime + 0.05);
        
    });

    gainOsc4.gain.setValueAtTime(1, audioContext.currentTime);
    gainOsc4.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
    
    gainOsc4.connect(bandpass);
    bandpass.connect(highpass);
    highpass.connect(mv);
    
}
