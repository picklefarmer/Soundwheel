import Ember from 'ember';
const height 	= 46,
			width		=	60;

export default Ember.Component.extend({
	tagName: 'canvas',
	didInsertElement(){

	const canvas  = this.get('element'),
        graphic = this.get('graphic');


    canvas.style.height = height
    canvas.style.width  = width  
		canvas.height = height
		canvas.width = width

		let _ = canvas.getContext('2d');

		//_.fillRect(0,0,width,height)
    //    _.fill()
    _.font  =   '6rem monotype'
    _.textAlign = 'center'
    _.lineWidth = ''+1;
    _.strokeStyle = 'rgb(192,144,4)'
    requestAnimationFrame(()=>{
      _.fillStyle = 'rgb(241, 144, 163)'
      _.fillText(graphic,30,40)
      _.strokeText(graphic,30,40)
	  	//_.stroke()
    })

	//	return canvas

	}

});