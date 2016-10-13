import Ember from 'ember';
const equalizer = function( a,b) {
	return a-0.01
};

export default Ember.Service.extend({
	song:Ember.inject.service(),
	selected:Ember.computed('song.instrument.isFulfilled',{
		get(){
			var instrument = this.get('song.instrument'), real, imag;

			console.log("service + instrument",instrument )

			if(instrument.isFulfilled){
			  console.log("service _ instrument" , instrument)
			  if(instrument.get('real')){
					real = instrument.get('real');
					imag = instrument.get('imag');
					console.log(real,imag, " did inserst correctly " ) 

					return {			real,			imag			} 
			  }else{
					console.log('service _ instrument, "default"')

					return "default"
			  }
			}
		}
	})
})

/*
 
  [
  null,
  null,
  null, 
  [5, 4],
    7  
  ]

 #,
 [null,1],[1,null],
 [null,[null,1]],[[null,1],null],[[null,1],[null,1]],
 ...etc

func(depthInt,a,depth)
  if(!depth)
    return typeof a !== 'object'? 
      resolve(depthInt,depth,a) : 
      func(++depthInt,a,0)
  else
    return typeof a[depth] !== 'object'?
      resolve(depthInt,depth,a[depth]) :
      func(++depthInt,a[depth])

resove(depthInt,depth,val){

  depth * depthInt

}

var hex = "0x"+notes.shift(),
    arr = hex.toString(2).split("");





4  /  4

2 2,2 2

1,1,1,1/1,1,1,1

[2,0]




 */
