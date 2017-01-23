import React from 'react'
import { styles } from '../styles/button'
import { Text, View } from 'react-native'

export class Button extends React.Component {
  static get propTypes () {
    return View.propTypes
  }

  static get defaultProps () {
    return View.defaultProps
  }

  render () {
    const { props } = this

    return (
      <View {...props} style={[ styles.button, props.style ]}>
        {typeof props.children === 'string'
          ? <Text style={styles.buttonText}>{props.children}</Text>
          : props.children
        }
      </View>
    )
  }
}
