import URL from 'url'
import React, { PropTypes } from 'react'
import { View } from 'react-native'
import { TabLink } from './TabLink'
import { Page } from './Page'
import { styles } from '../styles/tabs'

export class Tabs extends Page {
  static get propTypes () {
    const { arrayOf, any, instanceOf, object, string } = PropTypes

    return {
      CurrentPage: any,
      pass: object,
      tabs: arrayOf(string),
      url: instanceOf(URL.Url)
    }
  }

  static renderToolbar () {
    return null
  }

  static renderTabs (tabs, Component, route) {
    return (
      <View style={styles.tabs}>
        {<Component {...route.pass} url={route.url} />}

        <View style={styles.tabbar}>
          {tabs.map(page => (
            <TabLink key={page} to={page} tabs={tabs} />
          ))}
        </View>
      </View>
    )
  }

  render () {
    const { CurrentPage, pass, tabs, url } = this.props

    return Tabs.renderTabs(tabs, CurrentPage, { pass, url })
  }
}
