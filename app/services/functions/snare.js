export default function(mv){
	let audioContext = this;
    var osc3 = audioContext.createOscillator();
    var gainOsc3 = audioContext.createGain();
		var filterGain = audioContext.createGain();

    filterGain.gain.setValueAtTime(1, audioContext.currentTime);
    filterGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    osc3.type = "triangle";
    osc3.frequency.value = 100;
    gainOsc3.gain.value = 0;

    gainOsc3.gain.setValueAtTime(0, audioContext.currentTime);
    gainOsc3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    osc3.connect(gainOsc3);
    gainOsc3.connect(mv);


    osc3.start(audioContext.currentTime);
    osc3.stop(audioContext.currentTime + 0.2);

    var node = audioContext.createBufferSource(),
        buffer = audioContext.createBuffer(1, 4096, audioContext.sampleRate),
        data = buffer.getChannelData(0);

    var filter = audioContext.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(100, audioContext.currentTime);
    filter.frequency.linearRampToValueAtTime(1000, audioContext.currentTime + 0.2);


    for (var i = 0; i < 4096; i++) {
        data[i] = Math.random();
    }
    node.buffer = buffer;
    node.loop = true;
    node.connect(filter);
    filter.connect(filterGain);
    filterGain.connect(mv);
    node.start(audioContext.currentTime);
    node.stop(audioContext.currentTime + 0.2);

}
