import i18n, { I18nextProvider } from '>/i18n'

export default (story) => {
  return <I18nextProvider i18n={i18n}>
    {story()}
  </I18nextProvider>
}
