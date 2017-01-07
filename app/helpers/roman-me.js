import Ember from 'ember';
import Numeric from './../mixins/instances/numeric';

export function romanMe(params/*, hash*/) {
  console.log(params, 'glyph')
  return params[0].map( u => Numeric[u]).join(' ')
  //return params[0] === params[1];
}

export default Ember.Helper.helper(romanMe);
