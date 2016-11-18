export default function(composition,compIndex,index){

    if(!composition.any( ([a,b],f) => f!==compIndex&&a===index )){
			this.get('song.selected.content').removeAt(index)

      this.set('song.selected.composition',
        composition.map(([a,b])=>[a>index?a-=1:a,b]))
		}
}
