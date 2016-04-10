import React, { Navigator, Text, TouchableHighlight, View } from 'react-native'
import { popPage } from '../actions/router'
import { LinkInformation } from '../models/LinkInformation'

export class Router extends React.Component {
  static get propTypes () {
    const { object, func, number, string } = React.PropType
    const { color, style } = View.propTypes

    return {
      routes: object,
      initialRoute: string.isRequired,
      store: object,
      sceneStyle: style,
      toolbarStyle: style,
      titleStyle: style,
      renderBackButton: func,
      backButtonUnderlayColor: color,
      backButtonStyle: style,
      backButtonActiveOpacity: number
    }
  }

  constructor (props = {}, context = {}, renderer) {
    super(props, context, renderer)
    this.renderScene = this.renderScene.bind(this)
    this.unsubscribeToStore = () => {}
    this._navigator = null
    this._currentPage = null
  }

  componentDidMount () {
    let { store } = this.props
    let { router: { stack: lastStack } } = store.getState()

    if (!lastStack) {
      lastStack = [
        { page: this.props.initialRoute }
      ]
    }

    this.unsubscribeToStore = store.subscribe(() => {
      let { router: { stack = [] } } = store.getState()
      let lastLength = lastStack.length

      if (!this._navigator) {
        lastStack = stack
        return
      }

      if (stack.length > lastLength) {
        for (let newPage of stack.slice(-(stack.length - lastLength))) {
          this._navigator.push(new LinkInformation(newPage))
        }
      } else if (stack.length < lastLength) {
        let difference = lastLength - stack.length
        while (difference > 0) {
          this._navigator.pop()
          difference -= 1
        }
      }
      lastStack = stack
    })
  }

  componentWillUnmount () {
    this.unsubscribeToStore()
  }

  render () {
    const { props = {} } = this
    const { initialRoute, routes = {}, store } = this.props
    const routeMapper = new RouteMapper(routes, store, props,
        () => this._currentPage)

    return (
      <Navigator
          ref={navigator => this._navigator = navigator}
          initialRoute={{ page: initialRoute }}
          sceneStyle={props.sceneStyle}
          renderScene={this.renderScene}
          navigationBar={
            <Navigator.NavigationBar
                style={props.toolbarStyle}
                routeMapper={routeMapper} />
          }/>
    )
  }

  renderScene (route, navigator) {
    const { routes = {} } = this.props
    const Page = routes[route.page]
    return Page
        ? <Page ref={page => this._currentPage = page} />
        : <View />
  }
}

class RouteMapper {
  constructor (routes, store, props, getCurrentPage) {
    this.routes = routes
    this.store = store
    this.props = props
    this.getCurrentPage = getCurrentPage
  }

  LeftButton (route, navigator, index, navState) {
    if (index === 0 || typeof this.getBackButton !== 'function') {
      return <View style={{ width: 0, height: 0 }} />
    } else {
      const { props, store } = this
      const backButton = this.getBackButton()
      const onPress = () => store.dispatch(popPage())
      let touchableProps = {}

      if (props.backButtonActiveOpacity) {
        touchableProps.activeOpacity = props.backButtonActiveOpacity
      }
      if (props.backButtonStyle) {
        touchableProps.style = props.backButtonStyle
      }
      if (props.backButtonUnderlayColor) {
        touchableProps.underlayColor = props.backButtonUnderlayColor
      }

      return (
        <TouchableHighlight {...touchableProps} onPress={onPress}>
          {backButton}
        </TouchableHighlight>
      )
    }
  }

  RightButton (route, navigator, index, navState) {
    const Page = this.routes[route.page] || {}

    if (typeof Page.renderToolbarActions === 'function') {
      return Page.renderToolbarActions()
    }

    return <View />
  }

  Title (route, navigator, index, navState) {
    const title = this.routes[route.page].title || ''

    return <Text style={this.props.titleStyle}>{title}</Text>
  }
}
