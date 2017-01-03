import Ember from 'ember';
import dataLink from '../mixins/data-link';

const LENGTH = 4,
  displayMessage = function(val){
  let dataArray = this.get('song.dataArray');
  if(dataArray.length > LENGTH){
    dataArray.shift()
  }
  dataArray.pushObject(val.val())
    console.log(val.val(),this.get('dataArray'),'val from message function')
};
export default Ember.Component.extend(dataLink,{
  classNames:['menubar'],
  song:Ember.inject.service(),

  init(){
    this._super()
    console.log('init pants')
  },
  dataArray:Ember.A([]),
  actions:{
    clear(){
      this.set('myValue','')
      console.log('clear the field')
    }
  },
  myValue:'nineteen',
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
