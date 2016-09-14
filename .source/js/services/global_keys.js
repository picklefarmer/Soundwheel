
App.GlobalKeydownService = Em.Service.extend({
begin(e){

var is,x = this.get('x'),y = this.get('y'),type = this.get('playType'), index = this.get('song.selected.index');
if(e)
switch(e.keyCode){

	case 37:this.decrementProperty('song.selected.index');
            break;
	case 38:this.toggleProperty('song.pause');
            console.log('play',this.get('song.pause'))
            break;
	case 39:this.incrementProperty('song.selected.index');
            break;
	case 40:this.toggleProperty('pause');
			Em.run(this,'play',"decrementProperty");
			this.set('controller.direction',1);break;
	case 32:Em.run(this,"playNotes");break;
            //append
	case 13:this.get('song.selected')
			.insertAt(this.get('song.selected.index')+1,{notes:[0,0,0,0,0,0]});
            this.set('song.selected.index',index+1);
			break;
            //delete
	case 46:this.get('song.selected')
			.removeAt(index,1);
            index === this.get('song.selected.length')?this.decrementProperty('song.selected.index'):"";
			break;
            //copy
	case 45:var score = this.get('song.selected'),temp = Em.copy(score.get('measure.notes'));
			score.insertAt(index+1,{notes:temp});
            this.incrementProperty('song.selected.index');
			break;
	default:break;	
	}
if(is){
	console.log("fired")	
	this.get('controller.target')
		.send('ride', x,y)
}
   }
})

