import Ember from 'ember';

export function compOf(val) {
	let value = Ember.typeOf(val[0]),
      component;

	switch(value){
    case 'number' : component   = "select-me";    	break;
    case 'string' : component   = "toggle-property";	break;
    case 'array'  : component   = "option-set";   	break;
    case 'object' : component   = "select-me";			break;
		case 'function' : component   = "select-set";			break;
    default       : component   = "toggle-me"; 			break;
  }

    	  console.log(component,value,"component")
    return component

}

export default Ember.Helper.helper(compOf);
