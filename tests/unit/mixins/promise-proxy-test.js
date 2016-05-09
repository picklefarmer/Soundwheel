import Ember from 'ember';
import PromiseProxyMixin from 'sound-lab/mixins/promise-proxy';
import { module, test } from 'qunit';

module('Unit | Mixin | promise proxy');

// Replace this with your real tests.
test('it works', function(assert) {
  let PromiseProxyObject = Ember.Object.extend(PromiseProxyMixin);
  let subject = PromiseProxyObject.create();
  assert.ok(subject);
});
