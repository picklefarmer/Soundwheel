import blank from './generateBlank';
export default function(index){
  return {
    name:null,
    lyrics:[[]],
		kit:[[0,0,0,0,0,0,0,0]],
    fretboard:[
      blank.call(this)    
    ]
  }
}
