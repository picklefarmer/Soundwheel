App.InstrumentComponent = Em.Component.extend({
  name:null,
  tagName:'canvas',
	classNames:['tablature'],
  song:Em.inject.service(),
  //strings number
	height:function(){
    var size = 50;
    return (this.get('song.main.strings') * size) || 300
  
  }.property('song.main.strings'),
  //frets number
	width:function(){
    
    var size = 61.33; 
    return (this.get('song.main.frets') * size) || 1472
    
  }.property('song.main.frets'),

	attributeBindings:['id',"style","height","width"],
	style:function(_,y,x){
		//		console.log(_,this.get('x'),this.get('y'))
				x = 100;
//				x = 1220;
				y = 360;
				var v = "px;";
				var p = "%;";
	}.property(),

  didInsertElement:function(){
      var name = this.get('name'),
          ctx  = this.get('element').getContext('2d');

          this.set(name,ctx);
          ctx = this.get(name)

          this.get('parentView.options').set(name,ctx)
  },
	frontView:function(a,ctx){
				if(ctx){
					ctx.font="bolder 22px serif";
     			ctx.fillStyle = "white";//"rgba(155,155,155,.79)"
          ctx.strokeStyle = "white";

				}
				return ctx || null
		}.property(),
	centerView:function(a,ctx){
				if(ctx){
					ctx.font="bolder 22px serif"
				}
				return ctx || null
		}.property(),
	backView:function(a,b){
        //frets number
        //heighti

    console.log(this.get('song.main'),`song 
                . main .
                frets `)
				var frets   = this.get('song.main.frets') || 24,
            height  = this.get('height'),
            width = this.get('width'),
            dots = 2,
            L = 775,
					  size = Math.ceil(1600/24),
            fret = new Image();

				fret.src = "images/fret.jpg";
				console.log(width) 
		//	fret.src = "lightning.svg";
        //
				fret.onload = function(){

				  b.fillStyle = "#012";
		    //		b.fillRect(0,0,1600,300);
		    	b.fillRect(0,0,width,height);
					b.globalAlpha = .65;	
					b.save()
					b.translate(0,height)
					b.scale(1, -1)
					b.globalCompositeOperation = "lighter"

				  //while(dots--){
		//		b.drawImage(fret,600*dots,0,600,488)
				 // }
		//		b.drawImage(fret,2905,300)
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
				b.fillStyle = "#333333"
    //  b.stroke()
		
				dots = 4
				while(frets--){
				
				b.fillStyle = "hsl(180,11%,32%)"
					b.fillRect(size*frets,0,9,height)
				b.fillStyle = "hsl(180,11%,42%)"
					b.fillRect(size*frets+2,0,5,height)
				}
				
				b.fillStyle = "hsl(180,11%,32%)"
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
		}.property(),


})
