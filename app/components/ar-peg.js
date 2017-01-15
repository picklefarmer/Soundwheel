import Ember from 'ember';

export default Ember.Component.extend({

	tagName:"table",
  classNames:['vertical-align'],
	classNameBindings:["isEditing","verticalTab:vertical-dash"],
	isEditing:false,
	chordNotes:Ember.computed.filter('chord',function(e){if(e){return true}}),
	low:Ember.computed.min('chordNotes'),
	high:Ember.computed.max('chordNotes'),

	difference:Ember.computed('high','low',{
		get(){
			var aom = new Date().getTime()

			Ember.run.scheduleOnce('afterRender',this,function(){
				var eom = new Date().getTime()
				console.log('after Render', eom - aom)
			})

			var leng = [],
        	    length =  Math.abs(this.get('low') - this.get('high'))+1;

            console.log('length of difference',length)

            while(length-- > 0){
              leng.push(0)
            }
//            leng.length = length
console.log('lenght array of dirrence',leng)
			return leng
		}
	}),

	click(){
		console.log ( ' link  ' ,this.get('low') )
		this.sendAction('action',this.getProperties('chord','difference','low'))
	},

    touchEnd(){
        this.send('click') 
    },

	actions:{

		toggleSelected(string,fret){
			console.log ('toggleSelected',string, fret) 
			this.get('higher').send('toggleSelected',string,fret) 
		},

		appendToSelectedCol(string,fret){
			console.log ('appendToSelectedCol','string:',string,'fret', fret) 
			this.get('higher').send('appendToSelectedCol',string,fret,this.get('low')) 
		},

		appendToSelected(string,fret){
			console.log ('appendToSelected',"string:",string,"fret:", fret) 
			this.get('higher').send('appendToSelected',string,fret,this.get('low')) 
		}
	}

});
