import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings:['highlight:selected','current:hit','isRest:rest','isNote:note'],
  tagName:"li",
  beatType:Ember.computed('beatMap.[]','index',function(){
					console.log('beatType')
    return this.get('beatMap')[this.get('index')]
  }),

  isEdit:Ember.computed('current','song.isEdit',function(){
    console.log(this.getProperties('current'),this.get('song.isEdit'))
    if(this.get('song.isEdit') && this.get('current')){
      return true
    }
  }),
  toFocus(){
    console.log(this.get('element'))
    this.get('element').focus()
  },

  	measure:Ember.computed('index',{
		get(){
			var measure = this.get('index').toString()

			if(	measure[1] ){
				return measure
			}

			return "0"+measure
		}
	}),

  //isRest:Ember.computed.equal('beatType','r'),
  isRest:Ember.computed.equal('beatType',0),
  //isNote:Ember.computed.equal('beatType','b'),
  isNote:Ember.computed.equal('beatType',1),

	willRender(){
    this.set('active',Ember.computed.equal('boundValue',this.get('index')))
  },
  click(){
    this.set('boundValue',this.get('index'))
  }
});
