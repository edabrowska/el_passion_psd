const fs = require('fs')

const HASH_MAP_FILENAME = 'src/static-hash.json'

module.exports = {
  HASHED_STATIC_DIR: 'static-hashed',
  HASH_MAP_FILENAME,
  createHashFile: () => {
    if (!fs.existsSync(HASH_MAP_FILENAME)) {
      fs.writeFileSync(HASH_MAP_FILENAME, JSON.stringify({}))
    }
  },
}
