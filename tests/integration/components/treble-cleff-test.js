import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('treble-cleff', 'Integration | Component | treble cleff', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{treble-cleff}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#treble-cleff}}
      template block text
    {{/treble-cleff}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
