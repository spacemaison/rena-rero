/* globals describe, it */
import { expect } from 'chai'
import { Page } from '../../lib/components/Page'

describe('<Page />', () => {
  it('has an empty default title', () => {
    expect(Page.title).to.equal('')
  })

  it('renders a blank right component', () => {
    expect(Page.renderRightComponent()).to.equal(null)
  })

  // Not testable yet
  it.skip('renders a default toolbar using the page title', () => {
  })

  it.skip('returns default pan handlers', () => {
  })

  it.skip('returns a default style', () => {

  })
})
