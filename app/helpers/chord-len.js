import Ember from 'ember';

export function chordLen(params/*, hash*/) {
  return params <= 5
}

export default Ember.Helper.helper(chordLen);
