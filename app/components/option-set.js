import Ember from 'ember';
var expand = function(e){
  let v = e[Object.keys(e)[0]]
    if(typeof v === 'object'){
      return '\\u'+v[0]+'\\u'+v[1]
    }
      return '\\u'+v
};

export default Ember.Component.extend({
  song:Ember.inject.service(),
  modContent:Ember.computed('list','content',function(){
    let content = this.get('content'),
        list    = this.get('list').length ===1;
    if(list){
      return Object.keys(content).map( key => content[key])
    }
      return content
  }),
	actions:{
    	updater(name,val,index){
				//this.sendAction('action',val,index)
				this.get('song.main.'+name+'.options').replace(val,1,[index]);

		}
 	}


});
