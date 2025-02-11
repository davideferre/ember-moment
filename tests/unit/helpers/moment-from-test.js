import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render } from '@ember/test-helpers';

module('moment-from', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.lookup('service:moment').changeLocale('en');
  });

  test('one arg (date)', async function (assert) {
    assert.expect(1);

    const momentService = this.owner.lookup('service:moment');

    this.set('date', momentService.moment().add(3, 'day'));

    await render(hbs`{{moment-from date}}`);
    assert.dom(this.element).hasText('in 3 days');
  });

  test('two args (dateA, dateB)', async function (assert) {
    assert.expect(1);

    const momentService = this.owner.lookup('service:moment');
    this.setProperties({
      dateA: new Date(),
      dateB: momentService.moment().add(3, 'day'),
    });

    await render(hbs`{{moment-from dateB dateA}}`);
    assert.dom(this.element).hasText('in 3 days');
  });

  test('two args (dateA, dateB, hideAffix=boolean)', async function (assert) {
    assert.expect(2);

    const momentService = this.owner.lookup('service:moment');
    this.setProperties({
      dateA: new Date(),
      dateB: momentService.moment().add(3, 'day'),
    });

    await render(hbs`{{moment-from dateB dateA hideAffix=true}}`);
    assert.dom(this.element).hasText('3 days');
    await render(hbs`{{moment-from dateB dateA hideAffix=false}}`);
    assert.dom(this.element).hasText('in 3 days');
  });

  test('three args (dateA, dateB, boolean)', async function (assert) {
    assert.expect(1);

    const momentService = this.owner.lookup('service:moment');
    this.setProperties({
      dateA: new Date(),
      dateB: momentService.moment().subtract(3, 'day'),
    });

    await render(hbs`{{moment-from dateA dateB true}}`);
    assert.dom(this.element).hasText('3 days');
  });

  test('can inline a locale', async function (assert) {
    assert.expect(1);

    const momentService = this.owner.lookup('service:moment');
    this.set('dateA', momentService.moment());
    this.set('dateB', momentService.moment().subtract(2, 'day'));

    await render(hbs`{{moment-from dateA dateB locale='es'}}`);
    assert.dom(this.element).hasText('en 2 días');
  });
});
