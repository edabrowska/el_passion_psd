import staticHash from '~/static-hash'

const isStaticExport = process.env.STATIC_EXPORT

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
