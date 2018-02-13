import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from '~/store/reducers'

export default (state) => {
  return createStore(
    rootReducer,
    state,
    composeWithDevTools()
  )
}
