import { getClientStore } from '~/store/helpers'

const fetchAndDispatch = (fetcher, action) => (data, store = getClientStore()) => {
  return fetcher(data).then(res => {
    action && store.dispatch(action(res))
    return res
  })
}

export default fetchAndDispatch
