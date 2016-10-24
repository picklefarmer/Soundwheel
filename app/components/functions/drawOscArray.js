export default function(a,ctx){
    let canvasCtx = ctx ;
		var chord 		=	this.get('tones');

    	  ctx.lineWidth = 5;
     	 	ctx.strokeStyle = 'aliceblue';
		chord = chord.map( string => {
						let analyser = string.get('analyser');
						let toneIndex = string;
				    var bufferLength = analyser.frequencyBinCount;
    				var dataArray = new Uint8Array(bufferLength);
						return {analyser,dataArray,bufferLength,string};
		});
    
    requestAnimationFrame(()=>{
        draw.call(this,canvasCtx,chord);
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
    })
}

const requestAnimationFrame = window.requestAnimationFrame;
const WIDTH = 1400;
const HEIGHT = 300;
const sHeight= HEIGHT/6;
const vHeight= sHeight/2;
const ampl = sHeight;
const draw = function(ctx,chord){

      requestAnimationFrame(()=>{
				if(this.get('isOsc'))
        draw.call(this,ctx,chord)
      })  

  	  ctx.clearRect(0, 0, WIDTH, HEIGHT);
		
			chord.forEach(({analyser,bufferLength,dataArray,string},f)=>{

	      analyser.getByteTimeDomainData(dataArray);


     	 	ctx.beginPath();

     	 	var sliceWidth = WIDTH * 1.0 / bufferLength;
     		var x = bufferLength;


				let height = sHeight*f -vHeight;

				var stop = 316+string.get('toneIndex') *50;
      	for(var i = bufferLength; i > stop; i--) {
   
        	var v = dataArray[i] / 128.0;
        	var y = (v * ampl) + height;
        	if(i === bufferLength) {
        	 	ctx.moveTo(x, y);
        	} else {
         		ctx.lineTo(x, y);
        	}
        	x -= sliceWidth;
      	}
				ctx.lineTo(x,height+ampl)	
				ctx.lineTo(0,height+ampl)	
	      ctx.stroke();

			})

    };


