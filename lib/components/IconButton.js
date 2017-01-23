import React from 'react'
import { Styles } from '../models/Styles'
import VectorIcon from 'react-native-vector-icons/FontAwesome'

export class IconButton extends React.Component {
  static get contextTypes () {
    return {
      styles: React.PropTypes.instanceOf(Styles)
    }
  }

  render () {
    const { styles = {} } = this.context
    const { icon } = styles
    const { props } = this
    // FIXME: react-native-vector-icons doesn't resolve icons dynamically.
    // const Icon = require('react-native-vector-icons/' + icon.font)

    return (
      <VectorIcon.Button size={icon.size} color={icon.color} {...props}>
        {props.children}
      </VectorIcon.Button>
    )
  }
}
