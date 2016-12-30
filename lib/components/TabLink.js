import React, { PropTypes } from 'react'
import { Link } from './Link'
import { Tabs } from './Tabs'
import { Transitioners } from '../models/Transitioners'
import { styles } from '../styles/tab-link'

const noop = () => {}
const noTransition = new Transitioners({ style: noop, handlers: noop })

export class TabLink extends React.Component {
  static get propTypes () {
    const { arrayOf, string } = PropTypes

    return Object.assign({}, Link.propTypes, {
      tabs: arrayOf(string)
    })
  }

  render () {
    const { pass, to, tabs } = this.props
    const props = {
      pass,
      to,
      transitions: noTransition,
      renderPage: Tabs.renderTabs.bind(null, tabs),
      renderToolbar: () => null
    }

    return (
      <Link {...props} style={styles.tabLink} />
    )
  }
}
