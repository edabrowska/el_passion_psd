const path = require('path')
const dotenv = require('dotenv')

const applicationEnv = process.env.APPLICATION_ENV || 'development'

// load env variables
dotenv.load({ path: path.resolve(process.cwd(), '.env') })
dotenv.load({ path: path.resolve(process.cwd(), 'config', `${applicationEnv}.env`) })
