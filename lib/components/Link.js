import url from 'url'
import React, { PropTypes } from 'react'
import { Linking, Text, TouchableHighlight, View } from 'react-native'
import { closeDrawer, popPage, pushPage } from '../actions/router'
import { Route } from '../models/Route'
import { Transitioners } from '../models/Transitioners'

export class Link extends React.Component {
  static get propTypes () {
    const { arrayOf, any, func, instanceOf, oneOf, string } = PropTypes
    const { style } = View.propTypes

    return {
      pass: any,
      style,
      to: string.isRequired,
      transitions: instanceOf(Transitioners),
      onPress: func,
      renderPage: func,
      renderToolbar: func
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
    const { linkStyle = {} } = context
    const { style, children, to } = props

    return (
      <TouchableHighlight style={style || linkStyle} onPress={onPress} ref='th'>
        {children || <Text>{to}</Text>}
      </TouchableHighlight>
    )
  }

  measure (...args) {
    return this.refs.th.measure(...args)
  }

  onPress () {
    const { store, urlLinker = Linking } = this.context || {}
    const { transitions, to, pass = null, onPress, renderPage, renderToolbar } =
        this.props || {}
    const uri = url.parse(to)

    if (store == null) {
      throw new Error(
          'Cannot instantiate link elements outside of a Provider element')
    }

    if (uri.protocol && uri.protocol !== 'page:') {
      urlLinker.openURL(to)
    } else {
      store.dispatch(closeDrawer())

      const action = uri.path === 'previous' ?
        popPage() :
        pushPage(new Route({
          key: to,
          pass,
          renderPage,
          renderToolbar,
          transitions
        }))

      const dispatch = store.dispatch.bind(store, action)

      if (typeof onPress === 'function') {
        onPress.call(this, dispatch)
      } else {
        dispatch()
      }
    }
  }
}
