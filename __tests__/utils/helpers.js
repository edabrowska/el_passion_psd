import {
  getScaledPath
} from '~/utils/helpers'

it('getScaledPath', () => {
  expect(getScaledPath('lol.png')).toEqual('lol@2x.png')
})
