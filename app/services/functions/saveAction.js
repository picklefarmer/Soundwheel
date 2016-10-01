export default function(){
	console.log('saving',this.get('song.selected.selection'),this.get('song.selected.content'))
  
	let selected = this.get('song.selected.selection'),
      song = JSON.stringify(this.get('song.selected.content'));

   if(!localStorage.songs){
      localStorage.songs = "{}"
   }

  let storage = JSON.parse(localStorage.songs);
  
	console.log('storage is current', storage) 
  
	storage[selected] = song
  localStorage.songs= JSON.stringify(storage) 

	console.log('saved')

  this.updateUrl.call(this,selected)    
}
