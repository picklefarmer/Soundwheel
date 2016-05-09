import Ember from 'ember';
import UpdateMethodsMixin from 'sound-lab/mixins/update-methods';
import { module, test } from 'qunit';

module('Unit | Mixin | update methods');

// Replace this with your real tests.
test('it works', function(assert) {
  let UpdateMethodsObject = Ember.Object.extend(UpdateMethodsMixin);
  let subject = UpdateMethodsObject.create();
  assert.ok(subject);
});
