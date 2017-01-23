import React from 'react'
import { NavigationExperimental as Navigation } from 'react-native'

export class PageStack {
  toolbar (store, routerProps) {
    const { navigationState } = routerProps
    const { scene } = routerProps
    const { route } = scene

    const page = navigationState.getPage(route)

    return page.toolbar(route.page.props || {}, route.pass || {}, routerProps)
  }

  /**
  Maps an array of pages to Navigation.Card using the default panHandlers and
  styles.
  */
  scenes (store, props) {
    const { navigationState } = props
    const allPages = props.scenes.map(scene => (
      navigationState.getPage(scene.route)
    ))

    return allPages.map((page, i) => {
      return this.scene(store, props, props.scenes[i], page)
    })
  }

  /**
  Returns a Navigation.Card component from the given page using the default
  panHandlers and styles. The default panHandlers and styles are the left/right
  transitions provided by React Native.
  */
  scene (store, routerProps, routeState, page) {
    const { route } = routeState
    const { page: { state } } = route
    const scene = page.content(state || {}, route.pass || {}, routerProps)
    const handlers = page.handlers(routerProps)
    const style = page.style(routerProps)

    return (
      <Navigation.Card
        {...routerProps}
        key={routeState.key}
        style={style}
        panHandlers={handlers}
        renderScene={() => scene}
        />
    )
  }
}
