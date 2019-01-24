import { hasWindow } from '~/utils/helpers'
import { NEXT_REDUX_STORE_KEY } from '~/utils/consts'

export const getClientStore = () => hasWindow() && window[NEXT_REDUX_STORE_KEY]
