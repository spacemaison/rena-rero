import url from 'url'
import { Route } from './Route'
import { DrawerState } from './DrawerState'
import { Page } from '../components/Page'
import { Tabs } from '../containers/Tabs'
import { Accordian } from '../containers/Accordian'

const RESERVED = [ 'previous' ]
const inheritsFrom = (Test, Klass) => {
  try {
    return Object.create(Klass.prototype) instanceof Test
  } catch (e) {
    return false
  }
}

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

    /*
    if (!pageKeys.every(key => inheritsFrom(Page, pages[key]))) {
      throw new TypeError(
          'Expected every page in "pages" to inherit from Page class')
    }
    */

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

  getPage (route = {}) {
    if (typeof route === 'string') {
      route = new Route({ key: route })
    }

    const { pages } = this
    const { url } = route

    if (!url || !url.protocol || url.protocol !== 'page:') {
      throw new Error(`URL protocol is not 'page:' for route: ${url}`)
    }

    if (!pages.hasOwnProperty(url.path) || pages[url.path] == null) {
      throw new Error(`Page at: "${url.path}" does not exist`)
    }

    const PageClass = Object.getPrototypeOf(pages[url.path].prototype)

    if (![ Page, Tabs, Accordian ].some(C => PageClass.constructor !== C)) {
      throw new TypeError(
          `Expected Page at route: ${url.path}. Did your page inherit from ` +
          'the Page component?')
    }

    return pages[url.path]
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
