// https://github.com/zeit/next.js/issues/2548#issuecomment-324582319

const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync
const revHash = require('rev-hash')

const SRC_DIR = 'static'
const HASH_DATA = {}

const {
  HASHED_STATIC_DIR,
  HASH_MAP_FILENAME,
} = require('./helpers.js')

execSync(`rm -r -f ${HASHED_STATIC_DIR}`)

const buildStatic = (src, dist) => {
  fs.access(dist, (err) => {
    err && fs.mkdirSync(dist)

    makeHashes(src, dist)
  })
}

/**
 * create hashes for all files and save the mapping to static-hash.json
 */
const makeHashes = (src, dist) => {
  const paths = fs.readdirSync(src)

  paths.forEach((_path) => {
    const subSrc = `${src}/${_path}`
    const subDist = `${dist}/${_path}`
    const stat = fs.statSync(subSrc)

    if (stat.isFile()) {
      const fileData = fs.readFileSync(subSrc)
      const pathObj = path.parse(subSrc)
      const hash = revHash(fileData)
      const hashDir = pathObj.dir.split(`${SRC_DIR}/`)[1] || ''
      const hashKey = `${hashDir}${hashDir ? '/' : ''}${pathObj.name}${pathObj.ext}`
      const filePath = `${path.parse(subDist).dir}/${pathObj.name}.${hash}${pathObj.ext}`

      if (pathObj.ext) {
        HASH_DATA[hashKey] = hash
        fs.writeFileSync(filePath, fileData)
      }
    } else if (stat.isDirectory()) {
      buildStatic(subSrc, subDist)
    }
  })

  fs.writeFileSync(HASH_MAP_FILENAME, JSON.stringify(HASH_DATA))
}

buildStatic(SRC_DIR, HASHED_STATIC_DIR)
