
App.TonesService = Em.ArrayProxy.extend({
   webaudio:Em.inject.service(),
   song:Em.inject.service(),
   _isLeft:false,
   isLeft:function(){

      console.log(onProxy,onService,"how fired")
      var onProxy   = this.get('_isLeft'),
          onService = this.get('song.main.isLeft.enabled');
      if( onProxy !== onService ){
          console.log('reversing content')
          this.content.reverse()
          this.set('_isLeft', onService) 
      }

   }.observes('song.main.isLeft.enabled','song.main.isFulfilled'), 

   init(){
      console.log(`
                  tone object created
                  `)


      var strings = this.get('strings')
                        .map(this.get('webaudio.tone'),
                             this.get('webaudio'))
          
          strings = this.get('song.main.isLeft.enabled') ? strings.reverse() : strings

       this.set('content', Em.A(strings))
    },

    strings:function(){
      console.log('init from notes', this.get('song.main.intervals') ) 
    var notesMap = [ ],
        octaves = [.5,1,2,4],
        intervals = this.get('song.main.intervals') || [7,5,5,5,4,5],
        relativeTone = intervals.shift() || 4,
        arrays =  [],
        strings = [ ],
        frets   = this.get('song.main.frets.options') || 22,
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

        relativeTone  = 4;

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
        strings.reverse()

        //      should be 6
      arrays = [0,0,0,0,0,0]
                  .map( (step,string) => {
                    let start = intervals.reduce( (a,b,f) => {
                                          return f< string? a+b : a},
                                          relativeTone);

                    step  = notesMap.slice(start,start+frets)                 
                    step.unshift(1)

                    return step 
                })


      console.log('arrays',`
                  `,    
                  intervals,`
                  `,
                  strings,`
                  `,                 
                  arrays)

        return strings

      }.property(),
    
 })
