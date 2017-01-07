import Ember from 'ember';
import dataLink from '../mixins/data-link';

const LENGTH = 4,
  displayMessage = function(val){
  let dataArray = this.get('song.dataArray');
  let messObj = val.val();
  if(dataArray.length > LENGTH){
    dataArray.shift()
  }

  dataArray.pushObject(messObj)
    console.log(messObj,this.get('dataArray'),'val from message function')
};
export default Ember.Component.extend(dataLink,{
  classNames:['menubar','chat-pane'],
  song:Ember.inject.service(),

  init(){
    this._super()
    console.log('init pants')
  },
  dataArray:Ember.A([]),
  actions:{
    goToIndex(points){
      let [x,y,z] = points;
      this.set('song.selected.compIndex',x)
      this.set('song.selected.index',y)
      this.set('song.beat',z)
    },
    clear(){
      this.set('myValue','')
      console.log('clear the field')
    }
  },
  myValue:'',
  willRender(){
  let ref = this.get('ref');
    console.log('chat-pants',ref)
   if( !ref ){
     ref = this.get('song.userAtSelection').child('chat');
 
     this.set('ref',ref)
       .limitToLast(LENGTH)
       .on('child_added',displayMessage,this)
//  var messageRef = this.get('song.userAtSelection');

  //  messageRef.off();

//    messageRef.limitToLast(12).on('child_added',displayMessage,this)
    }else{
    
    }
  },
  willDestroy(){
    console.log('destroying chatbox')
    this.get('ref').off()
  },
});
