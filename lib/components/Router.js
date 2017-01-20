import React from 'react'
import {
    NavigationExperimental as Navigation,
    StyleSheet,
    View } from 'react-native'
import { Drawer } from './Drawer'
import { popPage } from '../actions/router'
import { DrawerOptions } from '../models/DrawerOptions'
import { RouterState } from '../models/RouterState'
import { deepEquals } from '../util'

export class Router extends React.Component {
  static get propTypes () {
    const { func, instanceOf } = React.PropTypes
    const { style } = View.propTypes

    return {
      drawerProps: instanceOf(DrawerOptions),
      renderDrawerContent: func,
      routerState: instanceOf(RouterState),
      toolbarStyle: style
    }
  }

  static get contextTypes () {
    return {
      store: React.PropTypes.object
    }
  }

  constructor (...args) {
    super(...args)
    this.renderScenes = this.renderScenes.bind(this)
    this.onNavigateBack = this.onNavigateBack.bind(this)

    /*
    this.state = Object.assign({}, this.state, {
      pageStates: this.getPageStates()
    })
    */
  }

  /*
  componentWillMount () {
    const { store } = this.context

    this.unsubscribeFromStore = store.subscribe(() => {
      const pageStates = this.getPageStates()

      if (pageStates.some(({ needsRefresh }) => needsRefresh)) {
        this.setState({ pageStates })
      }
    })
  }

  componentWillUnmount () {
    this.unsubscribeFromStore()
  }

  unsubscribeFromStore () {
    // Overriden in componentWillMount
  }
  */

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
