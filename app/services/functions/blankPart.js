import blank from './generateBlank';
export default function(index){
  return {
    name:null,
    lyrics:[[]],
    fretboard:[
      blank.call(this)    
    ]
  }
}
