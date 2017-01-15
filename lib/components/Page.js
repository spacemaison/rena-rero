import React from 'react'
import { NavigationExperimental } from 'react-native'
import { Transitioners } from '../models/Transitioners'

const Navigation = NavigationExperimental || { Header: {} }
const { Header } = Navigation

export class Page extends React.Component {
  static get title () {
    return ''
  }

  static get transitions () {
    return new Transitioners()
  }

  static renderToolbar (props) {
    const title =
        typeof this.title === 'string' ? this.title
      : typeof this.title === 'function' ? this.title(props)
      : ''
    const titleComponent = () =>
        typeof title === 'string' ? <Header.Title>{title}</Header.Title>
      : typeof title === 'function' ? title
      : null

    const renderRightComponent =
        this.renderToolbarRightComponent || (() => null)

    const wrapWithPassed = cb => p => {
      const passed = Object.assign({}, p, {
        pass: props.pass || {},
        dispatch: props.dispatch,
        state: props.store.getState()
      })
      return cb.call(this, passed)
    }
    return (
      <Header
        {...props}
        style={props.toolbarStyle}
        renderTitleComponent={titleComponent}
        renderRightComponent={wrapWithPassed(renderRightComponent)}
        />
    )
  }

  static renderToolbarLeftComponent () {
    return null
  }

  static renderToolbarRightComponent () {
    return null
  }
}
