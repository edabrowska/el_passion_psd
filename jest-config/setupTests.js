import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

const { createHashFile } = require('../scripts/helpers.js')
createHashFile()

configure({ adapter: new Adapter() })
