import Ember from 'ember';
import Base from './instances/omni-base';
import Numeric from './../mixins/instances/numeric';
export default Ember.Component.extend(Base,{
	classNames: ['menubar'],
  song:Ember.inject.service(),
  beatMask:Numeric,

});
