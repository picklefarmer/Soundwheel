import Ember from 'ember';

export default Ember.Component.extend({
    song:Ember.inject.service(),
    classNames:["scroll","sidebar"],
    tagName:"ul",

    time:Ember.computed.oneWay('controller.editScore.length'),

    attributeBindings:["dims:style"],

	dims:Ember.computed('width',{
		get(){

	    	let height = Ember.$(document).height(),
    			width =  (this.get('width') || 1)* ~~(height/18) +"px";

    		console.log( height, width) 

	    	return "height:"+ height+"px;width:"+width

		}
	}),

    range:[1,2,3,4],



});
