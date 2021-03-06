import Ember from 'ember';
import EnvelopBeat from './functions/envelopBeat';
import SustainBeat from './functions/sustainBeat';

export default Ember.Service.extend({
	tipJar(res,rej,date){
		console.log( 'getting tipJar', date)
		Ember.$.getJSON('./tipJar/main.json')
			.then( om => res(om))
	},
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
		let storage = this.get('storage');
		console.log('storage', storage)
    if(storage.songs[selection]){
			console.log(selection,'local and selected')
      om = storage.songs[selection]

			if(!om.length){
				Ember.run(this,this.get('options.songConfig'),om.params)
				this.set('composition',om.composition)
				res(om.parts)
			}else{
      	res(om)
			}
			Ember.run(this.get('options'),this.get('options.updateUrl'),selection)
		//}else if(this.get('options.couple')){
    }else{
				console.log('local_om',om)
      Ember.$.getJSON("./scores/"+selection+".json")
      	.then(om => {
					console.log('local_om',om)
					if(!om.length){

						Ember.run(this,this.get('options.songConfig'),om.params)
						this.set('composition',om.composition)
					 	res(om.parts)
				 	}else{
						console.log( ' no localstorage found  grabbing / json ', om)
	   				res(om)
					}
	  	})
    }

  },

  names(res,rej){
		let storage = this.get('storage'),
				names		=	Object.keys(storage.songs);
    if(names.length){
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
			let storage = this.get('storage.chords');
			console.log('chords',storage)
      if(storage){
		      console.log("chords",true)
          om = storage;
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
    console.log('updating chords',update,this)

		this.set('storage.chords',update)
		let storage = this.get('storage'),
				storageName = this.get('storageName');
    localStorage[storageName] = JSON.stringify(storage)
    console.log(  'chords saved to local storage' )
  },
  update(value,isRest){

	//console.log('updating',value.length,this)

    let measure = this.get('selected.measure.notes'),
				isBeat 	= this.get('isBeat'),
				isPaint = this.get('isPaint'),
				beat		= this.get('beat');

		if(isBeat){

			if(isPaint){
				measure[value[1]].replace(beat,1,value[0])
			}else{
				EnvelopBeat.call(this,value,isRest)
				console.log(`
											all aboard
										 	the beat
										 	train`,measure)
			}
		}else{
      if(value.length === 6){
  //      measure.replace(0,6,value)
				SustainBeat.call(this,value)
      }else{
        let [fret,string] = value;
        console.log(string,fret,this)
        measure.replace(string,1,fret)
      }
			beat=0
		}
    this.get('playMatrix.beat').call(this,beat)
  }
});
