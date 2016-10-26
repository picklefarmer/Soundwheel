window.onerror = function(e){
	window.alert(e)
}
const HEIGHT = 256,
			WIDTH	 = 400;
const plain = function(x,ctx,dataArray,bufferLength,sliceWidth){   
		     
	 ctx.beginPath()	
		for(var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 256;
        var y = v * HEIGHT/2;
        if(i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
		}
			 ctx.stroke()
},draw = function(ctx,analyser,bufferLength,dataArray){

      requestAnimationFrame(()=>{
        draw.call(this,ctx,analyser,bufferLength,dataArray)
      })  

      analyser.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      ctx.lineWidth = 4;

      ctx.strokeStyle = 'black';

      var sliceWidth = WIDTH*2 / bufferLength;
      var x = 0;

      plain(x,ctx,dataArray,bufferLength,sliceWidth)
      //valued(x,ctx,dataArray,bufferLength,sliceWidth)
};


import Ember  from 'ember';
import MF     from './functions/mouseFormat';
let audoContext = window.AudioContext || window.webkitAudioContext;
const ac 				= new audoContext(),
			gain			=	ac.createGain(),
			analyser	= ac.createAnalyser();
gain.gain.value = 0.25
gain.connect(ac.destination)
gain.connect(analyser)


const shift = function(a){
	return (2 * Math.PI) * a
};

var osc;

export default Ember.Component.extend({
	instruments:Ember.inject.service(),
	MF(E){
    var [ x , y ]	=	[
			E.offsetX == undefined ? E.pageX - (this.get('element').offsetLeft +40): E.offsetX,
			E.offsetY == undefined ? E.pageY - (this.get('element').offsetTop): E.offsetY
	  ];
    return [x,y]
  },	

//  tagName:"canvas"
	forAy:Ember.A([]),
	reUp(){
		if(osc){
			osc.stop(0)
			osc.disconnect(gain)
		}
		let a = this.get('forAy'),
				amount = a.length;

				a.height = HEIGHT


		var	imag = new Float32Array(amount),
				real = new Float32Array(amount);
				osc = ac.createOscillator();

		let a1= 0.0,
				b1= 1.0;

		for(var i = 1; i < amount; i++){
			real[i] = a1 * Math.cos(shift(a[i])) - b1 * Math.sin(shift(a[i]));
			imag[i] = a1 * Math.sin(shift(a[i])) + b1 * Math.cos(shift(a[i]));
		}
		this.set('instruments.selected',{real,imag})
		let wave = ac.createPeriodicWave(real,imag,{disableNormalization:true});
		osc.setPeriodicWave(wave)
		osc.connect(gain)
		osc.start(0)

	},
  attributeBindings:['style','width','height'],
  style:"border:black solid 4px",
  amount:16,
  width:600,
  height:300,
  actions:{
		hello(a){
			a = a.target
		//			this.set('ctx',a.target.getContext('2d'))
    let canvasCtx = a.getContext('2d');
    
		analyser.fftSize = 512;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    
    requestAnimationFrame(()=>{
        draw.call(this,canvasCtx,analyser,bufferLength,dataArray);
      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    })

		},
		up(){
			osc.stop(0)	
		},
    hold(e,f){
      console.log(e,f)
      let coords = this.MF(e),
					ctx 	=
      console.log( coords, 'ee')

      this.drawBar(e.target.getContext('2d'),coords)
    }
  },
  drawBar(ctx,[x,y]){
      let floorAmount = Math.floor(this.width/this.amount),
					getX				= Math.floor(x/floorAmount),
          ctxX        = getX*floorAmount,
          middleGround= this.height/2,
          forReal     = y< middleGround? 1-(y/middleGround):-(y-middleGround)/middleGround;
var gradient=ctx.createLinearGradient(150,0,150,300);
			const hot = chroma.scale(['red','yellow','white'])
			let osp = 6;
			let ospStop = 1/osp;
			for ( var s = 0; s < 1; s+=ospStop){
				gradient.addColorStop(s,hot(s));
			}
			ctx.fillStyle = gradient
      ctx.clearRect(ctxX,0,floorAmount,this.height)
      ctx.fillRect(ctxX,middleGround,floorAmount,y-middleGround)

			console.log(this.get('forAy'),'a')
			this.get('forAy').replace(getX-1,1,forReal)
			this.reUp()
      //console.log(middleGround,floorAmount,x,y,forReal)
      console.log(this.get('forAy'),forReal)
  },



});
