//var hot = new chroma.scale(['rgba(0,0,0,0)', 'rgba(255,0,0,.5)', '#ffff00', '#ffffff']).domain([128,300]);
var hot = new chroma.scale(['black', 'red', 'yellow', 'white']).domain([128,256]);


export default function(a,ctx){
    let canvasCtx = ctx ;
		var canvas = this.get('options.graphViewCanvas');
		console.log(chroma, 'chroma')
		if(!canvas){
			return
		}
		

    var analyser = this.get('webaudio.analyser');
		analyser.fftSize = 1024
		analyser.smoothingTimeConstant = 0
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

		console.error(this.get('options.graphViewCanvas'),canvas)



		var tempCanvas = document.createElement("canvas"),
        tempCtx = tempCanvas.getContext("2d");
		canvas.width = WIDTH
		canvas.height= HEIGHT
		tempCanvas.width=WIDTH;
    tempCanvas.height=HEIGHT;
		
		requestAnimationFrame(()=>{
        draw.call(this,canvasCtx,analyser,bufferLength,dataArray,tempCtx,canvas,tempCanvas);
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
    })
}

const requestAnimationFrame = window.requestAnimationFrame;
const WIDTH = 1024;
const HEIGHT = 512;
const draw = function(ctx,analyser,bufferLength,dataArray,tempCtx,canvas,tempCanvas){

      requestAnimationFrame(()=>{
				if(this.get('isOsc'))
        draw.call(this,ctx,analyser,bufferLength,dataArray,tempCtx,canvas,tempCanvas)
      })  


      analyser.getByteTimeDomainData(dataArray);

 //     ctx.clearRect(0, 0, WIDTH, HEIGHT);

			tempCtx.drawImage(canvas,0,0,WIDTH,HEIGHT)
		
			var stretch = 4;//this.get('stanza');
console.error (stretch,bufferLength)
			for(var i = 0; i < bufferLength; i++) {
        let grade = dataArray[i];
        ctx.fillStyle = hot(grade).css();
								//'hsl(120,100%,'+ grade -120+'%)';

        ctx.fillRect ( WIDTH - stretch, HEIGHT -i,stretch,1) ;
      }

			ctx.translate(-stretch,0)
			ctx.drawImage(tempCanvas,0,0,WIDTH,HEIGHT, 0,0, WIDTH,HEIGHT)

			ctx.setTransform(1,0,0,1,0,0)

    };


