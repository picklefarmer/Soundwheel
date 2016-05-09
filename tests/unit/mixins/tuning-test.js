import Ember from 'ember';
import TuningMixin from 'sound-lab/mixins/tuning';
import { module, test } from 'qunit';

module('Unit | Mixin | tuning');

// Replace this with your real tests.
test('it works', function(assert) {
  let TuningObject = Ember.Object.extend(TuningMixin);
  let subject = TuningObject.create();
  assert.ok(subject);
});
