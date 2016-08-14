import Ember from 'ember';

export function btnRow(inx,low) {
  low = inx[1]
  inx = inx[0]

  return inx + (low-1)
}

export default Ember.Helper.helper(btnRow);
