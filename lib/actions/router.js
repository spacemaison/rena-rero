import { action } from './action'
import { POP_PAGE, PUSH_PAGE } from './actions'

export const popPage = action.bind(null, POP_PAGE)
export const pushPage = action.bind(null, PUSH_PAGE)
