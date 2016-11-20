import Ember from 'ember';
import onChange from './functions/onChange';

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
			var juncture;
			if(this.get('options.couple')){
					juncture = this.get('base').ref(this.get('options.pairingParam'));
			}else{
	    		juncture	= this.get('user');
			}
				
		 juncture = juncture.child('songs').child(selection)
			 juncture
         .on("value",(song) => {
					 console.log('value of selected',song,song.exportVal(),selection)
					 let om = song.val();
					 Ember.run(this,this.get('options.songConfig'),om.params)
					 this.set('composition',om.composition)
					 om.parts.forEach( (part,I) => {
						 part.fretboard.forEach( (board,II) =>{
						 		if(!board.notes.length){
									let notes = [];
									Object.keys(board.notes).map( key => notes[key] = board.notes[key])
									om.parts[I].fretboard[II].notes = notes
								}	
						 })
					 })
					 juncture.off()
					 //if(this.get('song.isLive'){}
					 let proxy = onChange.call(this,juncture.child('parts'), song.val().parts);
					 res(proxy)
					 //res(om.parts)
				 })


/*
		 	juncture.child('parts').on('child_changed')
				.then(parts=> {
						let partCount = parts.numChildren();
						console.log('partCount',partCount)
					if(partCount !== this.get('numChildren')){
						this.set('numChildren',partCount)
						parts.forEach(part=>{
							let node = juncture.child('parts').child(part.key);
							node.off()
							node.on('child_changed',function(amount){
								console.log(amount.val(),part.key,amount.key,amount.exportVal(),'amount')
							})
						})
					}
			})
			*/
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
     
     var 	base	= this.get('user'),
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
				.child('fretboard').child(index)
				.child('notes');


      if(value.length === 6) { 
			/*
			[[v],[],[],[],[],[]]
			[{0:{beat:v},1:{beat,v
			*/
				let update = {}
				value.forEach((e,f)=> {
					update[f+"/"+beat+"/"] = e
				})

				ref.update( update ) 
//      ref.set(update)

      }else{
        let [fret,string] = value;
				ref.update({[string+'/'+beat+"/"]:fret})  
      } 
    	this.get('playMatrix.beat').call(this,beat)
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
