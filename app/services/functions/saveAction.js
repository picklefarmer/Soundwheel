export default function(){
	console.log('saving',this.get('song.selected.selection'),this.get('song.selected.content'))
  
	let storageName = this.get('song.storageName'),
			selected = this.get('song.selected.selection'),
			params	= {
				voice:this.get('song.instrument.selection'),
				tempo:this.get('song.bpm')
			},
      song 		= this.get('song.selected.content'),
			songBlock	=	{params,song};
/*
   if(!localStorage[storageName]){
      localStorage[storageName] = "{}"
   }
*/
	this.set('storage.songs.'+selected,songBlock)
  let storage = this.get('song.storage');//JSON.parse(localStorage.songs);
  
	console.log('storage is current', storage) 
  
	//storage.songs[selected] = songBlock
  localStorage[storageName] = JSON.stringify(storage) 

	console.log('saved')

  this.updateUrl.call(this,selected)    
}
