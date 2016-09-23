import Ember from 'ember';
import Turnaround from './functions/turnaround';
import galleryMap from '../mixins/galleryMap';

export default Ember.Component.extend(galleryMap,{

  song:Ember.inject.service(),
  viewing:"treble",
  classNames: 'stave-dash',

  actions:{
previewImage(url){
console.log('stave_dash')
				this.sendAction('previewImage',url)
},  
    toggleSet(view){
      this.set('viewing', view)
    }
  },
	ctx:Ember.computed(function(){
					return this.get('song.options.stave')
	}),
	canvas:Ember.computed(function(){
					return this.get('song.options.staveCanvas')
	}),
	init(){
		this._super()
		if(!this.get('song.options.stave'))
		Ember.run(this,'initFunc')
		console.log('ctx', this.get('ctx'))
	},

  theSong:Ember.computed('song.selected',function(){

		this.set('canvasCollect',[])

    let content			= this.get('song.selected.content'),
				lyrics			= content.map(measure => measure.lyric),
				noteMatrix 	= content.map(measure => measure.notes),
				matrixLength= noteMatrix.length,
        pod = [];

	if(true){
		noteMatrix = Turnaround.call(this,noteMatrix);
		matrixLength = noteMatrix.length
	}
	if(matrixLength%2){
		pod.unshift([{stave:noteMatrix[matrixLength-1],lyric:lyrics[matrixLength-1]}])
	}
  
	while(matrixLength--){
		if(matrixLength%2){
		  pod.unshift([
						{	stave:noteMatrix[matrixLength-1],
							lyric:lyrics[matrixLength-1]
						},
						{
							stave:noteMatrix[matrixLength],
							lyric:lyrics[matrixLength]
						}
			])
		}
  }

 
      /*
       * noteMatrix[measure][string][%beat][fret]
       */

      return pod //noteMatrix
  })

});
