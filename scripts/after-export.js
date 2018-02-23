const execSync = require('child_process').execSync

const { HASHED_STATIC_DIR } = require('./helpers.js')

const EXPORT_DIR = 'out'
const EXPORT_STATIC_DIR = `${EXPORT_DIR}/static`
const MANIFEST_FILE = 'manifest.json'

execSync(`rm -rf ${EXPORT_STATIC_DIR}`)
execSync(`mv ${HASHED_STATIC_DIR} ${EXPORT_STATIC_DIR}`)
execSync(`cp ${MANIFEST_FILE} ${EXPORT_DIR}/${MANIFEST_FILE}`)
