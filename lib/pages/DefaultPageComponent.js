import React from 'react'
import { NavigationExperimental as Navigation } from 'react-native'
import { IconBar } from '../components/IconBar'

const { Header } = Navigation

export class DefaultPageComponent {
  constructor (overrides = {}) {
    this.content = overrides.content || this.content
    this.toolbar = overrides.toolbar || this.toolbar
    this.toolbarLeft = overrides.toolbarLeft || this.toolbarLeft
    this.toolbarRight = overrides.toolbarRight || this.toolbarRight
    this.toolbarTitle = overrides.toolbarTitle || this.toolbarTitle
    this.title = overrides.title || this.title
    this.iconsLeft =
        Array.isArray(overrides.iconsLeft) ? overrides.iconsLeft
      : overrides.iconLeft ? [ overrides.iconLeft ]
      : null
    this.iconsRight =
        Array.isArray(overrides.iconsRight) ? overrides.iconsRight
      : overrides.iconRight ? [ overrides.iconRight ]
      : null
  }

  content () {
    return null
  }

  toolbar (storeProps, passedProps, routerProps) {
    return (
      <Header
        {...routerProps}
        renderTitleComponent={
            this.toolbarTitle.bind(this, storeProps, passedProps)}
        renderRightComponent={
            this.toolbarRight.bind(this, storeProps, passedProps)}
        />
    )
  }

  toolbarLeft (_, { style } = {}) {
    const icons = (this.iconsLeft || []).map(icon =>
      typeof icon === 'function' ? icon.bind(this, ...arguments) : icon
    )
    return <IconBar style={style} icons={icons} />
  }

  toolbarRight (_, { style } = {}) {
    const icons = (this.iconsRight || []).map(icon =>
      typeof icon === 'function' ? icon.bind(this, ...arguments) : icon
    )
    return <IconBar style={style} icons={icons} />
  }

  toolbarTitle () {
    const title =
        typeof this.title === 'function' ? this.title(...arguments)
      : typeof this.title === 'string' ? this.title
      : ''

    return <Header.Title>{title}</Header.Title>
  }
}
