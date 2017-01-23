import { DefaultPageComponent } from './DefaultPageComponent'
import { DefaultPageBindings } from './DefaultPageBindings'
import { DefaultPageTransitions } from './DefaultPageTransitions'
import { PageStack } from '../stackers/PageStack'

export class Page {
  constructor (overrides = {}) {
    Object.assign(this, new DefaultPageComponent(overrides))
    Object.assign(this, new DefaultPageTransitions(overrides))

    this.bindings = new DefaultPageBindings(overrides.bindings)
    this.stack = overrides.stack || new PageStack()
  }
}
