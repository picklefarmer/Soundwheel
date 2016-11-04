import Ember from 'ember';

export function arrMe(params/*, hash*/) {
  return params[0]+1;
}

export default Ember.Helper.helper(arrMe);
