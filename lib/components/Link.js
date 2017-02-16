import url from 'url'
import React, { PropTypes } from 'react'
import { Linking, Text, TouchableOpacity, View } from 'react-native'
import { closeDrawer, popPage, pushPage } from '../actions/router'
import { Route } from '../models/Route'

export class Link extends React.Component {
  static get propTypes () {
    const { any, func, instanceOf, string } = PropTypes
    const { style } = View.propTypes

    return {
      pass: any,
      style,
      to: string.isRequired,
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
      <TouchableOpacity style={style || linkStyle} onPress={onPress} ref='th'>
        {children || <Text>{to}</Text>}
      </TouchableOpacity>
    )
  }

  measure (...args) {
    return this.refs.th.measure(...args)
  }

  onPress () {
    const { store, urlLinker = Linking } = this.context || {}
    const { to, pass = null, onPress, renderPage, renderToolbar } =
        this.props || {}
    const uri = url.parse(to, true)

    if (store == null) {
      throw new Error(
          'Cannot instantiate link elements outside of a Provider element')
    }

    if (uri.protocol && uri.protocol !== 'page:') {
      urlLinker.openURL(to)
    } else {
      store.dispatch(closeDrawer())

      const action = uri.path === 'previous'
        ? popPage()
        : pushPage(new Route({
          key: to,
          pass: Object.assign({}, uri.query, pass),
          renderPage,
          renderToolbar
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
