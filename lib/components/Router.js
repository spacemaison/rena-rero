import React, { PropTypes } from 'react'
import {
    NavigationExperimental as Navigation,
    StyleSheet,
    View } from 'react-native'
import { Drawer } from './Drawer'
import { popPage } from '../actions/router'
import { DrawerOptions } from '../models/DrawerOptions'
import { RouterState } from '../models/RouterState'
import { Styles } from '../models/Styles'

export class Router extends React.Component {
  static get propTypes () {
    const { func, instanceOf } = React.PropTypes
    const { style } = View.propTypes

    return {
      drawerProps: instanceOf(DrawerOptions),
      renderDrawerContent: func,
      routerState: instanceOf(RouterState),
      toolbarStyle: style,
      styles: instanceOf(Styles)
    }
  }

  static get contextTypes () {
    const { object } = PropTypes

    return {
      store: object
    }
  }

  static get childContextTypes () {
    const { instanceOf } = PropTypes

    return {
      styles: instanceOf(Styles)
    }
  }

  static get defaultProps () {
    return {
      styles: new Styles()
    }
  }

  constructor (...args) {
    super(...args)
    this.renderScenes = this.renderScenes.bind(this)
    this.onNavigateBack = this.onNavigateBack.bind(this)
  }

  getChildContext () {
    return {
      styles: this.props.styles || {}
    }
  }

  render () {
    const { props } = this
    const navigator = (
      <Navigation.Transitioner
        navigationState={this.props.routerState}
        render={this.renderScenes}
        />
    )
    let drawerProps

    if (typeof props.renderDrawerContent === 'function') {
      drawerProps = Object.assign({}, props.drawerProps || {}, {
        renderContent: props.renderDrawerContent
      })
    } else if (props.drawerProps) {
      drawerProps = props.drawerProps
    }

    if (drawerProps) {
      drawerProps = Object.assign({}, new DrawerOptions(drawerProps))

      return (
        <Drawer {...drawerProps}>{navigator}</Drawer>
      )
    } else {
      return navigator
    }
  }

  renderScenes (props) {
    const { onNavigateBack } = this
    const { store } = this.context
    const { routerState } = this.props
    const { route } = props.scene

    props = Object.assign({}, props, { onNavigateBack })

    const activePage = routerState.getPage(route)
    const toolbar = activePage.stack.toolbar(store, props)
    const scenes = activePage.stack.scenes(store, props)

    return (
      <View style={styles.sceneOuterContainer}>
        {toolbar}

        <View style={styles.sceneInnerContainer}>
          {scenes}
        </View>
      </View>
    )
  }

  onNavigateBack () {
    const { store } = this.context || {}

    if (store) {
      store.dispatch(popPage())
    }
  }
}

const styles = StyleSheet.create({
  sceneOuterContainer: {
    flex: 1
  },

  sceneInnerContainer: {
    flex: 1
  },

  overlayBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})
