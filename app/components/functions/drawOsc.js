export default function(a,ctx){
    let canvasCtx = ctx ;
    var audioCtx = this.get('webaudio.ac')
    var analyser = this.get('webaudio.analyser');
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    
    requestAnimationFrame(()=>{
        draw.call(this,canvasCtx,analyser,bufferLength,dataArray);
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
    })
}
const requestAnimationFrame = window.requestAnimationFrame;
const WIDTH = 1400;
const HEIGHT = 256;


const plain = function(x,ctx,dataArray,bufferLength,sliceWidth){   
     
			 ctx.beginPath()	
		for(var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;


        if(i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
		}
			 ctx.stroke()
},
	valued = function(x,ctx,dataArray,bufferLength,sliceWidth){
	
    for(var i = 1; i < bufferLength; i++) {
			let v1 = dataArray[i-1] / 128.0;
			let v2 = dataArray[i] / 128.0;

			ctx.beginPath()
			ctx.strokeStyle = hot(v1)	
			ctx.moveTo(x,v1*HEIGHT/2)
			ctx.lineTo(x+sliceWidth,v2*HEIGHT/2)
			ctx.stroke()

      x += (sliceWidth);
		}				
};

const draw = function(ctx,analyser,bufferLength,dataArray){

      requestAnimationFrame(()=>{
				if(this.get('isOsc'))
        draw.call(this,ctx,analyser,bufferLength,dataArray)
      })  

      analyser.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      ctx.lineWidth = 4;

			var gradient=ctx.createLinearGradient(150,0,150,300);
			const hot = chroma.scale(['red','yellow','white'])
			let osp = 6;
			let ospStop = 1/osp;
			for ( var s = 0; s < 1; s+=ospStop){
				gradient.addColorStop(s,hot(s));
			}
      ctx.strokeStyle = gradient;//'white';

      var sliceWidth = WIDTH * 1.0 / bufferLength;
      var x = 0;

      plain(x,ctx,dataArray,bufferLength,sliceWidth)
      //valued(x,ctx,dataArray,bufferLength,sliceWidth)
    };


