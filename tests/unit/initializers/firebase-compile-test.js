import Ember from 'ember';
import FirebaseCompileInitializer from 'sound-lab/initializers/firebase-compile';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | firebase compile', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  FirebaseCompileInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
