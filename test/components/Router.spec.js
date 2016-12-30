/* globals describe, it */
import { expect } from 'chai'
import { stub } from 'sinon'
import { Router } from '../../lib/components/Router'

describe('<Router />', () => {
  it('navigates back', () => {
    const store = {
      dispatch: stub()
    }

    const router = new Router({}, { store })

    router.onNavigateBack()

    expect(store.dispatch).to.have.been.calledWithExactly({
      type: 'RENA_RERO_POP_PAGE',
      payload: undefined
    })
  })
})
