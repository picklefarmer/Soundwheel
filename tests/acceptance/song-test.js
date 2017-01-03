import { test } from 'qunit';
import moduleForAcceptance from 'sound-lab/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | song');

test('visiting /song', function(assert) {
  visit('/red/song/destiny/edit');

  andThen(function() {
    assert.equal(currentURL(), '/red/song/destiny/edit');
  });
});
