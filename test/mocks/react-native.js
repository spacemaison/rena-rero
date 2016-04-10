import React from 'react'

export const ActivityIndicatorIOS = createComponent('ActivityIndicatorIOS')
export const View = createComponent('View')
export const Text = createComponent('Text')
export const Image = createComponent('Image')
export const TouchableHighlight = createComponent('TouchableHighlight')
export const ScrollView = createComponent('ScrollView')
export const StyleSheet = { create: style => style }
export const PropTypes = React.PropTypes
export const LayoutAnimation = {
  spring: () => {}
}

export default {
  __proto__: React,

  ActivityIndicatorIOS,
  LayoutAnimation,
  Image,
  PropTypes,
  ScrollView,
  Text,
  TouchableHighlight,
  View
}

function createComponent (type) {
  return React.createClass({
    displayName: type,
    propTypes: {
      children: React.PropTypes.node
    },
    render () {
      return <div {...this.props}>{this.props.children}</div>
    }
  })
}
