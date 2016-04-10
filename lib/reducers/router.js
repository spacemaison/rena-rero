import { PUSH_PAGE, POP_PAGE } from '../actions/actions'
import { LinkInformation } from '../models/LinkInformation'

export function router (router = {}, action) {
  const { stack: last = [] } = router

  switch (action.type) {
    case POP_PAGE:
      return { stack: last.slice(0, last.length - 1) }

    case PUSH_PAGE:
      return { stack: last.concat(new LinkInformation(action.payload)) }
  }

  return router
}
