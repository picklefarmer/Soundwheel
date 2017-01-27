import Moon from './../instances/moon';
export default function(b,dots,size,height,color){

					b.fillStyle = 'pink';//color["fret marker"] // "hsl(180,11%,32%)"
					b.font = "4rem Ariel"
					let phase = 1;
					dots = 4
					height = height/2 + 12
					while(dots--){
						let length = size*3.5-15+(dots*size*2);
						b.fillText(Moon(phase-=0.125),length,height)
						b.fill()
					}

					dots = 4;

					phase+=0.125
					while(dots--){
						let length = size*15.5-15+(dots*size*2);
						b.beginPath()
						b.fillText(Moon(phase-=0.125),length,height)
						//b.arc(size*15.5+3+(dots*size*2),height,16,0,2*Math.PI)
						b.fill()
					}

					dots = 2;
					phase = 0.5
					while(dots--){
						let length = size*12.5-15,
							depth = (150*dots)+87;
						b.beginPath()
						b.fillText(Moon(length),length,depth)
						//b.arc(size*12.5+3,75+(height)*dots,16,0,2*Math.PI)
						b.fill()
					}
}
