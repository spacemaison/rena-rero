import url from 'url'
import { Route } from './Route'
import { DrawerState } from './DrawerState'

const RESERVED = [ 'previous' ]

export class RouterState {
  constructor ({ routes = [], index = 0, pages, drawer, initialPage } = {}) {
    drawer = drawer || new DrawerState()

    if (!Array.isArray(routes)) {
      throw new TypeError('Expected routes to be an array')
    }

    if (!pages || Object.keys(pages).length === 0) {
      throw new TypeError(
          'Expected pages object to be passed to RouterState with key names ' +
          'that correspond to Routes passed into the pushPage action.')
    }

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

      if (!pages[initialPage.url.path]) {
        throw new TypeError('Expected pages to contain initial page')
      }

      if (RESERVED.some(reserved => reserved in pages)) {
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
}
