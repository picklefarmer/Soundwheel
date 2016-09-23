import Ember 			from 'ember';
import Delete 		from './functions/delete';
import Append 		from './functions/append';
import Copy 			from './functions/copy';
import Step 			from './functions/step';
import PlayPause	from './functions/playPause';

export default Ember.Service.extend({

	begin(e){

		if(e){

			let index = this.get('song.selected.index');

			switch(e.keyCode){

/*left*/	case 37:Step.call(this,'decrementProperty');break;
					case 38:PlayPause.call(this);break;
/*right*/	case 39:Step.call(this,'incrementProperty');break;

					//show_meter_bar
					case 40:this.toggleProperty('song.isBeat');console.log( ' drill down ' );break;
					// preview ? 
					case 32:Ember.run(this,"playNotes");break;

					case 13:Append.call(this,index);break;
					case 46:Delete.call(this,index);break;
					case 45:Copy.call(this,index);	break;

					default:break;	

			}

		}
	}

});
