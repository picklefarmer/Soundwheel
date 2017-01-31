import Ember from 'ember';
const height 	= 46,
			width		=	60,
			fontSize=	12,
			lineWidth=4,
			factor	=	2,
			budge		=	factor*16;

export default Ember.Component.extend({
	tagName: 'canvas',
	didInsertElement(){

	const canvas  = this.get('element'),
        graphic = this.get('graphic');


    canvas.style.height = height+'px'
    canvas.style.width  = width+'px'
		canvas.height = height*factor
		canvas.width = width*factor
		canvas.style['image-rendering']='pixelated'

		let _ = canvas.getContext('2d');

		//_.fillRect(0,0,width,height)
    //    _.fill()
    _.font  =   fontSize+'rem monotype'
    _.textAlign = 'center'
    _.lineWidth = ''+lineWidth;
    _.strokeStyle = 'rgb(241, 144, 163)'
    requestAnimationFrame(()=>{
      _.fillStyle = 'rgb(192,144,4)'

      _.fillText(graphic,30+budge,40+budge+fontSize)
      _.strokeText(graphic,30+budge,40+budge+fontSize)
	  	//_.stroke()
    })

	//	return canvas

	}

});
