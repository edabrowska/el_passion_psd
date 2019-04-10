const NextI18Next = require('next-i18next/dist/commonjs')

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'pl',
  browserLanguageDetection: false,
  serverLanguageDetection: false,
  otherLanguages: ['en'],
})

module.exports = NextI18NextInstance
