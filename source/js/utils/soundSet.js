
App.TonesService = Em.ArrayProxy.extend({
   webaudio:Em.inject.service(),
   song:Em.inject.service(),
   
   isLeft:function(){
      if( this.get('song.main.isFulfilled')){
        //this.ctx.reverse()
        return  this.get('song.main.isLeft')
      }
      return false 
   }.property('song.main.isFulfilled','song.main.isLeft'),
  
   init(){
      console.log(`
                  tone object created
                  `)


      var strings = this.get('strings')
                        .map(this.get('webaudio.tone'),
                             this.get('webaudio'))
          
          strings = this.get('isLeft') ? strings.reverse() : strings

       this.set('content', Em.A(strings))
    },

    strings:function(){
    //  console.log('init from notes' ) 
    var notesMap = [ ],
        octaves = [.5,1,2,4],
        strings = [ ],
        frets   = 22,
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
           strings[string] = notesMap.slice(start,start+frets)
           strings[string].unshift(1)
           string--
        }
        return strings.reverse()
      }.property(),
    
 })
