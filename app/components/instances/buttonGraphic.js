const height 	= 300,
			width		=	400;



export default function(){

	const canvas = document.createElement('canvas');

	
	canvas.height = height
	canvas.width = width

	let _ = canvas.getContext('2d');

	_.fillRect(0,0,width,height)
	_.fill()

	return canvas

}
