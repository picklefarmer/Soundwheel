App.LocalService = Em.Service.extend({

  instrument(res,rej,selection){
    console.log( ' instrument content' , selection)
    if(selection === "default"){
      return res()
    } 
    try{
     $.getJSON("./instruments/"+selection+".json")
              .then(om => {
                  om.len  = om.real.length;
                  om.real = new Float32Array(om.real);
                  om.imag = new Float32Array(om.imag);
                  
                  console.log("instrument "+selection, om )
                  res(om)
              })
    
    }catch(e){
      console.log(e)
    }
  },

  instrumentNames(res,rej){
    console.log( ' instrument Names ' ) 
      $.getJSON("./instruments/instrumentList.json")
              .then(e => {

                var om = Object.keys(e)
                         .filter(instrument => e[instrument]?
                            instrument : false);  
                    console.log( om , " instrument names " ) 
                    res(om)
              })
  },


  panels(res,rej){
    console.log(  ' panels get  ' ) 
      $.getJSON("./json/panelsDefault.json")
        .then(om => { res(om) }) 
  },

  options(res,rej){
    console.log(  ' options get  ' ) 
      $.getJSON("./json/routesDefault.json")
        .then(om => { res(om) })
  },

  selected(res,rej,selection){
    var om;
      om = JSON.parse(JSON.parse(localStorage.songs)[selection])
      res(om)
  },

  names(res,rej){
    var names = Object.keys(JSON.parse(localStorage.songs))
    console.log(names)
    res( Em.A(names) ) 
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
