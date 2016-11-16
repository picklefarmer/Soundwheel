import Ember from 'ember';

var spectral = chroma.scale('Spectral').domain([0,8]);

const space = function(num){
  return " ".repeat(num)
},

requate = function(index,num,words){
    num = (words[index]+",").repeat(num).split(',')
    num.pop()
    return num

},

spritz = function(num){
  if(num <=3 ){
    return 2
  }
  return (Math.round(num)*0.35)
};

export default Ember.Component.extend({
  isVisible:Ember.computed.bool('song.isSpritz'),
  song:Ember.inject.service(),
  classNames:['spritz'],
  toneToHue:Ember.computed('song.beat',function(){
    return "border-color:"+spectral(this.get('song.beat'))+";"
  }),
  words:Ember.computed('song.selected.lyrics','song.selected.index',{
    get(){
			let words = this.get('song.selected.lyrics').objectAt(this.get('song.selected.index')),column = [];
      if(words){
        words = words.trim().split(' ')
        let length = words.length,
            difference = 8 - length;

        if(length >= 8){
          return words
        }else{

        switch(difference){
          case 7: column = requate(0,8,words);break;
          case 6: column = requate(0,4,words)
                            .concat(requate(1,4,words));break;
          case 5: column = requate(0,2,words)
                            .concat(requate(1,2,words))
                            .concat(requate(2,4,words));break;
          case 4: column = requate(0,2,words)
                            .concat(requate(1,2,words))
                            .concat(requate(2,2,words))
                            .concat(requate(3,2,words));break;
          default: column = words.concat(requate(length-1,difference,words));break;
        }
        this.set('proximity',column)
        return column

        }
      }
    },
    set(_,words){
      return words.split(' ')
    }
  }),

  max_length:Ember.computed('song.selected.parts.@each.lyrics',function(){
    
  let errorProne = this.get('song.selected').getEach('lyrics').reduce((a,b)=>a.concat(b)).reduce((a,b)=>a.concat(b)).join(' ').split(' '), 

//   let errorProne = this.get('song.selected').map(a=>a.lyric).reduce((a,b)=>a+" "+b).split(' '),
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
    let beat = this.get('song.beat'),
        word = this.get('words')[beat],
        word_length = word.length,
	    	stop = spritz(word_length),
		    prefix_space = (this.get('max_orp') - stop),
        postfix_space = (this.get('max_length') - word_length - prefix_space);

        return space(prefix_space) + word + space(postfix_space);

  })
});
