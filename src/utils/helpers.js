export const hasWindow = () => typeof window !== 'undefined'

export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export const getStaticFilePath = (path) => {
  let filePath = require(`../../static/${path}`)
  return filePath
}

export const isSVG = path => /\.svg$/.test(path)

const HDPI_MEDIA_QUERY = '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'

export const getScaledPath = (path, scale = 2) => path.replace(/\.([\w]*)$/, `@${scale}x.$1`)

export const getRasterImagePath = (path) => {
  const isHiDPI = hasWindow() && window.matchMedia && window.matchMedia(HDPI_MEDIA_QUERY).matches
  const scaledPath = !isSVG(path) && isHiDPI ? getScaledPath(path) : path

  let filePath
  try {
    filePath = getStaticFilePath(scaledPath)
  } catch (error) {
    filePath = getStaticFilePath(path)
  }
  return filePath
}
