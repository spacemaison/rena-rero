import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  PUSH_PAGE,
  POP_PAGE } from '../actions/actions'
import { RouterState } from '../models/RouterState'
import { DrawerState } from '../models/DrawerState'
import { NavigationExperimental as Nav } from 'react-native'

export function router (initialRouteState = new RouterState()) {
  return _router.bind(new RouterState(initialRouteState))
}

function _router (router = this, { type, payload: route } = {}) {
  switch (type) {
    case CLOSE_DRAWER:
    case OPEN_DRAWER:
      const isOpen = type === OPEN_DRAWER
      const drawer = new DrawerState({ isOpen })

      return new RouterState(Object.assign({}, router, { drawer }))

    case PUSH_PAGE:
      const current = router.routes[router.index]

      if (current.key === (route && route.key)) {
        return router
      }

      const previous = router.routes
        .slice(0)
        .reverse()
        .find(({ url }) => route.url.path === url.path)

      if (previous) {
        route.url.query.count = (+previous.url.query.count || 0) + 1
      }

      return new RouterState(Nav.StateUtils.push(router, route))

    case POP_PAGE:
      if (router.index === 0 || router.routes.length === 1) {
        return router
      }

      return new RouterState(Nav.StateUtils.pop(router))
  }

  return router
}
