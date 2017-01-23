import { Page } from './Page'
import { Accordion as AccordionStack } from '../stackers/Accordion'

export class Accordion extends Page {
  constructor (...args) {
    super(...args)
    this.stack = new AccordionStack(...args)
  }
}
