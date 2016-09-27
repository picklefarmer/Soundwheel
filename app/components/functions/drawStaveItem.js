
export default function(ctx,graphics,source,measureIndex,x,y,isOdd,isNatural){
		let stave_offset = this.get('stave_offset');
    ctx.drawImage( 
/*simage*/  graphics,
/*sx*/      source,
/*sy*/      10,
/*swidth*/  20,
/*sheight*/ 80,
/*dx*/      stave_offset+ x*20 + measureIndex*240 + (isOdd?20:0) + isNatural,
/*dy*/      -32 - y,
/*dwidth*/  20,
/*dheight*/ 80)

}

