import Ember from 'ember';

export function propertyMe(value,controller) {

  return this.get('controller.'+value);
}

export default Ember.Helper.helper(propertyMe);
