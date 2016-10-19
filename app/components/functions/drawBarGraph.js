export default function(a,ctx){
    let canvasCtx = ctx ;
    var analyser = this.get('webaudio.analyser');
		console.log(analyser.fftSize)
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    
    requestAnimationFrame(()=>{
        draw.call(this,canvasCtx,analyser,bufferLength,dataArray);
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
    })
}

const requestAnimationFrame = window.requestAnimationFrame;
const WIDTH = 1400;
const HEIGHT = 300;
const draw = function(ctx,analyser,bufferLength,dataArray){
console.error('bar')
      requestAnimationFrame(()=>{
				if(this.get('isOsc'))
        draw.call(this,ctx,analyser,bufferLength,dataArray)
      })  

      analyser.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, WIDTH, HEIGHT);

			var barWidth = (WIDTH / bufferLength) * 2.5;
      var barHeight;
      var x = 0;
			
			for(var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]/2;

        ctx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        ctx.fillRect(x,HEIGHT-barHeight,barWidth,barHeight);

        x += barWidth + 1;
      }
    };


