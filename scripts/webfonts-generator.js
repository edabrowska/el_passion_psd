const webfontsGenerator = require('webfonts-generator')
const path = require('path')
const fs = require('fs')

const FONTS_PATH = path.resolve(__dirname, '../icons/')

const classPrefix = 'i'
const fontName = 'icofont'
const files = fs.readdirSync(FONTS_PATH)

webfontsGenerator({
  files: files.map(filename => path.resolve(FONTS_PATH, filename)),
  dest: 'static/icons/',
  fontName,
  cssDest: 'styles/base/' + fontName + '.scss',
  cssTemplate: path.resolve(__dirname, 'webfont-generator-templates/scss.hbs'),
  cssFontsUrl: '../static/icons/',
  types: ['woff2', 'woff', 'eot', 'ttf', 'svg'],
  templateOptions: {
    classPrefix
  },
  fontHeight: 1000,
  html: true,
  htmlDest: path.resolve(__dirname, '../stories/', fontName + '.stories.js'),
  htmlTemplate: path.resolve(__dirname, 'webfont-generator-templates/storybook.hbs'),
}, function (error) {
  if (error) {
    console.log('Fail!', error) // eslint-disable-line
  } else {
    console.log('Done!') // eslint-disable-line
  }
})