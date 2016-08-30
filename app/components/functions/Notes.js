import whole_note from './whole_note';
import half_note from './half_note';
import quarter_note from './quarter_note';
import eight_note from './eight_note';
let y = 10;

export default {
	whole_note,
	half_note,
	quarter_note,
	eight_note,
	test:function(fnc,x,context){
		context.get('ctx').fillRect(0,0,34,34)
	},

	default(fnc,x,context){
					
			console.log('fnc',this,x,fnc)
			this[fnc].call(context,x,y)
	},

	flipVertical(fnc,x,context){
	
			console.log('fnc',this,fnc,x,this[fnc])
			this[fnc].call(context,x,y,true)
	},

	m_stem(fnc,x,context){

			this[fnc].call(context,x,y,undefined,true)
	},

	stem(fnc,x,context){
		
			this[fnc].call(context,x,y,false)
	},


}

