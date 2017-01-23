import Ember from 'ember';
import onChange from './functions/onChange';

export default Ember.Service.extend({
		init(){
			console.log('init firebase')
		},

		auth:Ember.inject.service(),

		base:firebase.database(),

/*		userAtSelection:Ember.computed('user','selected.selection',function(){
		console.log('user at selection', this.get('selected.selection'))	
			return this.get('user').child('songs/'+this.get('selected.selection'))
		}),
		*/

		user:Ember.computed('auth.uid','base',function(){
			if(this.get('auth.uid')){
				console.log('this.get.base',this.get('base').ref(this.get('auth.uid')))
				return this.get('base').ref(this.get('auth.uid'))
			}
		}),

		leaders(res,ref){
			this.get('base').ref('leaders').once('value', snap => res(snap.val()))
		},
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
				.on('value',(routes)=>{
					let value = routes.val();
						console.log( ' options on firebase content.song',value)
						if (!value ) {
							console.log( ' options on firebase ',value ) 
							Ember.run (this.get('auth'),this.get('auth.userNew'),'settings.routes',res ) 
						} else{
            	res(value)
						}
				})
		},

    options(res,rej){
      var root = this.get('auth.user')
                  .child('settings/options');

          root.on("value",(snapshot) => {
						let value = snapshot.val();
						console.log( ' options on firebase content.song',value)
						if (!value ) {
							console.log( ' options on firebase ',value ) 
							Ember.run (this.get('auth'),this.get('auth.userNew'),'settings.options',res ) 
						} else{
            	res(snapshot.val())
						}
         })
    },

    updateChords(update){
      console.log (update,this,this.get('firebase'), ' observation got _2' )

      this.get('group').child('chords')
          .set(update,()=>{
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
			var juncture;
	    		juncture	= this.get('group');
				
		 juncture = juncture.child('songs').child(selection)
			 juncture
         .once("value",(song) => {
					 console.log('value of selected',song,song.exportVal(),selection)
					 let om = song.val();

					 //params
					 Ember.run(this,this.get('options.songConfig'),om.params)
					 //composition
					 this.set('composition',om.composition)
					 //parts
					 //
					 om.parts.forEach( (part,I) => {
						 part.fretboard.forEach( (board,II) =>{
						 		if(!board.notes.length){
									let notes = [];
									Object.keys(board.notes).map( key => notes[key] = board.notes[key])
									om.parts[I].fretboard[II].notes = notes
								}	
						 })
					 })
					 //if(this.get('song.isLive'){}
					 let proxy = onChange.call(this,juncture.child('parts'), om.parts);
					 res(proxy)
					 //res(om.parts)
				 })
    },
 
    update(value,isRest){
          console.log("socket update",value)
     
     var 	base	= this.get('group'),
					beat	=	this.get('beat'),
         	index = this.get('selected.index'),
					part	= this.get('selected.partInstance'),
        	song	= this.get('selected.selection');

					//				string
					// [ 0, 4, 3, 2, 0, 0][beat]
          
      console.log( base, song, index ,part, beat ,'update ') 

     var ref = base
        .child('songs').child(song)
				.child('parts').child(part)
				.child('fretboard').child(index);

//				.child('notes');


      if(isRest){
      
        value.forEach ( (e,f)=>{
          ref.child('notes/'+f+'/'+beat).remove()
        } ) 
        ref.child('map').update({[beat]:0})
      }else if(value.length === 6) { 
			/*
			[[v],[],[],[],[],[]]
			[{0:{beat:v},1:{beat,v
			*/
				let update = {}
				value.forEach((e,f)=> {
					update[f+"/"+beat+"/"] = e
				})

				ref.child('notes').update( update )
        //TODO make sustainBeat ;  
        ref.child('map').update ( {[beat]:1})
//      ref.set(update)

      }else{
        let [fret,string] = value;
				ref.update({[string+'/'+beat+"/"]:fret.toString()})  
      } 
    	this.get('playMatrix.beat').call(this,beat)
    },

 chords(res,rej){
	 console.log(' firebase_chords' , "")
	 this.get('group').child('chords')
  	 .on('value',(chords) => res(chords.val()))
 },

	names(res,rej){
		console.log(this.getProperties('user','userAtSelection'))
  	this.get('user').child('songs')
    	.once("value",(songs) => res(Object.keys(songs.val())))
  },
});
