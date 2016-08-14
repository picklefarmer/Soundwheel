import Ember from 'ember';

export function btnOut(inx,bool) {
  let source = inx[2]
  bool = inx[1]
  inx = inx[0]
  console.log('btn-out helper',inx,bool,source)
  return !bool?inx-1:inx+1;
}

export default Ember.Helper.helper(btnOut);
