import Ember from 'ember';

export function btnOut(inx,bool) {

  return !bool?inx-1:inx+1;
}

export default Ember.Helper.helper(btnOut);
