import URL from 'url'

export class Route {
  constructor ({ key, url, pass = null, transition = () => {} } = {}) {
    this.pass = pass
    this.transition = transition

    if (typeof key === 'string' && key) {
      this.url = URL.parse(key, true)
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
