import cookie from 'cookie'

const _ssrAppendCookieToHeader = (key, value, res, options) => {
  const existingHeaders = res.getHeader('Set-Cookie')
  let existingCookieStrings = []

  if (typeof existingHeaders === 'string') {
    existingCookieStrings = [existingHeaders]
  } else if (Array.isArray(existingHeaders)) {
    existingCookieStrings = existingHeaders
  }

  res.setHeader('Set-Cookie', [cookie.serialize(key, `${value}`, options), ...existingCookieStrings])
}

export const setCookies = (key, value, res, options = {}) => {
  const _opts = {
    path: '/',
    ...options,
  }
  if (res) {
    _ssrAppendCookieToHeader(key, value, res, _opts)
  } else {
    document.cookie = cookie.serialize(key, `${value}`, _opts)
  }
}

export const getCookie = (req, key) => {
  let cookieString
  if (req && req.headers && req.headers.cookie) {
    cookieString = req.headers.cookie
  } else if (typeof document !== 'undefined') {
    cookieString = document.cookie
  }
  return cookieString ? cookie.parse(cookieString, { decode: true })[key] : null
}

export const deleteCookie = (res, key, options = {}) => {
  const expiredOptions = { ...options, expires: new Date() }
  if (res) {
    res.setHeader('Set-Cookie', cookie.serialize(key, ''), expiredOptions)
  } else {
    document.cookie = cookie.serialize(key, '', expiredOptions)
  }
}
