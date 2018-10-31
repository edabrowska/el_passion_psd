const fetchAndDispatch = (fetcher, action) => (data, dispatch) => {
  return fetcher(data).then(res => {
    action && dispatch(action(res))
    return res
  })
}

export default fetchAndDispatch
