import { connectAdvanced } from 'react-redux'
import { Router as RouterComponent } from '../components/Router'
import { RouterState } from '../models/RouterState'
import { Route } from '../models/Route'
import { deepEquals, hasSameKeys } from '../util'

let returned

const connector = connectAdvanced(dispatch => {
  return (state = {}) => {
    const router = state.router
    const previousRoutes = returned && returned.router && returned.router.routes
    const nextRouter = new RouterState(Object.assign({}, router, {
      routes: router.routes.map((route, i) => {
        const page = router.getPage(route)
        const pass = route.pass || {}
        const previousRoute = previousRoutes && previousRoutes[i]

        const nextProps = page.bindings.state(state, pass)
        const nextEvents = page.bindings.events(dispatch)

        if (previousRoute &&
            deepEquals(nextProps, previousRoute.page.props) &&
            hasSameKeys(nextEvents, previousRoute.page.events)) {
          return previousRoute
        }

        return new Route(Object.assign({}, route, {
          page: {
            props: nextProps,
            events: nextEvents,
            combined: Object.assign({}, nextProps, nextEvents)
          }
        }))
      })
    }))

    if (previousRoutes &&
        previousRoutes.length === nextRouter.routes.length &&
        nextRouter.routes.every(isSameAs(previousRoutes))) {
      return returned
    } else {
      returned = { router: nextRouter }
      return returned
    }
  }
})

const isSameAs = routes => (route, i) => route === routes[i]
export const Router = connector(RouterComponent)
