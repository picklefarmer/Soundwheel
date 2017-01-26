export default function(b,dots,size,height,color){

					b.fillStyle = color["fret marker"] // "hsl(180,11%,32%)"
					dots = 4
					height = height/2
					while(dots--){
						let length = size*3.5+3+(dots*size*2);
						b.beginPath()
						b.arc(length,height,16,0,2*Math.PI)
						b.fill()
					}

					dots = 4;

					while(dots--){
						let length = size*3.5+3+(dots*size*2);
						b.beginPath()
						b.arc(size*15.5+3+(dots*size*2),height,16,0,2*Math.PI)
						b.fill()
					}

					dots = 2;
		
					while(dots--){
						let length = size*3.5+3+(dots*size*2);
						b.beginPath()
						b.arc(size*12.5+3,75+(height)*dots,16,0,2*Math.PI)
						b.fill()
					}
}
