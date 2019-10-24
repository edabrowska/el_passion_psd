import { Selector } from 'testcafe'

fixture`Fixture example`
  .page('https://google.com')


test('Google has body', async t => {
  const selector = Selector('body')
  await t.expect(selector.visible).ok()
})
