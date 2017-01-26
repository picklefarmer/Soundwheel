export default function(b,dots,size,height,color,front){

					var gibbos = 'white'; // "hsl(180,11%,32%)"
					front = "rgba(33,33,0,.5)"
					dots = 4
					height = height/2
					while(dots--){
						let length = size*3.5+3+(dots*size*2);
						b.fillStyle = gibbos
						b.beginPath()
						b.arc(length,height,16,0,2*Math.PI)
						b.fill()
						//b.beginPath()
						b.beginPath()
						b.fillStyle = front
						b.arc(length,height,16,0,Math.PI)
						b.fill()
					}
	
					b.fillStyle = gibbos
					dots = 4;

					while(dots--){
						let length = size*15.5+3+(dots*size*2);
						b.beginPath()
						b.fillStyle = gibbos
						b.arc(length,height,16,0,2*Math.PI)
						b.fill()
						b.beginPath()
						b.fillStyle = front
						b.arc(length,height,16,0,Math.PI)
						b.fill()
					}
					dots = 2;
		
					while(dots--){
						let length = size*12.5+3,
								depth		=	75+height*dots;
						b.fillStyle = gibbos
						b.beginPath()
						b.arc(length,depth,16,0,2*Math.PI)
						b.fill()
						b.beginPath()
						b.fillStyle = front
						b.arc(length,depth,16,0,Math.PI)
						b.fill()
					}
}
