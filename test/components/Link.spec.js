/*globals describe, it*/
import { expect } from 'chai'
import { stub } from 'sinon'
import { Link } from '../../lib/components/Link'

describe('<Link />', () => {
  it('responds to onPress events without a url by dispatching push page actions', () => {
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

  it('responds to onPress events with a url by using its urlLinker', () => {
    let urlLinker = { openURL: stub() }
    let store = {}
    let url = 'http://google.com'
    let link = new Link({ to: url }, { urlLinker, store })

    link.onPress()

    expect(urlLinker.openURL).to.have.been.calledWithExactly(url)
  })

  it('responds to onPress events, but throws because we don\'t have a store', () => {
    let link = new Link({ to: 'foo' })

    expect(link.onPress.bind(link)).to.throw(
        Error, /Cannot instantiate link elements outside of a Provider element/)
  })
})
