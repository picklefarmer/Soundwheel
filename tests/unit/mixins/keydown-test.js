import Ember from 'ember';
import KeydownMixin from 'sound-lab/mixins/keydown';
import { module, test } from 'qunit';

module('Unit | Mixin | keydown');

// Replace this with your real tests.
test('it works', function(assert) {
  let KeydownObject = Ember.Object.extend(KeydownMixin);
  let subject = KeydownObject.create();
  assert.ok(subject);
});
