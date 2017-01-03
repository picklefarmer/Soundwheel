
const setupFallback = function(chatObject){
  let value = chatObject.val();
  if(value){
    return value
  }else{
    
 //   this.get('userAtSelection').child('chat'
  }
  
};

export default function(){
  let hall = this.get('auth'),
  displayName = hall.get('displayName') || 'anonymous',
  photoURL    = hall.get('photoURL') || './images/dino.ico';
  console.log('this is from the song method messageIn',{displayName,auth:this.get('auth'),photoURL})
  return {displayName,photoURL}
};
