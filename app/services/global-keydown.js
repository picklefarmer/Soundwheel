import Ember 				from 'ember';
import Delete 			from './functions/delete';
import Append 			from './functions/append';
import Copy 				from './functions/copy';
import DupBeat			from './functions/DupBeat';
import SwitchBar		from './functions/switchBar';
import Step 				from './functions/step';
import PlayPause		from './functions/playPause';
import PlayPreview 	from './functions/playPreview';

const Return = function(index){
	if(this.get('song.isBeat')){
		PlayPreview.call(this.get('song'))
	}else{
		Append.call(this,index)
	}
};

export default Ember.Service.extend({
	end(e){
		if(e){
			let ctrl 		= e.ctrlKey,
				inputIndex	= this.get('song.inputIndex'),
				beatInputIndex	= this.get('song.beatInputIndex'),
				beat		= this.get('song.beat'),
				outdex	=	this.get('song.selected.index');
		
				console.error('end',inputIndex,outdex,e.keyCode)	

			if(this.get('song.isBeat')){
				if(e.keyCode === 16 && (beatInputIndex !== undefined)){
					DupBeat.call(this,beat,beatInputIndex,true)
					this.set('song.beatInputIndex',undefined)
				}
				if(e.keyCode === 17 && (beatInputIndex !== undefined)){
					DupBeat.call(this,beat,beatInputIndex)
					this.set('song.beatInputIndex',undefined)
				}	
			}else{
				if(e.keyCode === 16 && (inputIndex !== undefined)){
					Copy.call(this,outdex,inputIndex,true)
					this.set('song.inputIndex',undefined)
				}
				if(e.keyCode === 17 && (inputIndex !== undefined)){
					Copy.call(this,outdex,inputIndex)
					this.set('song.inputIndex',undefined)
				}	
			}

/*			if(this.get('song.isBeat')){
				if(e.keyCode === 16 && (beatInputIndex.length)){
					DupBeat.call(this,beat,beatInputIndex,true)
					this.set('song.beatInputIndex',Ember.A([]))
				}
				if(e.keyCode === 17 && (beatInputIndex.length)){
					DupBeat.call(this,beat,beatInputIndex)
					this.set('song.beatInputIndex',Ember.A([]))
				}	
			}else{
				if(e.keyCode === 16 && (inputIndex.length)){
					Copy.call(this,outdex,inputIndex,true)
					this.set('song.inputIndex',Ember.A([]))
				}
				if(e.keyCode === 17 && (inputIndex.length)){
					Copy.call(this,outdex,inputIndex)
					this.set('song.inputIndex',Ember.A([]))
				}	
			}
		}		
*/
		}		
	},
	begin(e){

		console.error('begin',e.ctrlKey)	


		if(e){
			let ctrl = e.ctrlKey || e.shiftKey;
			let index = this.get('song.selected.index');

			switch(e.keyCode){

/*left*/	case 37:Step.call(this,'decrementProperty',ctrl);break;
					case 32:PlayPause.call(this);break;
					case 38:SwitchBar.call(this,-1);break;
/*right*/	case 39:Step.call(this,'incrementProperty',ctrl);break;

					//show_meter_bar
					case 40:SwitchBar.call(this,1);break;
					// preview ? 
//					case 34:PlayPreview.call(this);break;

					case 13:Return.call(this,index);break;
					case 46:Delete.call(this,index);break;
					case 45:Copy.call(this,index);	break;

					default:break;	

			}

		}
	}

});
