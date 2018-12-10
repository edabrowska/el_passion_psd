import { I18nextProvider } from 'react-i18next'
import i18n from '~/utils/i18n'

export default (story) => {
  return <I18nextProvider i18n={i18n}>
    {story()}
  </I18nextProvider>
}
