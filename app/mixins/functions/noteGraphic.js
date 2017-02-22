

const scale = 36,
			rate = 22,//original rate 16,19
			playRATE=6,//original playRate 10
			fulcrom	=	0.2234;
var hot = new chroma.scale(['black', 'red', 'yellow', 'white']).domain([0,rate]);
var spectral = new chroma.scale('Spectral').domain([0,8]);
// implement measureLength to domain top

const scaleUp = function(x,y,print,m,beat,color){
			this.beginPath()
			this.fillStyle = 'white'//	this.fillStyle = spectral(beat)
			this.arc(	x , y, (m)+1,	0,	2*Math.PI)
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
				this.font = m*fulcrom+"rem Georgia"
				//				this.fillStyle = '#997565'
				this.fillText(print,x-m*1.1 +4,y + m*.63 +4)
				//				this.strokeStyle = '#554545'
				this.strokeText(print,x-m*1.1 +4,y + m*.63 +4)
			},

      animationFrame= function(ctx,func,x,y,print,m,beat,color){
     		requestAnimationFrame(()=>{
						ctx.clearRect(x-24,y-24,48,48)
            func.forEach(func=>func.call(ctx,x,y,print,m,beat,color))
				})
      },
			tonesToHue		= function(ctx,x,y,print,stanza,rate){
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
				let m = 1,
			  		color = "#"+this.get('main.fretboard.options.notes'),	
            beat = this.get('beat');

				while(m++ < rate){
					setTimeout(animationFrame,m*stanza,ctx,[noteMoji],x,y,print,m,beat,color)
				}
			};

			/*	setTimeout(()=>{
					this.clearRect(x-20,y-20,40,40)
				},rate*playRATE)
*/

export default function(ctx,boardX,boardY,print,stanza,isMoji){
		if(isMoji){
			ctx.fillStyle = 'cornsilk';
			ctx.strokeStyle		=	'cornflowerBlue'
			upImp.call(this,ctx,boardX,boardY,print,stanza,func,args)
		}else{
			console.error(this,this.get('main'),this.get('main.fretboard.options.notes'))
      if(this.get('isToneToHue')){
				ctx.lineWidth = 6
			  tonesToHue.call(this,ctx,boardX,boardY,print,stanza,rate-3)
      }else{
			  ctx.fillStyle = "#"+this.get('main.content.fretboard.options.notes')	
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
