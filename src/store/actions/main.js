import { actionCreator } from '~/store/actions/common'

export default {
  setFakeData: actionCreator('SET_FAKE_DATA'),

  // examples
  setData: actionCreator('SET_DATA'),
  createData: actionCreator('CREATE_DATA'),
  updateData: actionCreator('UPDATE_DATA'),
  deleteData: actionCreator('DELETE_DATA'),
}
