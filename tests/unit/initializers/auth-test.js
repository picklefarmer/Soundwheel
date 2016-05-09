import Ember from 'ember';
import AuthInitializer from 'sound-lab/initializers/auth';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | auth', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  AuthInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
