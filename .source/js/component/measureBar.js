App.MeasureBarComponent = Ember.Component.extend({
    classNames:["scroll","sidebar"],
    tagName:"ul",

    time:Em.computed.oneWay('controller.editScore.length'),

    attributeBindings:["dims:style"],

	dims:Em.computed('width',{
		get(){

	    	let height = $(document).height(),
    			width =  (this.get('width') || 1)* ~~(height/18) +"px";

    		console.log( height, width) 

	    	return "height:"+ height+"px;width:"+width

		}
	}),

    range:[1,2,3,4],


})



