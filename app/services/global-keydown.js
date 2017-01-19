import Ember 				from 'ember';
import Delete 			from './functions/delete';
import Append 			from './functions/append';
import Copy 				from './functions/copy';
import DupBeat			from './functions/DupBeat';
import SwitchBar		from './functions/switchBar';
import Step 				from './functions/step';
import Numbers			from './instances/playNumber';
import PlayNumber		from './functions/playNumber';
import PlayPause		from './functions/playPause';
import PlayPreview 	from './functions/playPreview';

const Return = function(index){
	if(this.get('song.isBeat')){
		PlayPreview.call(this.get('song'))
	}else{
		Append.call(this,index)
	}
};

const evel = function(e,code,name,a,func, ...args){
	let stat = this.get('song.'+name);
	if(e.keyCode === code && stat !== undefined){
		let app = [this,a,stat].concat(args);
		func.apply(app)
		this.set('song.'+name,undefined)
	}
};

export default Ember.Service.extend({
	end(e){
		if(e){
			let ctrl 		= e.ctrlKey,
				inputIndex	= this.get('song.inputIndex'),
				beatInputIndex	= this.get('song.beatInputIndex'),
				partInputIndex	=	this.get('song.partInputIndex'),
				beat		= this.get('song.beat'),
				outdex	=	this.get('song.selected.index'),
				partOut	=	this.get('song.selected.compIndex');
		
				console.error('end',inputIndex,outdex,e.keyCode)	

			if(this.get('song.isBeat')){
				//evel.call(this,e,16,'beatInputIndex',beat,DupBeat,true)
				if(e.keyCode === 16 && (beatInputIndex !== undefined)){
					DupBeat.call(this,beat,beatInputIndex,true)
					this.set('song.beatInputIndex',undefined)
				}
				//evel.call(this,e,17,'beatInputIndex',beat,DupBeat)
				if(e.keyCode === 17 && (beatInputIndex !== undefined)){
					DupBeat.call(this,beat,beatInputIndex)
					this.set('song.beatInputIndex',undefined)
				}	
			}else if(this.get('song.isPart')){
				//evel.call(this,e,17,'partInputIndex',partOut,Copy,false,true)
				if(e.keyCode === 17 && (partInputIndex !== undefined)){
					Copy.call(this,partOut,partInputIndex,false,true)
					this.set('song.partInputIndex',undefined)
				}	
			}else{
				//evel.call(this,e,16,'inputIndex',outdex,Copy,true)
				if(e.keyCode === 16 && (inputIndex !== undefined)){
					Copy.call(this,outdex,inputIndex,true)
					this.set('song.inputIndex',undefined)
				}
				//evel.call(this,e,17,'inputIndex',outdex,Copy)
				if(e.keyCode === 17 && (inputIndex !== undefined)){
					Copy.call(this,outdex,inputIndex)
					this.set('song.inputIndex',undefined)
				}	
			}
		}		
	},
	begin(e){

		console.error('begin',e.ctrlKey)	


		if(e){
			let ctrl = e.ctrlKey || e.shiftKey;
			let index = this.get('song.selected.index');

			switch(e.keyCode){

/*left*/	case 37:Step.call(this,'decrementProperty',ctrl);e.preventDefault();break;
					case 32:PlayPause.call(this);break;
					case 38:SwitchBar.call(this,-1);break;
/*right*/	case 39:Step.call(this,'incrementProperty',ctrl);e.preventDefault();break;

					//show_meter_bar
					case 40:SwitchBar.call(this,1);break;
					// preview ? 
//					case 34:PlayPreview.call(this);break;

					case 13:Return.call(this,index);break;
					case 46:Delete.call(this,index);break;
					case 45:Copy.call(this,index);	break;
					case 48:PlayNumber.call(this,Numbers[e.keyCode]);break;
					case 49:PlayNumber.call(this,Numbers[e.keyCode]);break;
 					case 50:PlayNumber.call(this,Numbers[e.keyCode]);break;
					case 51:PlayNumber.call(this,Numbers[e.keyCode]);break;
					case 52:PlayNumber.call(this,Numbers[e.keyCode]);break;
					case 53:PlayNumber.call(this,Numbers[e.keyCode]);break;
					case 54:PlayNumber.call(this,Numbers[e.keyCode]);break;
					case 55:PlayNumber.call(this,Numbers[e.keyCode]);break;
					case 56:PlayNumber.call(this,Numbers[e.keyCode]);break;
					case 57:PlayNumber.call(this,Numbers[e.keyCode]);break;
			}

		}
	}

});
