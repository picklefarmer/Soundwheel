import Ember from 'ember';

export function romanMe(params/*, hash*/) {
  return params[0].map( num => '\\'+'u216'+num).join(':')
  //return params[0] === params[1];
}

export default Ember.Helper.helper(romanMe);
