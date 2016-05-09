import Ember from 'ember';
import ToneObjectMixin from 'sound-lab/mixins/tone-object';
import { module, test } from 'qunit';

module('Unit | Mixin | tone object');

// Replace this with your real tests.
test('it works', function(assert) {
  let ToneObjectObject = Ember.Object.extend(ToneObjectMixin);
  let subject = ToneObjectObject.create();
  assert.ok(subject);
});
