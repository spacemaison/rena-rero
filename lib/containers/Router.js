import { connectAdvanced } from 'react-redux'
import { Router as RouterComponent } from '../components/Router'
import { RouterState } from '../models/RouterState'
import { Route } from '../models/Route'
import { deepEquals, hasSameKeys } from '../util'

const connector = connectAdvanced(dispatch => {
  return (state = {}) => {
    const { router } = state
    const routerState = new RouterState(Object.assign({}, router, {
      routes: router.routes.map(route => {
        const page = router.getPage(route)
        const pass = route.pass || {}
        const combined = Object.assign({}, state, { pass })

        const nextProps = page.bindings.state(combined)
        const nextEvents = page.bindings.events(dispatch)

        if (deepEquals(nextProps, route.page.props) &&
            hasSameKeys(nextEvents, route.page.events)) {
          return route
        }

        return new Route(Object.assign({}, route, {
          page: {
            props: nextProps,
            events: nextEvents,
            combined: Object.assign({ pass }, nextProps, nextEvents)
          }
        }))
      })
    }))

    return { routerState }
  }
})

export const Router = connector(RouterComponent)
