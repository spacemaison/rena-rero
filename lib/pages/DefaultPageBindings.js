export class DefaultPageBindings {
  constructor (overrides = {}) {
    this.state = overrides.state || this.state
    this.events = overrides.events || this.events
  }

  state () {
    return {}
  }

  events () {
    return {}
  }
}
