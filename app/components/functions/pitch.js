import Major from '../instances/C_major';

export default function(fret,string,arrayType){

  console.log('this is pitch',this.get('song'), fret, string)

  let block = [4,9,14,19,23,28] || this.get('song.tone.indexes'),
      slab  = block[string]+fret,
      orb   = [],
			offset=	3,
			phase =	((slab%11)+offset)%11,
      note  = Major[phase];



/*		NOTES
			string[0]  = 4
			fret 		= 1
		 	string[0] + fret = 5 = F
			|
			|
			|
			|
			|
		4	|

*/

      if(note){
        console.log(note,orb,'temple')
       orb = { note: note.p ,
               o: Math.floor(slab/12),
							 natural: note.natural
             };

      }else{
        console.log(orb,'dungeon')
      }

      return orb


}

/* NOTES
  
   octave = note%12

   [1,2,3, 4,5, 6,7, 8,9,10,11,12]
   [1,2b,2,3b,3,4,5b,5, 6, 7, 8]

      1w,2w,3h,4w,5w,6w,7h,8

 */
