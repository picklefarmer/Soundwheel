
App.LocalService = Em.Service.extend({

  selected(res,rej,selection){
    var om;
      om = JSON.parse(JSON.parse(localStorage.songs)[selection])
      res(om)
  },

  chords(res,rej){

      var om = JSON.parse(localStorage.chords)
      res(om)
  },

  names(res,rej){

    var names = Object.keys(JSON.parse(localStorage.songs))
    console.log(names)
    res( Em.A(names) ) 
  },
  
  update:function(value){
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
