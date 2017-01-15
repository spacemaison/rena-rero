import URL from 'url'
import { Transitioners } from './Transitioners'

export class Route {
  static normalizePageName (name = '') {
    let lowerCaseName = name.toLowerCase()

    if (!/^page:\/?\/?/.test(lowerCaseName)) {
      lowerCaseName = 'page:' + lowerCaseName
    }

    return lowerCaseName
  }

  constructor ({
      key,
      url,
      pass = null,
      transitions = new Transitioners(),
      renderPage,
      renderToolbar } = {}) {
    Object.assign(this, { pass, renderPage, renderToolbar, transitions })

    if (typeof key === 'string' && key) {
      this.url = URL.parse(Route.normalizePageName(key), true)
    } else if (url instanceof URL.Url) {
      this.url = URL.parse(URL.format(url))
    } else {
      throw new TypeError('Route expected to have either a key string or a url')
    }

    this.url.protocol = this.url.protocol || 'page:'
  }

  get key () {
    return URL.format(this.url)
  }
}
