import Ember from 'ember';

export default Ember.Service.extend({
	init(){
		console.log('init local')
	},
			
  instrument(res,rej,selection){
    console.log( ' instrument content' , selection)
    if(selection === "default"){
      return res()
    } 
     Ember.$.getJSON("./instruments/"+selection+".json")
      .then(om => {

         var c = om.real.length;
         var real = new Float32Array(c);
         var imag = new Float32Array(c);
              
         for (var i = 0; i < c; i++) {
           real[i] = om.real[i];
           imag[i] = om.imag[i];
         }

/*
              om.len  = om.real.length;
              om.real = new Float32Array(om.real);
              om.imag = new Float32Array(om.imag);
  */                
            console.log("instrument "+selection,{real,imag} )
              res({real,imag})
    })
  },

  instrumentNames(res,rej){
    console.log( ' instrument Names ' ) 
      Ember.$.getJSON("./json/instrumentsDefault.json")
       .then(e => {
         var om = Object.keys(e)
              .map(instrument => {
                return {
                        "name":instrument,
                        "enabled":e[instrument]
                       }
              });  

             console.log( om , " instrument names " ) 

             res(om)
       })
  },

  main(res,rej){
    console.log( ' main options get ' ) 
      Ember.$.getJSON("./json/mainDefault.json")
        .then( e => {
          res(e)
          /*
          var om = Object.keys(e)
              .map(hash => {
                return {
                        "name"    : hash,
                        "enabled" : e[hash].enabled,
                        "options" : e[hash].options
                        }
              })

              res(om)
          */
        }) 

  },

	actionNames(res,rej){
		console.log( ' actionNames get ')
			Ember.$.getJSON("./json/actionNamesDefault.json")
				.then( e => {
						res(e)
				})
	},

  panels(res,rej){
    console.log(  ' panels get  ' ) 
      Ember.$.getJSON("./json/panelsDefault.json")
        .then(  e => {
          var om = Object.keys(e)
              .map(hash => {
                return {
                        "name"    : hash,
                        "enabled" : e[hash].enabled,
                        "options"   : e[hash].options
                        }
              })

              res(om)
        }) 
  },

  routes(res,rej){
    console.log(  ' routes get ' ) 
      Ember.$.getJSON("./json/routesDefault.json")
        .then(om => { console.log(om, "local options: routes");res(om) })
  },

  selected(res,rej,selection){
    var om;
console.log(selection,'local and selected')
    if(localStorage.songs){
      om = JSON.parse(JSON.parse(localStorage.songs)[selection])
      res(om)
    }else{
      Ember.$.getJSON("./scores/"+selection+".json")
       .then(om => {
			console.log( ' no localstorage found  grabbing / json ', om)
	   		res(om)
	   })
    }

  },

  names(res,rej){
    if(localStorage.songs){
    var names = Object.keys(JSON.parse(localStorage.songs))
    console.log(names)
    res( Ember.A(names) )
    }else{
      let om = Ember.$.getJSON('./json/songsDefault.json')
            .then(e =>{
              var songs = Object.keys(e)
                                .filter(key => e[key] ? key : false);
              res(songs)
            })
      
    } 
  },

  chords(res,rej){
    var om;
      console.log("chords")
      if(localStorage.chords){
      console.log("chords",true)
          om = JSON.parse(localStorage.chords);  
          res(om)
      }else{
      console.log("chords",false)
          om = Ember.$.getJSON('./json/chordsDefault.json')
                .then(e => {
                  var chords = Object.keys(e)
                                     .map((key) => e[key])
                    console.log( e , "chords"  ) 
                  res(chords)
                });
      }
  },

  updateChords(update){
    console.log('updating chords')
      
    localStorage.chords = JSON.stringify(update)
    console.log(  'chords saved to local storage' ) 
  }, 
  update(value){
  
	//console.log('updating',value.length,this)
		
    let measure = this.get('selected.measure.notes'),
				isBeat 	= this.get('isBeat'),
				beat		= this.get('beat');
			
		if(isBeat){

			envelopBeat.call(this,value)
			console.log(`
											all aboard
										 	the beat
										 	train`,measure)
			
		}else{

      if(value.length === 6){
        console.log(6,value) 
        measure.replace(0,6,value)
        console.log("end",this)
      }else{
        let [fret,string] = value;
        console.log(string,fret,this) 
        measure.replace(string,1,fret)
      }
		}
  
  }
});

var envelopBeat = function(update){

		let measure = this.get('selected.measure.notes'),
				beat    = this.get('beat');

		if(update.length){

			let score = measure.map(
				function(string,n){

					if(string.length){//if string isArray
						string[beat] = update[n]

					}else{

						string = []
						string[beat] = update[n]

					}

					return string
				});
			console.log(score, `this is the
										 	result of the map`)	
			measure.replace(0,6,score)
			//measure[arguments.length]
		}else{
			//let [fret,string];
			//measure.replace(string,1,fret)
//				
		}
}
