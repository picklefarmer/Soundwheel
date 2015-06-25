
App.TonesService = Em.Service.extend({
   webaudio:Em.inject.service(),
   song:Em.inject.service(),
   init(){
//        var strings = this.get('strings')
  //                        .map(this.get('webaudio.tone'),
    //                           this.get('webaudio'))
      //  this.set('tone',Em.A(strings))
      },
    isLeft:function(){
      console.log(`


                  isLEft



                  `)
    if( this.get('song.main.isFulfilled')){
      return  this.get('song.main.isLeft.enabled')
    }
      return false 
    }.property('song.main.isFulfilled','song.main.isLeft.enabled'),
    tone:function(){
      var strings = this.get('strings')
                        .map(this.get('webaudio.tone'),
                             this.get('webaudio'))
          
          strings = this.get('isLeft') ? strings.reverse() : strings

          return Em.A(strings)
    }.property('isLeft','strings'),
    strings:function(){
    //  console.log('init from notes' ) 
    var notesMap = [ ],
        octaves = [.5,1,2,4],
        strings = [ ],
        string = 5,
        frequencies = [
                   		261.63,	//	0
              				277.18,	//	1
              				293.66,	//	2 
              				311.13,	//	3 
              				329.63,	//	4 
              				349.23,	//	5 
              				369.99,	//	6 
              				392,	  //	7
              				415.3, 	//	8
              				440,	  //	9	
              				466.16,	//	10 
              				493.88  //	11 
                      ];
        notesMap  = octaves
                      .map( multiplier => frequencies
                      .map( frequency => multiplier * frequency ))
                      .reduce((e,f)=>e.concat(f))
        while(string >= 0){
          let start; 
          switch(string){
              case 5:  start = 4 + ( 4*5 ) + 4 ;break;
              case 4:  start = 4 + ( 3*5 ) + 4 ;break;
              default: start = 4 + ( string*5 );break;
          }
           strings[string] = notesMap.slice(start,start+22)
           strings[string].unshift(1)
           string--
        }
        return strings.reverse()
      }.property(),
    
 })
