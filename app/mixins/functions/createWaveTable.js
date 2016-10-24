export default function(ac){
var real = new Float32Array(32),
		imag = new Float32Array(32);

var a1 = 0.0,
		b1 = 1.0;
var shift = 2 * Math.PI * 0.5;

real[1] = a1 * Math.cos(shift) - b1 * Math.sin(shift);
imag[1] = a1 * Math.sin(shift) + b1 * Math.cos(shift);


	return ac.createPeriodicWave(real,imag)


}
