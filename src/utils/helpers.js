import staticHash from '~/static-hash'

export const hasWindow = () => typeof window !== 'undefined'

const isStaticExport = process.env.STATIC_EXPORT

export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export const getStaticFilePath = (path) => {
  let filePath = path
  if (isStaticExport) {
    const hash = staticHash[path]
    const [fileName, fileExt] = path.split('.')
    filePath = `${fileName}.${hash}.${fileExt}`
  }

  const STATIC_DIR = '/static/'

  return `${STATIC_DIR}${filePath}`
}

export const isSVG = path => /\.svg$/.test(path)

const HDPI_MEDIA_QUERY = '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'

export const getScaledImagePath = (path, scale = 2) => path.replace(/\.([\w]*)$/, `@${scale}x.$1`)

export const getRasterImagePath = (path) => {
  const isHiDPI = hasWindow() && window.matchMedia && window.matchMedia(HDPI_MEDIA_QUERY).matches
  if (!isSVG(path) && isHiDPI) {
    path = getScaledImagePath(path)
  }
  return getStaticFilePath(`assets/${path}`)
}
