import Ember from 'ember';

export default Ember.Service.extend({
		init(){
			console.log('init firebase')
		},
   /* 
    instrument(res,rej,selection){
      var root = this.get('auth.base')
                     .child('instruments')
                     .child(selection);

          root.on("value",(snapshot)  =>{
            res(snapshot.val())
          })
    },
    */

    instrumentNames(res,rej){
      console.log ( 'instrument Names Auth ' ) 
      var root = this.get('auth.user')
                     .child('instruments'),
          objArray = [];

        root.on("value",(snapshot) =>{
          snapshot.forEach(hash  => {
          
            objArray.push({
                            "name":hash.key(),
                            "enabled":hash.val()
                          })
          })

          res(objArray)

        }) 
    },

    main(res,rej){
      var root = this.get('auth.user')
                     .child('settings/main'),
          objArray = [];

          root.on("value", (snapshot) => {
              res(snapshot.val())
          })
    },

    panels(res,rej){
      var root = this.get('auth.user')
                  .child('settings/panels'),
          objArray = [];
        
         root.on("value",(snapshot) => {
           snapshot.forEach(hash => {
            objArray.push({
                            "name":hash.key(),
                            "enabled":hash.val().enabled,
                            "options":hash.val().options
                          })
            })

            res(objArray)
         })
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
      var root = this.get('auth.user')
         .child('songs')
         .child(selection);
         

         root.on("value",(snapshot) => {
          res(snapshot.val())
         })
         root.off('value')
         root.on('child_changed',((snapshot) => {

          console.log('returned') 
          this.get('selected.content')
            .objectAt(snapshot.key()).notes
            .replace(0,6,snapshot.val().notes)

         }))

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
        this.get('auth.user')
          .child('chords')
          .on('value',(snapshot) => {  
            res(snapshot.val())
          })
     },

     names(res,rej){
        this.get('auth.user')
          .child('songs')
          .on("value",(snapshot) => {
            var names = Object.keys(snapshot.val())
            res( names)
            })
     },


     auth:Ember.inject.service(),

});
