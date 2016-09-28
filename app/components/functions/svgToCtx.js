export default function(TrebleGraph,vO,hO){
		let ctx = this.get('ctx'),	
    		length = TrebleGraph.curve.length;

    ctx.beginPath()

    ctx.moveTo(hO+TrebleGraph.start[0],vO+TrebleGraph.start[1])
    for(var i = 0; i < length; i++){
			let curve = TrebleGraph.curve[i],
					cLen	=	curve.C.length,
					lLen	= 0;

			if(curve.L){
				lLen	=	curve.L.length;
			}

			for(var cInt = 0; cInt < cLen;cInt++){
//				console.error(curve.C[cInt],curve.C,cInt,'allow')
				let	[a,b,c] = curve.C[cInt];

      	ctx.bezierCurveTo(hO+a[0],vO+a[1],
        	                hO+b[0],vO+b[1],
          	              hO+c[0],vO+c[1])
			}

			for(var l = 0; l < lLen;l++){
				if(curve.L[l]){
					let [a,b] = curve.L[l];
					ctx.lineTo(hO+a,vO+b)
				}
			}
			

    }

    ctx.stroke()
    ctx.fill()
  
}
