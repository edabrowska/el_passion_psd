import i18n from 'i18next'
import XHR from 'i18next-xhr-backend'

import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

function loadLocales (url, options, callback, data) {
  try {
    let waitForLocale = require('~/locales/' + url + '.yml')
    waitForLocale((locale) => {
      callback(locale, { status: '200' })
    })
  } catch (e) {
    callback(null, { status: '404' })
  }
}

i18n
  .use(XHR)
  .init({
    ns: ['common'],
    fallbackLng: 'en',
    debug: publicRuntimeConfig.APPLICATION_ENV !== 'production',

    backend: {
      loadPath: '{{lng}}/{{ns}}',
      ajax: loadLocales,
      parse: data => data
    },

    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    }
  })

export default i18n
