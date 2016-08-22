import Ember from 'ember';
import Turnaround from './functions/turnaround';
import GalleryMap from './instances/galleryMap';

export default Ember.Component.extend(GalleryMap,{

  song:Ember.inject.service(),
  viewing:"treble",
  classNames: 'stave-dash',

  actions:{
    toggleSet(view){
      this.set('viewing', view)
    }
  },

  theSong:Ember.computed('song.selected',function(){

    let noteMatrix = this.get('song.selected.content').map(measure => measure.notes),
		matrixLength = noteMatrix.length,
        pod = [];
	if(true){
		noteMatrix = Turnaround.call(this,noteMatrix);
		matrixLength = noteMatrix.length
	}
	if(matrixLength%2){
		pod.unshift([noteMatrix[matrixLength-1]])
	}
    while(matrixLength--){
		if(matrixLength%2){
		  pod.unshift([
						noteMatrix[matrixLength-1],
						noteMatrix[matrixLength]
						])
		}
    }

 
      /*
       * noteMatrix[measure][string][%beat][fret]
       */

      return pod //noteMatrix
  })

});
