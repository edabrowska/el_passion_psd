const execSync = require('child_process').execSync

const EXPORT_DIR = 'out'
execSync(`cp .next/service-worker.js ${EXPORT_DIR}`)
