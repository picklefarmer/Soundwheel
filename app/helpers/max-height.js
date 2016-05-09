import Ember from 'ember';

export function maxHeight(length) {
 	var height =  $('body')[0].scrollHeight/2/20
  	console.log ( 'height', height ,length) 
  	return length > height
}

export default Ember.Helper.helper(maxHeight);
