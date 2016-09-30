import drawItem from './drawStaveItem';
import groupFunc from './staveGroup';
import connectDots from './connectDots';

let getY = function(beat){
	return (beat.note * 6) - ((3-beat.o)*(6*7))
};
export default function(index){
		console.log('beams')

		let eighthArray = this.get('barArray'),
				stave_offset= this.get('stave_offset'),
				ctx					=	this.get('ctx');
		
		let grouping = groupFunc.call(this);


		let saturate = {
			ctx:this.get('ctx'),
			graphics:this.get('graphics'),
			measureIndex:this.get('measureIndex'),		
			isNatural:0
//		isOdd:false
		};

		//:this.get('ctx'),graphics,source,measureIndex,x,y,isOdd},

		console.error(eighthArray,'single')
		grouping.forEach( group => {
			let groupInt = 2,
					tempY,
					groupTemp;

			//check if rests	
			if(group.some(a => a === "rest")){
				if(group.every(a => a === "rest")){

				}else{
					console.error('single')
					while(group[--groupInt]){
						groupTemp = group[groupInt]
						if(groupTemp !== "rest"){
							console.error(groupTemp)

							//let source = this.get('elements').eight_note[groupTemp.isFlip?'flipVertical':'default'] * 10 + 12;
				saturate.source = this.get('elements').eight_note.default * 10 + 12;
				saturate.x 	= groupTemp.x
				saturate.y	= groupTemp.y


				drawItem.call(this,saturate)
												
												//,groupTemp.x,groupTemp.y,false,0)
				//drawItem.call(this,ctx,this.get('graphics'),source,this.get('measureIndex'),groupTemp.x,groupTemp.y,false,0)
							if(groupTemp.chord){
								connectDots.call(this,groupTemp.chord,ctx,groupTemp.x)

							}
						}
					}
				}
			//check if is flipped
			}else if(group.every(a => !a.isFlip) || group.every(a => a.isFlip)){
				// draw beam
				console.error('all/not flipped')
			}else if(group.every(a => a.chord)){
				console.error('a flip')	
				group[0].isFlip = group[1].isFlip
			}else{
				while(group[--groupInt]){

					groupTemp = group[groupInt]
					if(groupTemp.chord && groupTemp.isFlip){
						tempY	= groupTemp.chord[groupTemp.chord.length-1];
			
						group[groupInt].y = getY(tempY)
						connectDots.call(this,groupTemp.chord,ctx,groupTemp.x)
					}else{
						!!++group[groupInt].isFlip%2

					}
				}
			}
				//all aren't flipped

			if((group[1] === "rest") || !group[1]){

//				let source = this.get('elements').eight_note[flip?'flipVertical':'default'] * 10 + 12;

				console.log('drawing eight note singles',group)

//				drawItem.call(this,{ctx,this.get('graphics'),source,this.get('measureIndex'),group[0].x,group[0].y})

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
