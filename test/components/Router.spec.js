/*globals describe, it*/
import { expect } from 'chai'
import { stub } from 'sinon'
import { Router } from '../../lib/components/Router'

describe('<Router />', () => {
  it('responds to store router events by pushing/poping pages', () => {
    let store = {
      subscribe: stub(),
      getState: stub().returns({ router: { stack: [] } })
    }
    let router = new Router({ store })

    router._navigator = { push: stub(), pop: stub() }
    router.componentDidMount()

    store.getState.returns({ router: { stack: [ { page: 'A' } ] } })
    store.subscribe.lastCall.args[0]()

    expect(router._navigator.pop.called).to.be.false
    expect(router._navigator.push.callCount).to.equal(1)
    expect(router._navigator.push).calledWithExactly({
      page: 'A',
      pass: null
    })

    store.getState.returns({ router: { stack: [] } })
    store.subscribe.lastCall.args[0]()

    expect(router._navigator.pop.callCount).to.equal(1)
  })
})
