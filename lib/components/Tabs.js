import URL from 'url'
import React, { PropTypes } from 'react'
import { View } from 'react-native'
import { Link } from './Link'
import { Page } from './Page'

const noTransition = () => ({})

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

  render () {
    const { CurrentPage, pass = {}, url, tabs = [] } = this.props

    return (
      <View>
        {<CurrentPage {...(pass || {})} url={url} />}

        <View>
          {tabs.map(page => (
            <View key={page}>
              <Link to={page} transition={noTransition} />
            </View>
          ))}
        </View>
      </View>
    )
  }
}
