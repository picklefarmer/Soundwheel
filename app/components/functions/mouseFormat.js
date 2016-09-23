export default function(E){
		//console.log( this.get('element').offsetTop,"OFFSETTOP") 
	var [ x , y ]	=	[
			E.offsetX == undefined ? E.pageX - (this.get('element').offsetLeft +40): E.offsetX,
			E.offsetY == undefined ? E.pageY - (this.get('element').offsetTop): E.offsetY
	];
		
	E = [ x , y ]=[~~((x-10)/(1472/23)),~~((y-5)/(300/6))];
	
	return E
}

