import Ember from 'ember';
import KeyDown from '../mixins/keydown';

export default Ember.TextField.extend(KeyDown,{
  classNames:"span-me"
});
