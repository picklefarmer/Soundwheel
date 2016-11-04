import Ember from 'ember';

export function boolMe(params/*, hash*/) {
  return +params[0];
}

export default Ember.Helper.helper(boolMe);
