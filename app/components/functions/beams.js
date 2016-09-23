import drawItem from './drawStaveItem';

const groupFunc = function(){

		let eighthArray = this.get('barArray'),
				length			= eighthArray.length,
				ix					=	0,
				grouping		= [];

		for(ix;ix < length;ix++){
			//if even
			if(ix%2){
				grouping[ix-1].push(eighthArray[ix])
			//if odd
			}else{
				grouping[ix] = []
				grouping[ix].push(eighthArray[ix])
			}
		}	
		grouping = grouping.filter(e=>e !== undefined)
		console.log(grouping, ' grouping ',grouping.length )
		return grouping

};

export default function(index){
		console.log('beams')

		let eighthArray = this.get('barArray'),
				stave_offset= this.get('stave_offset'),
				ctx					=	this.get('ctx');
		
		let grouping = groupFunc.call(this);


		console.log(eighthArray,'single')
		grouping.forEach( group => {

			let flip = group[0].y > this.get('measure_midPoint');

			if((group[1] === "rest") || !group[1]){

				let source = this.get('elements').eight_note[flip?'flipVertical':'default'] * 10 + 12;

				console.log('drawing eight note singles',group)
				drawItem.call(this,ctx,this.get('graphics'),source,this.get('measureIndex'),group[0].x,group[0].y)

			}else{
							let start = group[0],
									end		= group[1],
									width	=	20,
									startF= start.isFlip?50:0,
									endF	= end.isFlip?50:0,
									begin	=	index*240,
									yO		=	0,
									xO		= stave_offset + 10,
									startX= xO + start.x*width+begin,
									startY= yO + -start.y+startF,
									endX	= xO + end.x*width+begin,
									endY	=	yO +-end.y+endF;
									
							ctx.beginPath()
							ctx.moveTo(startX,startY)
							ctx.lineTo(endX,endY)
							ctx.lineWidth = 4;
							ctx.stroke()
			}
			
		})	
}