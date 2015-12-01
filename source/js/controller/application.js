App.ApplicationController = Em.Controller.extend({

	vehicles:['banter','sele','mid'],
	selection:'mid',
	inut:"mea-sure",

	//  state:false,
	stats: ["resoviour"],

	belly:Em.computed({
		get(a,b,c){
  			console.log("belly app", a,b,c)
  			return "swindly"
  		}
	}),
})


