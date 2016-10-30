import React from 'react'
import { NavigationExperimental } from 'react-native'

const Navigation = NavigationExperimental || { Card: {}, Header }
const { Header } = Navigation
const {
    CardStackPanResponder,
    CardStackStyleInterpolator } = Navigation.Card

export class Page extends React.Component {
  static get title () {
    return ''
  }

  static panHandlers (props) {
    return CardStackPanResponder.forHorizontal(props)
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

  static style (props) {
    return CardStackStyleInterpolator.forHorizontal(props)
  }
}
