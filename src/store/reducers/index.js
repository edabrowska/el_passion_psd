import { combineReducers } from 'redux'
import mainReducer from '~/store/reducers/main'

export default combineReducers({
  main: mainReducer,
})
