// https://github.com/acdlite/flux-standard-action
const actionCreator = (type) => (payload) => ({type, payload})

export default {
  setThing: actionCreator('SET_THING'),
}
