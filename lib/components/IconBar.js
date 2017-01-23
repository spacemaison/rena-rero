import React, { PropTypes } from 'react'
import { Animated } from 'react-native'
import { Icon } from './Icon'
import { styles } from '../styles/icon-bar'

export class IconBar extends React.Component {
  static get propTypes () {
    const { arrayOf, oneOfType, string, object } = PropTypes
    const { style } = Animated.View.propTypes

    return {
      icons: arrayOf(oneOfType([ string, object ])),
      style
    }
  }

  static get defaultProps () {
    return {
      icons: []
    }
  }

  render () {
    return (
      <Animated.View style={[ styles.iconBar, this.props.style ]}>
        {(this.props.icons || [])
          .map((icon) => typeof icon === 'string' ? { name: icon } : icon)
          .map((icon, i) => {
            const style = [ styles.icon, icon.style ]
            return <Icon {...icon} key={i} style={style} />
          })
        }
      </Animated.View>
    )
  }
}
