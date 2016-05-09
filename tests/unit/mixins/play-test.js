import Ember from 'ember';
import PlayMixin from 'sound-lab/mixins/play';
import { module, test } from 'qunit';

module('Unit | Mixin | play');

// Replace this with your real tests.
test('it works', function(assert) {
  let PlayObject = Ember.Object.extend(PlayMixin);
  let subject = PlayObject.create();
  assert.ok(subject);
});
