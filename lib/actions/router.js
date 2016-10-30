import { action } from './action'
import { CLOSE_DRAWER, OPEN_DRAWER, POP_PAGE, PUSH_PAGE } from './actions'

export const popPage = action.bind(null, POP_PAGE)
export const pushPage = action.bind(null, PUSH_PAGE)
export const openDrawer = action.bind(null, OPEN_DRAWER)
export const closeDrawer = action.bind(null, CLOSE_DRAWER)
