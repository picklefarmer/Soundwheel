import Ember from 'ember';


export function ofArray(params) {
  return params[1].some( e => e===params[0])
}

export default Ember.Helper.helper(ofArray);
