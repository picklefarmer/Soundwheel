import Ember from 'ember';

export default Ember.Service.extend({
		init(){
			console.log('init firebase')
		},

		auth:Ember.inject.service(),

		base:firebase.database(),

		user:Ember.computed('auth.uid','base',function(){
			if(this.get('auth.uid')){
				console.log('this.get.base',this.get('base').ref(this.get('auth.uid')))
				return this.get('base').ref(this.get('auth.uid'))
			}
		}),

    instrumentNames(res,rej){
      console.log ( 'instrument Names Auth ' ) 
			let objArray = [];
      this.get('user').child('instruments')
				.on("value",(instrumentNames) =>{
          instrumentNames.forEach(hash  => {
            objArray.push({
              "name":hash.key,
              "enabled":hash.val()
            })
        	})
          res(objArray)
        }) 
    },

    main(res,rej){
			console.log(this.get('user'),'main ref')
			this.get('user').child('settings/main')
      	.on("value", (main) =>  res(main.val()))
    },

    panels(res,rej){
			let objArray = [];

    	this.get('user').child('settings/panels')
        .on("value",(panels) => {

        	panels.forEach(hash => {
          	objArray.push({
            	"name":hash.key,
              "enabled":hash.val().enabled,
              "options":hash.val().options
            })
          })

      		res(objArray)
      })
    },

		routes(res,rej){
			console.log(this.get('user'),'routes ref')
			this.get('user').child('settings/routes')
				.on('value',(routes)=>res(routes.val()))
		},

    options(res,rej){
      var root = this.get('auth.user')
                  .child('settings/options');

          root.on("value",(snapshot) => {
            res(snapshot.val())
         })
    },

    updateChords(update){
      console.log ( ' observation got _2' )

      this.get('auth.user')
          .update(update,()=>{
            console.log('chords saved online')
          })
    },

    updateInstruments(update){
      console.log( ' observation got _2 ' )

/*
 {name:02_Saw,enabled:true}
 update({[update.name]:update.enabled})
 */
          update = {[update.name]:update.enabled}

        this.get('auth.user')
            .child('instruments')
            .update(update,
                ()=>{
                  console.log('success')
                }) 
    
    },
    
    updateMain(update,path){
      console.log( ' main observation got _2 ' ) 

/*
 {name:isLeft,enabled:true}
  var {enabled,options} = update;
 update({[update.name]:{enabled,options}})
 */
      if(!path){

        let {enabled,options,name} = update;
            update = {[name]:{enabled,options}}
            path   = '/'
      }  

        this.get('auth.user')
            .child('settings/main')
            .child(path)
            .update(update,
                ()=>{
                  console.log('success')
                }) 
    
    },

    updateOptions(update){
      console.log( ' observation got _2 ' ) 

/*
 {name:isLeft,enabled:true}
  var {name,enabled,panel} = update
  update =  update({[name]:{enabled,panel}})
*/
      var {name,enabled,options} = update;
          update = {[name]:{enabled,options}}


        this.get('auth.user')
            .child('settings/panels')
            .update(update,
                ()=>{
                  console.log('success')
                }) 
    
    },

    selected(res,rej,selection){
    	this.get('user').child('songs').child(selection)    
         .on("value",(song) => {
					 let om = song.val();
					 Ember.run(this,this.get('options.songConfig'),om.params)
					 this.set('composition',om.composition)
					 //om.parts.map( part => {
						 /*
						 part.fretboard.map( board =>{
						 		if(board.notes.length){
									board.notes = board.notes
								}	
						 })
					 }*/
					 res(om.parts)
				 })
			/*			 
         root.off('value')
         root.on('child_changed',((snapshot) => {

          console.log('returned') 
          this.get('selected.content')
            .objectAt(snapshot.key()).notes
            .replace(0,6,snapshot.val().notes)

         }))
*/
    },
 
    update(value){
          console.log("socket update",value)
     
     var base = this.get('auth.user'),
         song = this.get('selected.selection'),
         index = this.get('selected.index');
          
      console.log( base, song, index ) 

     var ref = base
             .child('songs')
              .child(song)
              .child(index)

      if(value.length === 6) { 
    
         ref.update({notes:value})
    
      }else{
        let [fret,string] = value;
        ref.child('notes')
			.update({[string]:fret})  
       } 
    },

 chords(res,rej){
	 this.get('user').child('chords')
  	 .on('value',(chords) => res(chords.val()))
 },

	names(res,rej){
  	this.get('user').child('songs')
    	.on("value",(songs) => res(Object.keys(songs.val())))
  },


     auth:Ember.inject.service(),

});
