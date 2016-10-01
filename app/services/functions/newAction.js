import blank from './generateBlank';

export default function(){
  
  this.set('song.selected.content',[blank.call(this)])
  this.set('song.selected.selection',window.prompt('file name'))
  this.get('save').call(this)
}
