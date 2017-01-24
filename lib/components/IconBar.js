import React, { PropTypes } from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import { Icon } from './Icon'
import { Styles } from '../models/Styles'
import { styles } from '../styles/icon-bar'

export class IconBar extends React.Component {
  static get propTypes () {
    const { arrayOf, func, number, oneOfType, string, object } = PropTypes
    const { style } = Animated.View.propTypes

    return {
      activeOpacity: number,
      icons: arrayOf(oneOfType([ string, object, func ])),
      style
    }
  }

  static get defaultProps () {
    return {
      icons: []
    }
  }

  static get contextTypes () {
    return {
      styles: PropTypes.instanceOf(Styles)
    }
  }

  render () {
    const { context, props } = this
    const activeOpacity =
        props.activeOpacity || context.styles.icon.activeOpacity

    return (
      <Animated.View style={[ styles.iconBar, this.props.style ]}>
        <TouchableOpacity activeOpacity={activeOpacity}>
          {(this.props.icons || [])
            .map((icon) =>
                typeof icon === 'string' ? { name: icon }
              : typeof icon === 'function' ? icon()
              : icon
            )
            .map((icon, i) => {
              const style = [ styles.icon, icon.style ]
              return <Icon {...icon} key={i} style={style} />
            })
          }
        </TouchableOpacity>
      </Animated.View>
    )
  }
}
