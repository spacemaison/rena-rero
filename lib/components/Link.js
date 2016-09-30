import React, { PropTypes } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { pushPage } from '../actions/router'

export class Link extends React.Component {
  static get propTypes () {
    return {
      children: PropTypes.element,
      pass: PropTypes.any,
      style: View.propTypes.style,
      to: PropTypes.string.isRequired
    }
  }

  static get contextTypes () {
    return {
      linkStyle: View.propTypes.style,
      store: PropTypes.any
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
    const { store } = this.context || {}
    const { to, pass = null } = this.props || {}

    if (store == null) {
      throw new Error(
          'Cannot instantiate link elements outside of a Provider element')
    }

    store.dispatch(pushPage({ page: to, props: pass }))
  }
}
