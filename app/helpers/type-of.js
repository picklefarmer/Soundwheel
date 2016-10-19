import Ember from 'ember';

export function typeOf(val) {
	let value = Ember.typeOf(val[0]),
      component;

	switch(value){
    case 'number' : component   = "select-me";    	break;
    case 'string' : component   = "toggle-button";	break;
    case 'array'  : component   = "option-set";   	break;
    case 'object' : component   = "select-set";			break;
		case 'function' : component   = "select-set";			break;
    default       : component   = "toggle-me"; 			break;
  }

    	  console.log(component,value,"component")
    return component

}

export default Ember.Helper.helper(typeOf);
