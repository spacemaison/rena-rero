import url from 'url'
import React, { PropTypes } from 'react'
import { Linking, Text, TouchableHighlight, View } from 'react-native'
import { closeDrawer, popPage, pushPage } from '../actions/router'
import { Route } from '../models/Route'

export class Link extends React.Component {
  static get propTypes () {
    const { any, string, func } = PropTypes
    const { style } = View.propTypes

    return {
      pass: any,
      style,
      to: string.isRequired,
      transition: func
    }
  }

  static get contextTypes () {
    const { any } = PropTypes
    const { style } = View.propTypes

    return {
      linkStyle: style,
      urlLinker: any,
      store: any
    }
  }

  constructor (props = {}, context = {}, renderer) {
    super(props, context, renderer)
    this.onPress = this.onPress.bind(this)
  }

  render () {
    const { context = {}, props = {}, onPress } = this
    const { linkStyle } = context
    const { style, children, to } = props

    return (
      <TouchableHighlight style={linkStyle || style || {}} onPress={onPress}>
        {children || <Text>{to}</Text>}
      </TouchableHighlight>
    )
  }

  onPress () {
    const { store, urlLinker = Linking } = this.context || {}
    const { transition, to, pass = null } = this.props || {}
    const uri = url.parse(to)

    if (store == null) {
      throw new Error(
          'Cannot instantiate link elements outside of a Provider element')
    }

    if (uri.protocol && uri.protocol !== 'page:') {
      urlLinker.openURL(to)
    } else {
      store.dispatch(closeDrawer())

      if (uri.host === 'previous') {
        store.dispatch(popPage())
      } else {
        store.dispatch(pushPage(new Route({ key: to, pass, transition })))
      }
    }
  }
}
