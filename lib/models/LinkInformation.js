import url from 'url'

export class LinkInformation {
  constructor ({ page = '', pass = null } = {}) {
    page = url.parse(page)

    if (!page.protocol) {
      page.protocol = 'page:'
    }

    this.page = page
    this.pass = pass
  }
}
