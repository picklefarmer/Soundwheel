import Ember from 'ember';

export default Ember.Component.extend({
	name:null,
	tagName:'canvas',
	classNames:['tablature'],
	attributeBindings:['id',"height","width"], //STYLE
	song:Ember.inject.service(),
	options:Ember.inject.service(),
	//strings number
	color:Ember.computed('song.main.fretboard.options',{
		get(){
    		var color = this.get('song.main.fretboard.options')
			//console.log('color','changed',color)
		    return color
		}
	}),

	height:Ember.computed('song.main.strings.options',{
		get(){
	    	var size = 50;
    		//return (this.get('song.main.strings.options') * size) || 300
			return 300
		}
	}),

  //frets number
	width:Ember.computed('song.main.frets.options',{
		get(){
		    var size = 61.33; 
		/*	
		 	console.log(`width
						 was
						 set/changed
						`)
		*/
	   		return 1472
		 //   return (this.get('song.main.frets.options') * size) || 1472
		}
	}),

	style:Ember.computed({
		get(){
     
    		console.log('style two ',this.get('height'),this.get('width'))
    		return ""
		}
  	}),

	didInsertElement(){
    	//console.log('did Insert Element',this.get('name'))

      	var name = this.get('name'),
        	ctx  = this.get('element').getContext('2d');

        this.set('ctx',ctx)

        this.set(name,ctx);
        ctx = this.get(name)
        this.get('options').set(name,ctx)
	},

	frontView:Ember.computed('color',{
    	get(){
    		return this.get('ctx')
	    },  
    	set(a,ctx){
				ctx.font="bolder 22px serif";
     			ctx.fillStyle = "#"+this.get('color.notes')//"white";//"rgba(155,155,155,.79)"
				ctx.strokeStyle = "white";
				return ctx
	    }
	}),

	centerView:Ember.computed('color',{
    	get(){
        	this.get('ctx')
        },
      	set(a,ctx){
			ctx.font="bolder 22px serif"
			return ctx
      	}
	}),

	backView:Ember.computed('height','width','color',{
	    get(){
    		return this.get('ctx')
    	},
    	set(a,ctx){
        	//frets number
        	//heighti
        	let b = ctx || this.get('ctx')
/*		    console.log(b,this.get('song.main.frets.options'),`the song 
      														   . main .
												                frets `)
															   */
			var frets   = this.get('song.main.frets.options') || 24,
	            height  = this.get('height'),
    	        width = this.get('width'),
    	        color = ("#" + this.get('color.background'))
    	        dots = 2,
    	        L = 775,
				size = Math.ceil(1600/24),
	            fret = new Image();

				fret.src = "images/fret.jpg";
		//		console.log(width) 
				//	fret.src = "lightning.svg";

				fret.onload = function(){
					b.fillStyle = color; //"#012";
			    	//b.fillRect(0,0,1600,300);
		    		b.fillRect(0,0,width,height);
					b.globalAlpha = .65;	
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
		
					while(frets--){
				
					b.fillStyle = "hsl(180,11%,32%)"
					b.fillRect(size*frets,0,9,height)
					b.fillStyle = "hsl(180,11%,42%)"
					b.fillRect(size*frets+2,0,5,height)
					}
				
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
			
					frets =6;

					while(frets--){
						b.fillStyle = "hsl(0,0%,5%)"
						b.fillRect(0,22+50*frets,width,6)
						b.fillStyle = "hsl(0,0%,40%)"
						b.fillRect(0,24+50*frets,width,3)
					}
       			}
				return ctx
			}
	})

});
