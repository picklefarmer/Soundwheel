import Ember from 'ember';


export default Ember.Component.extend({
  tagName:'canvas',
  classNames:['countdown'],
  attributeBindings:['width','height'],
  didInsertElement(){

   let ctx = this.get('element').getContext('2d');

   ctx.fillStyle='white'
   Ember.run.next(this,'runLoop',ctx,0) 

  },
  runLoop(ctx,a){
    window.requestAnimationFrame(()=>{ 
      ctx.fillRect(0,0,a,10)
      a = (a+10)%500
      if(this.get('song.isExplain')){
        if(a === 0){
          this.action()
          ctx.clearRect(0,0,1000,10)
        }
        Ember.run.later(this,'runLoop',ctx,a,100)
      }
    })
  },
})

