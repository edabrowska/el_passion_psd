import {
  getStaticFilePath,
  getScaledImagePath,
} from '~/utils/helpers'

it('getStaticFilePath', () => {
  const fileName = 'lol.png'
  expect(getStaticFilePath(fileName)).toMatch(fileName)
})

it('getScaledImagePath', () => {
  expect(getScaledImagePath('lol.png')).toEqual('lol@2x.png')
})
