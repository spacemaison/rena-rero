import { Page } from './Page'
// import { TabLink } from '../components/TabLink'

export class Tabbar extends Page {
  constructor ({ pages = [] } = {}) {
    super(...arguments)
    this.pages = pages
  }

  toolbars () {
    return null
  }

  scenes () {

  }
}
