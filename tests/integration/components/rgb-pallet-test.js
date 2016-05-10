import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rbg-pallet', 'Integration | Component | rbg pallet', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{rbg-pallet}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#rbg-pallet}}
      template block text
    {{/rbg-pallet}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
