const webfontsGenerator = require('webfonts-generator')
const path = require('path')
const fs = require('fs')

const FONTS_PATH = path.resolve(__dirname, '../icons/')

const classPrefix = 'i'
const fontName = 'icofont'
const files = fs.readdirSync(FONTS_PATH)

webfontsGenerator({
  files: files.reduce((filesArr, filename) => {
    if (filename.includes('.svg')) {
      filesArr.push(path.resolve(FONTS_PATH, filename))
    }
    return filesArr
  }, []),
  dest: 'static/icons/',
  fontName,
  cssDest: 'src/styles/icofont.js',
  cssTemplate: path.resolve(__dirname, 'webfont-generator-templates/styles.hbs'),
  cssFontsUrl: '../static/icons/',
  types: ['woff2', 'woff', 'eot', 'ttf'],
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
