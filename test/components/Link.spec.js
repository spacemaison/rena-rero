/*globals describe, it*/
import { expect } from 'chai'
import { stub } from 'sinon'
import { Link } from '../../lib/components/Link'

describe('<Link />', () => {
  it('responds to onPress events by dispatching push page actions', () => {
    let store = { dispatch: stub() }
    let pass = { some: 'props' }
    let link = new Link({ to: 'foo', pass }, { store })

    link.onPress()

    expect(store.dispatch).to.have.been.calledWithExactly({
      type: 'RENA_RERO_PUSH_PAGE',
      payload: {
        page: 'foo',
        props: pass
      }
    })
  })

  it('responds to onPress events, but throws because we don\'t have a store', () => {
    let link = new Link({ to: 'foo' })

    expect(link.onPress.bind(link)).to.throw(
        Error, /Cannot instantiate link elements outside of a Provider element/)
  })
})
