const initialState = {
  fakeData: null,
  data: null
}

export default (state = initialState, action) => {
  const { payload, type } = action
  switch (type) {
    case 'SET_FAKE_DATA':
      return {
        ...state,
        fakeData: payload,
      }

    case 'SET_DATA':
      return {
        ...state,
        data: payload,
      }

    case 'CREATE_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          [payload.id]: payload
        },
      }

    case 'UPDATE_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          [payload.id]: payload
        },
      }

    case 'DELETE_DATA': {
      const data = { ...state.data }
      delete data[payload.id]
      return {
        ...state,
        data,
      }
    }

    default:
      return state
  }
}
