import { getStaticFilePath } from '~/utils/helpers'

it('getStaticFilePath', () => {
  const fileName = 'lol.png'
  expect(getStaticFilePath(fileName)).toMatch(fileName)
})
