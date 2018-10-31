import fetchAndDispatch from '~/services/common'
import { manageFakeData, manageApiData } from '~/api'
import mainActions from '~/store/actions/main'

export const handleFakeData = {
  get: fetchAndDispatch(manageFakeData.get, mainActions.setFakeData)
}

export const handleApiData = {
  get: fetchAndDispatch(
    manageApiData.get,
    mainActions.setData
  ),
  create: fetchAndDispatch(
    manageApiData.create,
    mainActions.createData
  ),
  update: (data) => fetchAndDispatch(
    manageApiData.update,
    mainActions.updateData
  ),
  delete: (data) => fetchAndDispatch(
    manageApiData.delete,
    mainActions.deleteData
  ),
}
