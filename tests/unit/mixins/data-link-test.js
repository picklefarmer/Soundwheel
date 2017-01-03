import Ember from 'ember';
import DataLinkMixin from 'sound-lab/mixins/data-link';
import { module, test } from 'qunit';

module('Unit | Mixin | data link');

// Replace this with your real tests.
test('it works', function(assert) {
  let DataLinkObject = Ember.Object.extend(DataLinkMixin);
  let subject = DataLinkObject.create();
  assert.ok(subject);
});
