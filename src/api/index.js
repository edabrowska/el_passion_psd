import apiAjaxer, { ajaxer } from '~/api/common'

// external urls
export const manageFakeData = {
  get: () => ajaxer('https://jsonplaceholder.typicode.com/posts')
}

// api host examples
export const manageApiData = {
  get: () => apiAjaxer('/some/data'),
  create: (data) => apiAjaxer('/some/data', 'POST', data),
  update: ({ id, data }) => apiAjaxer(`/some/data/${id}`, 'PUT', data),
  delete: ({ id }) => apiAjaxer(`/some/data/${id}`, 'DELETE')
}
