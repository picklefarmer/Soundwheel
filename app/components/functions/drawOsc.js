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
const HEIGHT = 300;
const draw = function(ctx,analyser,bufferLength,dataArray){

      requestAnimationFrame(()=>{
				if(this.get('isOsc'))
        draw.call(this,ctx,analyser,bufferLength,dataArray)
      })  

      analyser.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';

      ctx.beginPath();

      var sliceWidth = WIDTH * 1.0 / bufferLength;
      var x = 0;

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
      //this.lineTo(canvas.width, canvas.height/2);
//      this.lineTo(HEIGHT,WIDTH)/2;
      ctx.stroke();
    };


