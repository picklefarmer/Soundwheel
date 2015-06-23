App.InstrumentsService = Em.Service.extend({
  song:Em.inject.service(),
  selected:function(){
    var instrument = this.get('song.instrument'), real, imag;

    console.log("service + instrument" )

    if(instrument.isFulfilled){
      console.log("service _ instrument" , instrument)
      if(instrument.get('len')){
        real = instrument.get('real');
        imag = instrument.get('imag');
        console.log(real,imag, " did inserst correctly " ) 
        return {real,imag} 
      }else{
        return "default"
      }
    }
  }.property('song.instrument.isFulfilled')

})
