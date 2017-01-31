import Ember from 'ember';

export function isGlyph(params/*, hash*/) {
  let pam = params[0];
  return pam ? pam : 'u';
}

export default Ember.Helper.helper(isGlyph);
