/*globals describe, it*/
import { expect } from 'chai'
import { router } from '../../lib/reducers/router'
import { Page } from '../../lib/components/Page'
import { Route } from '../../lib/models/Route'
import { RouterState } from '../../lib/models/RouterState'
import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  POP_PAGE,
  PUSH_PAGE } from '../../lib/actions/actions'

describe('router reducers', () => {
  it('opens the drawer', () => {
    const previous = new RouterState({ pages: { Page }, initialPage: 'Page' })
    const routerState = router(previous)(previous, { type: OPEN_DRAWER })

    expect(routerState.drawer).to.deep.equal({
      isOpen: true
    })
  })

  it('closes the drawer', () => {
    const previous = new RouterState({ pages: { Page }, initialPage: 'Page' })
    const routerState = router(previous)(previous, { type: CLOSE_DRAWER })

    expect(routerState.drawer).to.deep.equal({
      isOpen: false
    })
  })

  // Not testable, RN doesn't export StateUtils helpers to Node
  it.skip('pops a page with a previous stack', () => {
    const routes = [
      new Route({ key: 'A' }),
      new Route({ key: 'B' })
    ]
    const previous = new RouterState({ index: 1, routes })
    const state = router()(previous, { type: POP_PAGE })

    expect(state.routes).to.deep.equal([
      { key: 'A' }
    ])
  })

  // Not testable, RN doesn't export StateUtils helpers to Node
  it.skip('pops a page with an empty stack', () => {
    const { stack } = router(void 0, { type: POP_PAGE })

    expect(stack).to.have.a.lengthOf(0)
  })

  // Not testable, RN doesn't export StateUtils helpers to Node
  it.skip('pushes a page with an empty stack', () => {
    const { stack } = router(void 0, {
      type: PUSH_PAGE,
      payload: { page: 'A' }
    })

    expect(stack).to.deep.equal([
      new LinkInformation({ page: 'A', pass: null })
    ])
  })

  // Not testable, RN doesn't export StateUtils helpers to Node
  it.skip('pushes a page with a previous stack', () => {
    const previous = {
      stack: [ new LinkInformation({ page: 'A', pass: null }) ]
    }
    const { stack } = router(previous, {
      type: PUSH_PAGE,
      payload: { page: 'B', pass: { foo: 'bar' } }
    })

    expect(stack).to.deep.equal([
      new LinkInformation({ page: 'A', pass: null }),
      new LinkInformation({ page: 'B', pass: { foo: 'bar' } })
    ])
  })
})
