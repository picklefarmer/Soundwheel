const scale = 36;
const rate = 16;
const scaleUp = function(x,y,print,m){
			this.beginPath()
							console.log(m)
			this.arc(	x , y, 16-(m+1),	0,	2*Math.PI)
 			this.closePath();

			//		this.fillStyle = "white"
		 	this.fill()
},
			upImp		= function(x,y,print){
				let m = 16;

				while(m--){
					setTimeout((m)=>{
							requestAnimationFrame(()=>{
								this.clearRect(x-20,y-20,40,40)
								scaleUp.call(this,x,y,print,m)
							})
					},m*10,m)
				}

			};

export default function(boardX,boardY,print){
				upImp.call(this,boardX,boardY,print)
				/*
				this.beginPath()
 				this.arc(boardX,	
					boardY,
					((scale/2)/rate)*20 || l,
					0,
					2*Math.PI)
   			this.closePath();

				this.fillStyle = "white"
			 	this.fill()
				this.fillStyle = "black"
				this.font="4rem Georgia";
				this.strokeStyle = "black"
				this.strokeText(print,boardX-11,11+boardY)
*/
}
