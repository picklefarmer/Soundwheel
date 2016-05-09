import Ember from 'ember';

export function btnRow(inx,low) {

  return inx + (low-1)
}

export default Ember.Helper.helper(btnRow);
