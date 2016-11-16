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
import { Transitioners } from '../models/Transitioners'

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

    const ActivePage = routerState.getPage(props.scene.route)
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
    const { routerState } = this.props
    const { route } = props.scene || {}
    const { url, pass } = route

    const passedProps = Object.assign({}, props, {
      onNavigateBack
    })
    const CurrentPage = routerState.getPage(route)
    const transitions = new Transitioners(
        route.transitions,
        CurrentPage.transitions)

    const style = transitions.style.call(CurrentPage, passedProps)
    const handlers = transitions.handlers.call(CurrentPage, passedProps)

    return (
      <Navigation.Card
        {...props}
        key={'card_' + props.scene.key}
        style={style}
        panHandlers={handlers}
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
