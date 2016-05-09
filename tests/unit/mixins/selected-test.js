import Ember from 'ember';
import SelectedMixin from 'sound-lab/mixins/selected';
import { module, test } from 'qunit';

module('Unit | Mixin | selected');

// Replace this with your real tests.
test('it works', function(assert) {
  let SelectedObject = Ember.Object.extend(SelectedMixin);
  let subject = SelectedObject.create();
  assert.ok(subject);
});
