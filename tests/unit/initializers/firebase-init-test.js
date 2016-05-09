import Ember from 'ember';
import FirebaseInitInitializer from 'sound-lab/initializers/firebase-init';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | firebase init', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  FirebaseInitInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
