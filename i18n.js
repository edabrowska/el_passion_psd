const NextI18Next = require('next-i18next').default

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'pl',
  browserLanguageDetection: false,
  serverLanguageDetection: false,
  otherLanguages: ['en'],
  localePath: 'public/locales',
  localeStructure: '{{lng}}/{{ns}}'
})

module.exports = NextI18NextInstance
