
export default function(){

	let {	ac,
				boardVolume,
				masterVolume,
				compressor,
				analyser,
				kitVolume
	} = this.getProperties(
				'ac',
				'compressor',
				'analyser',
				'boardVolume',
				'masterVolume',
				'kitVolume'
	);


	boardVolume.connect(masterVolume)
 kitVolume.connect(masterVolume)
	masterVolume.connect(compressor)

	console.log( 'Audio Tree ') 
	//	this.get('ac').connect()

	compressor.connect(ac.destination)
	//compressor.connect(this.get('analyser'));

}
