/*globals describe, it*/
import { expect } from 'chai'
import { router } from '../../lib/reducers/router'
import { POP_PAGE, PUSH_PAGE } from '../../lib/actions/actions'

describe('router reducers', () => {
  it('pops a page with a previous stack', () => {
    let previous = {
      stack: [
        { page: 'A' },
        { page: 'B' }
      ]
    }

    const { stack } = router(previous, { type: POP_PAGE })

    expect(stack).to.deep.equal([
      { page: 'A' }
    ])
  })

  it('pops a page with an empty stack', () => {
    const { stack } = router(void 0, { type: POP_PAGE })

    expect(stack).to.have.a.lengthOf(0)
  })

  it('pushes a page with an empty stack', () => {
    const { stack } = router(void 0, {
      type: PUSH_PAGE,
      payload: { page: 'A' }
    })

    expect(stack).to.deep.equal([
      { page: 'A', pass: null }
    ])
  })

  it('pushes a page with a previous stack', () => {
    const previous = {
      stack: [ { page: 'A', pass: null } ]
    }
    const { stack } = router(previous, {
      type: PUSH_PAGE,
      payload: { page: 'B', pass: { foo: 'bar' } }
    })

    expect(stack).to.deep.equal([
      { page: 'A', pass: null },
      { page: 'B', pass: { foo: 'bar' } }
    ])
  })
})
