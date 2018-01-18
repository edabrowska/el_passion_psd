import { configure } from '@storybook/react'

const loadStories = () => {
  require('./components.js')
}

configure(loadStories, module)
