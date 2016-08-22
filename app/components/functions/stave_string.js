import Pitch      from  './pitch';
import whole_note from  './whole_note';
import half_note  from  './half_note';
import augmentation from  './augmentation';

export default function(string,index){
    console.log(string,index,'String')
      let figure  = this.get('figure'),
          beats   = string.length;
      
          
      if(!beats){
        if(string){
          whole_note.call(this,0,Pitch.call(this,string,index,'whole'))     }
      }else{
        for(let beat = figure;beat<beats;){

          let pulse = string[beat],
              pitch = Pitch;
          if(pulse){
            let note = [ 
                beat,
                pitch.call(this,pulse,index,'beat')
                ];

            augmentation.apply(this,note)
            half_note.apply(this,note)
          }

          beat++
        }
      }
  }
/*
          let row = string[beat].length,
}else{
  
            while(row--){
              let note =  [
                       row,
                       pitch.call(this,pulse[row][0],index)
                        ];
              switch(string[beat][1]){
                case 1: whole_note.apply(this,note);break;
                default: half_note.apply(this,note);break;
              }
            }
          }
          */
