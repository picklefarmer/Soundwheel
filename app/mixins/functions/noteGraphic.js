

const scale = 36;
const rate = 19;
//original rate 16
const playRATE=6;
var hot = new chroma.scale(['black', 'red', 'yellow', 'white']).domain([0,rate]);
//original playRate 10

const scaleUp = function(x,y,print,m){
			this.beginPath()
			this.fillStyle = hot(m)
			this.arc(	x , y, (rate-m)+1,	0,	2*Math.PI)
 			this.closePath();
		 	this.fill()
},
			noteMoji=function(x,y,print,m){
				m = rate - m
				this.fillStyle = hot(m)
				this.font = (m*0.25)+"rem Georgia"
				this.fillText(print,x-m,y+m)

			},

			upImp		= function(x,y,print,stanza){
				let m = rate;

				while(m--){
					setTimeout((m)=>{
							requestAnimationFrame(()=>{
								this.clearRect(x-20,y-20,40,40)
								scaleUp.call(this,x,y,print,m)
								noteMoji.call(this,x,y,print,m)
							})
					},m*stanza,m)
				}
			/*	setTimeout(()=>{
					this.clearRect(x-20,y-20,40,40)
				},rate*playRATE)
*/
			};

export default function(boardX,boardY,print,stanza){
				upImp.call(this,boardX,boardY,print,stanza)
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
*/
}
