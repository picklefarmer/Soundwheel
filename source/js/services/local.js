App.LocalService = Em.Service.extend({

  instrument(res,rej,selection){
    console.log( ' instrument content' , selection)
    if(selection === "default"){
      return res()
    } 
     $.getJSON("./instruments/"+selection+".json")
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
      $.getJSON("./instruments/instrumentsDefault.json")
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
      $.getJSON("./json/mainDefault.json")
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

  panels(res,rej){
    console.log(  ' panels get  ' ) 
      $.getJSON("./json/panelsDefault.json")
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

  options(res,rej){
    console.log(  ' options get  ' ) 
      $.getJSON("./json/routesDefault.json")
        .then(om => { res(om) })
  },

  selected(res,rej,selection){
    var om;

    if(localStorage.songs){
      om = JSON.parse(JSON.parse(localStorage.songs)[selection])
      res(om)
    }else{
      $.getJSON("./scores/"+selection+".json")
       .then(om => res(om))
    }

  },

  names(res,rej){
    if(localStorage.songs){
    var names = Object.keys(JSON.parse(localStorage.songs))
    console.log(names)
    res( Em.A(names) )
    }else{
      om = $.getJSON('./json/songsDefault.json')
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
          om = $.getJSON('./json/chordsDefault.json')
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
    console.log('updating',value.length,this)

    var content = this.get('selected.measure.notes')

      if(value.length === 6){
        console.log(6,value) 
        content.replace(0,6,value)
        console.log("end",this)
      }else{
        let [fret,string] = value;
        console.log(string,fret,this) 
        content.replace(string,1,fret)
      }
  
  }

})
