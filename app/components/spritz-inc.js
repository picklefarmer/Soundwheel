import Ember from 'ember';

const space = function(num){
  return "_".repeat(num)
},

spritz = function(num){
  return (Math.round(num-1)*0.35)+1
};

export default Ember.Component.extend({
  song:Ember.inject.service(),
  classNames:['spritz'],
  words:Ember.computed('song.selected.measure.lyric',{
    get(){
      return this.get('song.selected.measure.lyric').split(' ')
    },
    set(_,words){
      return words.split(' ')
    }
  }),
  beat:Ember.computed('song.beat',function(){
    return this.get('song.beat')
  }),
  max_length:Ember.computed('words',function(){

   let errorProne = this.get('song.selected').map(a=>a.lyric).reduce((a,b)=>a+" "+b).split(' '),
    amidst = errorProne.sortBy('length').reverse()[0].length;

      //.sort((a,b)=>a.length<b.length)
     return amidst 
      //[0].length;
      console.error(errorProne,amidst)
      
//    return this.get('words').sort((a,b)=>a.length<b.length)[0].length
  }),

  max_orp:Ember.computed('max_length',function(){
    return spritz(this.get('max_length'))
  }),

  word:Ember.computed('words','beat',function(){
    let beat = this.get('beat'),
        word = this.get('words')[beat],
        word_length = word.length,
	    	stop = spritz(word_length),
		    prefix_space = (this.get('max_orp') - stop),
        postfix_space = (this.get('max_length') - word_length - prefix_space);
  
        return space(prefix_space) + word + space(postfix_space);

  })
});




