export default function(index){
		let barArray = this.get('barArray'),
				arrayLength = barArray.length,
				tempLength	=	arrayLength,
				measureOffset=	index*240;
				
		if(arrayLength){

			//determine direction
			let slopeDirection = 0;

			while(--tempLength > 0){
				let diffSlope = barArray[tempLength].y - barArray[tempLength-1].y;
				console.log('bar', diffSlope)
				if(diffSlope <= 0){
					slopeDirection++
				}else{
					slopeDirection--
				}
			}
			console.log('bar slope',slopeDirection)

							/*
			if(slope < 0){
				barArray.sort((a,b)=>b)
			}
*/
			let boundsX 	= barArray.map(a=>a.x),
					boundsY 	= barArray.map(a=>a.y),
					verticalOffset = 110 || -this.get('maximumOffset') || 110,
					highY			=	Math.max.apply(Math,boundsY),
					lowY			=	Math.min.apply(Math,boundsY),
					highX			=	Math.max.apply(Math,boundsX),
					lowX 			=	Math.min.apply(Math,boundsX),
					ctx 			=	this.get('ctx'),
					highIndex = boundsY.lastIndexOf(highY),
					lowIndex	= boundsY.indexOf(lowY),
					dHigh			= barArray[highIndex].x,
					dLow			= barArray[lowIndex].x,
					highDif		= highX - dHigh,
					lowDif		= dLow  - lowX,
					slope			= (lowY - highY) / ((dLow || lowX) - (dHigh || highX)),
					adjLow		= lowDif * 20,
					adjHigh		= highDif * 20,
					oppLow		= Math.tan(slope) * adjLow,
					oppHigh 	= Math.tan(slope) * adjHigh;
					
			if(lowDif){
			
			}

			if(highDif){
			
			}
					console.log('barA slope', `
								oppLow:${oppLow}
								oppHigh:${oppHigh}
								adjLow:${adjLow}
								adjHigh:${adjHigh}
								lowX:${lowX}
								highX:${highX}
								lowY:${lowY}
								highY:${highY}
								(lowY - highY / lowX - highX)
								slope:${slope}
								highDif:${highDif}
								lowDif:${lowDif}
								dLow:${dLow}
								dHigh:${dHigh}
								lowIndex:${lowIndex}
								highIndex:${highIndex}
								`)
			/*
			 
			 /---------x
			 |			0	n
			 |		0		0
			 |	0
			 y

			 highX, highY + 
			 */
			//determine the difference x between highX/Y and lowX/Y's

			console.log(barArray, 'barArray',`high:${highY}\nlow:${lowY}`)
			ctx.beginPath()
			if(slopeDirection < 0 ){
				ctx.moveTo(10+lowX*20+measureOffset,oppHigh + verticalOffset+highY)
				ctx.lineTo(10+highX*20+measureOffset,oppHigh + verticalOffset+lowY)
			}else{
				ctx.moveTo(10+lowX*20+measureOffset,verticalOffset+lowY)
				ctx.lineTo(10+highX*20+measureOffset,verticalOffset+highY)
			}
			ctx.lineWidth=5
			ctx.stroke()

//			console.log(this.get('maximumOffset'),'maximumOffset')
		}
	}
