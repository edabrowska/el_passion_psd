import fetch from 'isomorphic-fetch'

const withApiHost = (path) => `${process.env.API_URL}${path}`

const catchFailure = (res) => {
  if (res && res.status >= 400) {
    return Promise.reject(res)
  }
  return res
}

const formatResponse = async response => {
  let parsedJson
  try {
    parsedJson = await response.json()
  } catch (e) {
    parsedJson = null
  }
  return parsedJson
}

export const ajaxer = (url, method = 'GET', data) => {
  const isFormData = data && data.constructor === FormData
  return fetch(
    url,
    {
      method,
      ...data && { body: isFormData ? data : JSON.stringify(data) },
      headers: {
        ...!isFormData && { 'content-type': 'application/json' },
      },
    }
  )
    .then(catchFailure)
    .then(formatResponse)
}

const apiAjaxer = (url, ...props) => ajaxer(withApiHost(url), ...props)

export default apiAjaxer
