import Major from '../instances/C_major';

export default function(fret,string,beatIndex){

  console.log('this is pitch',this.get('song'), fret, string)

  let block = [28,23,19,14,9,4] || this.get('song.tone.indexes'),
      slab  = block[string]+fret,
      orb   = [],
			offset=	6,
			phase =	slab%12 +1,
      note  = Major[phase],
			octave= Math.floor((slab)/12);



/*		NOTES
			string[0]  = 4
			fret 		= 1
		 	string[0] + fret = 5 = F


			number = 26
				26 = 11 + 11 + 4
				o = 2
				note = 4
			|
			|
			|
			|
			|
		4	|

*/

      if(note){
        console.log(phase,slab,fret,string,'temple')
       orb = { note: note.p ,
               o:octave,
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
