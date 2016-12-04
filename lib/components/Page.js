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
    return null
  }

  static renderRightComponent () {
    return null
  }

  static renderToolbar (props) {
    const titleComponent = () => <Header.Title>{this.title}</Header.Title>

    return (
      <Header
        {...props}
        style={props.toolbarStyle}
        renderTitleComponent={titleComponent}
        renderRightComponent={this.renderRightComponent.bind(this)}
        />
    )
  }
}
