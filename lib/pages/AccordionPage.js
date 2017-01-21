import { Page } from './Page'

export class AccordionPage extends Page {
  constructor (...args) {
    super(...args)
    this.preview = args[0] && args[0].preview
  }
}
