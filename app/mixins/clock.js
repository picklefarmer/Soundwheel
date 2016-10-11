import Ember from 'ember';

export default Ember.Mixin.create({

  willRender(){
    this.checkFifteen()
  },
  checkFifteen(){
    this.toggleProperty('tick')
    console.log('tick')
    Ember.run.later(this,'checkFifteen',900000)
  },
  clock:Ember.computed('tick',function (h,n) {
	  return String.fromCharCode(55357,56656+((h=(n=new Date).getHours()%12)?h-1:11)+(n.getMinutes()>29&&12));
  })

});
