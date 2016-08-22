import Rest from './Rests';

export default function(restLength,startBeat){
      let note_width = this.get('note_width'),
          measureIndex = this.get('measureIndex'),
          measure_width = this.get('measure_width'),
          stave_key     = this.get('stave_key'),
          ctx = this.get('ctx'),
          y = -stave_key + 16,
          x = (startBeat * note_width * 5) + measureIndex*measure_width + 20;

          console.log(x,restLength,y,' rest note' )
	
					switch(restLength){
						case 1:Rest.eigthRest(x,y,ctx);break;
						case 4:Rest.halfRest(x,y,ctx);break;
						default:Rest.quarterRest(x , y,ctx );break;
					}				

			    };




