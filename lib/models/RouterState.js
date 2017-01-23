import { Route } from './Route'
import { DrawerState } from './DrawerState'

const RESERVED = [ 'previous' ]

export class RouterState {
  constructor ({ routes = [], index = 0, pages, drawer, initialPage } = {}) {
    drawer = drawer || new DrawerState()
    initialPage = Route.normalizePageName(initialPage)

    if (!Array.isArray(routes)) {
      throw new TypeError('Expected routes to be an array')
    }

    if (!pages || Object.keys(pages).length === 0) {
      throw new TypeError(
        'Expected pages object to be passed to RouterState with key names ' +
        'that correspond to Routes passed into the pushPage action.')
    }

    pages = Object.keys(pages).reduce((obj, name) => {
      obj[Route.normalizePageName(name)] = pages[name]
      return obj
    }, {})

    if (!routes.every(route => route instanceof Route)) {
      throw new TypeError('Expected router state to contain only routes')
    }

    if (!Number.isInteger(index)) {
      throw new TypeError('Expected index to be an integer')
    }

    if (routes.length === 0) {
      if (typeof initialPage === 'string') {
        initialPage = new Route({ key: initialPage })
      }

      if (!(initialPage instanceof Route)) {
        throw new TypeError(
            'Expected Route or a string pointing to a Route to be passed as ' +
            'the initial page')
      }

      if (!pages[initialPage.key]) {
        throw new TypeError('Expected pages to contain initial page')
      }

      let reserved
      if (RESERVED.some(res => (reserved = res && res in pages))) {
        throw new TypeError(`Reserved page name used: "${reserved}"`)
      }

      routes.push(initialPage)
      index = 0
    }

    if (index < 0 || !routes[index]) {
      throw new Error('RouterState must have an active route')
    }

    Object.assign(this, {
      routes,
      drawer,
      index,
      pages
    })
  }

  getPage (route = {}) {
    if (typeof route === 'string') {
      route = new Route({ key: route })
    }

    const { pages } = this
    const { url } = route

    if (!url || !url.protocol || url.protocol !== 'page:') {
      throw new Error(`URL protocol is not 'page:' for route: ${url}`)
    }

    const page = pages[`page:${url.host}`]
    if (page == null) {
      throw new Error(`Page at: "${url.host}" does not exist`)
    }

    return page
  }

  getCurrentPage (route = this.getCurrentRoute()) {
    return this.getPage(route)
  }

  getRoute (index) {
    return this.routes[index]
  }

  getCurrentRoute () {
    return this.routes[this.index]
  }
}
