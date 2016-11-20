

const scale = 36;
const rate = 19;//original rate 16
const playRATE=6;//original playRate 10
var hot = new chroma.scale(['black', 'red', 'yellow', 'white']).domain([0,rate]);
var spectral = new chroma.scale('Spectral').domain([0,8]);
// implement measureLength to domain top

const scaleUp = function(x,y,print,m,beat,color){
			this.beginPath()
				this.fillStyle = spectral(beat)
			this.arc(	x , y, (rate-m)+1,	0,	2*Math.PI)
 			this.closePath();
		 	this.fill()
},
			scaleDown = function(x,y,print,m,beat){
			this.beginPath()
			this.arc(	x , y,(rate- m),	0,	2*Math.PI)
 			this.closePath();
		 	this.fill()
			},
      
      toneToHue = function(x,y,print,m,beat){
			  this.beginPath()
			  this.fillStyle = spectral(beat)
			  this.arc(	x , y,(rate- m),	0,	2*Math.PI)
 			  this.closePath();
				this.stroke()
		 	  this.fill()
      },

			noteMoji=function(x,y,print,m,beat,color){
				m = rate - m
				this.fillStyle = color
				this.font = 1+(m*0.12075)+"rem Georgia"
				this.fillText(print,x-m,y+m)

			},

      animationFrame= function(ctx,func,x,y,print,m,beat,color){
     		requestAnimationFrame(()=>{
						ctx.clearRect(x-20,y-20,40,40)
            func.forEach(func=>func.call(ctx,x,y,print,m,beat,color))
				})
      },
			tonesToHue		= function(ctx,x,y,print,stanza){
				let m = rate,
            beat = this.get('beat');
				while(m-- > -1){
					setTimeout(animationFrame,m*stanza,ctx,[toneToHue],x,y,null,m,beat)
			  }
      },

      downImp		= function(ctx,x,y,print,stanza){
				let m = rate;

				while(m-- > -1){
					setTimeout(animationFrame,m*stanza,ctx,[scaleDown],x,y,null,m)
				}
			},
  		upImp		= function(ctx,x,y,print,stanza){
				let m = rate,
			  		color = "#"+this.get('main.fretboard.options.notes'),	
            beat = this.get('beat');

				while(m-- > -1){
					setTimeout(animationFrame,m*stanza,ctx,[scaleUp,noteMoji],x,y,print,m,beat,color)
				}
			};

			/*	setTimeout(()=>{
					this.clearRect(x-20,y-20,40,40)
				},rate*playRATE)
*/

export default function(ctx,boardX,boardY,print,stanza,isMoji){
		if(isMoji){
			upImp.call(this,ctx,boardX,boardY,print,stanza)
		}else{
			console.error(this.get('main.fretboard.options.notes'))
      if(this.get('isToneToHue')){
				ctx.lineWidth = 22
			  tonesToHue.call(this,ctx,boardX,boardY,print,stanza)
      }else{
			  ctx.fillStyle = "#"+this.get('main.fretboard.options.notes')	
			  downImp.call(this,ctx,boardX,boardY,print,stanza)
      }
		}
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
