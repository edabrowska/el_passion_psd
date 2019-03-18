export const hasWindow = () => typeof window !== 'undefined'

export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export const getStaticFilePath = (path) => {
  let filePath
  try {
    filePath = require(`../../static/${path}`)
  } catch (error) {
    filePath = ''
  }
  return filePath
}

export const isSVG = path => /\.svg$/.test(path)

export const getScaledPath = (path, scale = 2) => path.replace(/\.([\w]*)$/, `@${scale}x.$1`)

export const getRasterImagePath = (path) => {
  if (!isSVG(path)) {
    path = getScaledPath(path)
  }
  return getStaticFilePath(path)
}
