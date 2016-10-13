const scale = 36;
const rate = 16;

export default function(boardX,boardY){
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
				this.strokeText("\u25B6",boardX-11,11+boardY)

}
