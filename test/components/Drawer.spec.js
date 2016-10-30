/*globals describe, it*/
import { expect } from 'chai'
import { stub } from 'sinon'
import { Drawer } from '../../lib/components/Drawer'

describe('<Drawer />', () => {
  it('updates imperative state based on store', () => {
    let state = { router: { drawer: { isOpen: false } } }
    let imperativeDrawer = {
      openDrawer: stub(),
      closeDrawer: stub()
    }
    let store = {
      subscribe: cb => (storeChanged = cb),
      getState: () => state
    }

    let drawer = new Drawer({}, { store })
    let storeChanged

    drawer.refs = { imperativeDrawer }
    drawer._subscribeToStore()

    expect(imperativeDrawer.openDrawer.callCount).to.equal(0)
    expect(imperativeDrawer.closeDrawer.callCount).to.equal(0)

    state.router.drawer.isOpen = true
    storeChanged()

    expect(imperativeDrawer.openDrawer.callCount).to.equal(1)
    expect(imperativeDrawer.closeDrawer.callCount).to.equal(0)

    state.router.drawer.isOpen = false
    storeChanged()

    expect(imperativeDrawer.openDrawer.callCount).to.equal(1)
    expect(imperativeDrawer.closeDrawer.callCount).to.equal(1)
  })
})
