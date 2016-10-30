import React from 'react'
import url from 'url'
import {
    NavigationExperimental as Navigation,
    StyleSheet,
    Text,
    TouchableHighlight,
    View } from 'react-native'
import { Page } from  './Page'
import { Drawer } from './Drawer'
import { pushPage, popPage } from '../actions/router'
import { LinkInformation } from '../models/LinkInformation'
import { DrawerOptions } from '../models/DrawerOptions'
import { RouterState } from '../models/RouterState'

export class Router extends React.Component {
  static get propTypes () {
    const { any, object, func, instanceOf, number, string } = React.PropTypes
    const { style } = View.propTypes
    const { color } = StyleSheet.propTypes || {}

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
    this.renderScene = this.renderScene.bind(this)
    this.onNavigateBack = this.onNavigateBack.bind(this)
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
    const { toolbarStyle, routerState } = this.props

    const ActivePage = getPage(routerState.pages, props.scene.route)
    const renderToolbar = ActivePage.renderToolbar || Page.renderToolbar
    const toolbar = renderToolbar.call(ActivePage, Object.assign({}, props, {
      onNavigateBack,
      toolbarStyle
    }))
    const scenes = props.scenes.map(scene => (
      this.renderScene(Object.assign({}, props, { scene }))
    ))

    return (
      <View style={styles.sceneOuterContainer}>
        <View style={styles.sceneInnerContainer}>
          {scenes}
        </View>

        {toolbar}
      </View>
    )
  }

  renderScene (props) {
    const { onNavigateBack } = this
    const { route } = props.scene || {}
    const { url, pass } = route

    const CurrentPage = getPage(this.props.routerState.pages, route)
    const getStyle = CurrentPage.style || Page.style
    const getPanHandlers = CurrentPage.panHandlers || Page.panHandlers

    const style = getStyle.call(CurrentPage, props)
    const panHandlers = getPanHandlers.call(CurrentPage, Object.assign({}, props, {
      onNavigateBack
    }))

    return (
      <Navigation.Card
        {...props}
        key={'card_' + props.scene.key}
        style={style}
        panHandlers={panHandlers}
        renderScene={props => <CurrentPage {...(pass || {})} url={url} /> }
        />
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

function getPage (routes, route) {
  const { url } = route

  if (!url || !url.protocol || url.protocol !== 'page:') {
    throw new Error(`URL protocol is not 'page:' for route: ${url}`)
  }

  if (!routes.hasOwnProperty(url.path)) {
    throw new Error(`Page at: "${url.path}" does not exist`)
  }

  if (Object.getPrototypeOf(routes[url.path].prototype).constructor !== Page) {
    throw new TypeError(
        `Expected Page at route: ${url.path}. Did your page inherit from the ` +
        'Page component?')
  }

  return routes[url.path]
}
