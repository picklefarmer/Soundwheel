import Ember from 'ember';

export function lookUp(service,method) {
		var selectionArr = service.get(method+"Arr")
        console.log('lookup',service,method,selectionArr) 
    return selectionArr
}

export default Ember.Helper.helper(lookUp);
