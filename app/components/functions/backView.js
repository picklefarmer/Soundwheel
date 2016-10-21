import Ember from 'ember';

export default function(a,ctx ) {

	var areFrets = this.get('song.areFrets'),
			areStrings	=	this.get('song.areStrings');

        	//frets number
        	//heighti
					//


 	let b = ctx || this.get('ctx');
	/* console.log(b,this.get('song.main.frets.options'),`the song 
      														   . main .
												                frets `)
															   */

	var frets   = this.get('song.main.frets.options') || 24,
	            height  = this.get('height'),
    	        width = this.get('width'),
    	        color = ("#" + this.get('color.background')),
    	        dots = 2,
    	        L = 775,
							size = Math.ceil(1600/24),
	            fret = new Image();

				fret.src = "images/fret.jpg";
		//		console.log(width) 
				//	fret.src = "lightning.svg";

//				fret.onload =
				begin()
				function begin(){
					b.fillStyle = "rgba(33,33,0,.5)";//color; //"#012";
		    	//b.fillRect(0,0,1600,300);
	    		b.fillRect(0,0,width,height);
					b.globalAlpha = 0.65;	
					b.save()
					b.translate(0,height)
					b.scale(1, -1)
					b.globalCompositeOperation = "lighter"

					//while(dots--){
					//b.drawImage(fret,600*dots,0,600,488)
					// }
					//b.drawImage(fret,2905,300)
					//
					b.restore()

					b.fillStyle = color["fret marker"] // "hsl(180,11%,32%)"

					dots = 4

					while(dots--){
						b.beginPath()
						b.arc(size*2.5+3+(dots*size*2),height/2,16,0,2*Math.PI)
						b.fill()
					}

					dots = 4;

					while(dots--){
						b.beginPath()
						b.arc(size*14.5+3+(dots*size*2),height/2,16,0,2*Math.PI)
						b.fill()
					}

					dots = 2;
		
					while(dots--){
						b.beginPath()
						b.arc(size*11.5+3,75+(height/2)*dots,16,0,2*Math.PI)
						b.fill()
					}

					b.fillStyle = "rgba(44,77,150,.122)"
					b.lineWidth = "5"
          
					b.beginPath()
					b.moveTo(L,160)
					b.lineTo(L+25,160)
					b.lineTo(L-25,80)
					b.lineTo(L-5,140)
					b.lineTo(L-30,140)
					b.lineTo(L+20,220)
					b.closePath()
					b.fill()
				    //  b.stroke()
		
					if(areFrets){
						while(frets--){
							b.fillStyle = "hsl(180,11%,32%)"
							b.fillRect(size*frets,0,9,height)
							b.fillStyle = "hsl(180,11%,42%)"
							b.fillRect(size*frets+2,0,5,height)
						}
					}
		
					if(areStrings){	
					frets =6;

					while(frets--){
							b.fillStyle = "hsl(0,0%,5%)"
							b.fillRect(0,22+50*frets,width,6)
							b.fillStyle = "hsl(0,0%,40%)"
							b.fillRect(0,24+50*frets,width,3)
					}
       				}
					}
				return ctx
			}

