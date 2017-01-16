import Ember from 'ember';

export function combineMe(params/*, hash*/) {

  let map = {};

  params.forEach( param => Object.keys(param).forEach(key => map[key]=param[key]))

  return map;
}

export default Ember.Helper.helper(combineMe);
