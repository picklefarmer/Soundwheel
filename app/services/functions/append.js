import blank from './generateBlank'
export default function(index){
  let {map,notes} = blank.call(this);

	this.get('song.selected')
					.insertAt(	index+1	,{
						notes,
						map
					});

	this.set('song.selected.index',index+1);
}
