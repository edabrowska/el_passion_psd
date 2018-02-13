import { combineReducers } from 'redux'

const initialMainState = {}

function mainReducer (main = initialMainState, action) {
  const { payload, type } = action
  switch (type) {
    case 'SET_THING':
      return {
        ...main,
        ...payload,
      }
    default:
      return main
  }
}
export default combineReducers({
  main: mainReducer,
})
