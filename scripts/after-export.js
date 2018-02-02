const execSync = require('child_process').execSync

const { HASHED_STATIC_DIR } = require('./helpers.js')

const EXPORT_STATIC_DIR = 'out/static'

execSync(`rm -rf ${EXPORT_STATIC_DIR}`)
execSync(`mv ${HASHED_STATIC_DIR} ${EXPORT_STATIC_DIR}`)
