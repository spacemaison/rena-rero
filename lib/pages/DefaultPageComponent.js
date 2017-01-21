import React from 'react'
import { NavigationExperimental as Navigation } from 'react-native'

const { Header } = Navigation

export class DefaultPageComponent {
  constructor (overrides = {}) {
    this.content = overrides.content || this.content
    this.toolbar = overrides.toolbar || this.toolbar
    this.toolbarLeft = overrides.toolbarLeft || this.toolbarLeft
    this.toolbarRight = overrides.toolbarRight || this.toolbarRight
    this.toolbarTitle = overrides.toolbarTitle || this.toolbarTitle
    this.title = overrides.title || this.title
  }

  content () {
    return null
  }

  toolbar (storeProps, routerProps) {
    return (
      <Header
        {...routerProps}
        renderTitleComponent={this.toolbarTitle.bind(this, storeProps)}
        renderRightComponent={this.toolbarRight.bind(this, storeProps)}
        />
    )
  }

  toolbarLeft () {
    return null
  }

  toolbarRight () {
    return null
  }

  toolbarTitle () {
    const title =
        typeof this.title === 'function' ? this.title(...arguments)
      : typeof this.title === 'string' ? this.title
      : ''

    return <Header.Title>{title}</Header.Title>
  }
}
