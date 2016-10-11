import Ember from 'ember';
import ClockMixin from 'sound-lab/mixins/clock';
import { module, test } from 'qunit';

module('Unit | Mixin | clock');

// Replace this with your real tests.
test('it works', function(assert) {
  let ClockObject = Ember.Object.extend(ClockMixin);
  let subject = ClockObject.create();
  assert.ok(subject);
});
