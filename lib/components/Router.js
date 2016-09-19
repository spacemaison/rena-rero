import React, {
    Navigator,
    StyleSheet,
    Text,
    TouchableHighlight,
    View } from 'react-native'
import DrawerLayout from 'react-native-drawer-layout'
import { pushPage, popPage } from '../actions/router'
import { LinkInformation } from '../models/LinkInformation'

export class Router extends React.Component {
  static get propTypes () {
    const { any, object, func, number, string } = React.PropTypes
    const { style } = View.propTypes
    const { color } = StyleSheet.propTypes || {}

    return {
      drawerWidth: number,
      drawerPosition: any, // FIXME
      routes: object,
      initialRoute: string.isRequired,
      store: object,
      sceneStyle: style,
      toolbarStyle: style,
      titleStyle: style,
      renderBackButton: func,
      renderDrawerContent: func,
      backButtonUnderlayColor: any, // FIXME
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
    let { store, initialRoute } = this.props
    let { router: { stack: lastStack } } = store.getState()

    if (!lastStack) {
      let linkInfo = new LinkInformation({ page: initialRoute })

      store.dispatch(pushPage(linkInfo))
      lastStack = [ linkInfo ]
    }

    this.unsubscribeToStore = store.subscribe(() => {
      let { router: { stack = [] } } = store.getState()
      let lastLength = lastStack.length

      if (!this._navigator) {
        lastStack = stack
        return
      }

      if (stack.length > lastLength) {
        stack.slice(-(stack.length - lastLength)).forEach(newPage => {
          this._navigator.push(new LinkInformation(newPage))
        })
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
    const routeMapper = new RouteMapper(routes, store, props, () => {
      return this._currentPage
    })
    const navigator = (
      <Navigator
          ref={navigator => this._navigator = navigator}
          initialRoute={{ page: initialRoute }}
          sceneStyle={[ styles.page, props.sceneStyle ]}
          renderScene={this.renderScene}
          navigationBar={
            <Navigator.NavigationBar
                style={[ styles.toolbar, props.toolbarStyle ]}
                routeMapper={routeMapper} />
          }/>
    )

    if (typeof props.renderDrawerContent === 'function') {
      return (
        <DrawerLayout
            drawerWidth={props.drawerWidth}
            drawerPosition={props.drawerPosition}
            renderNavigationView={props.renderDrawerContent}>
          {navigator}
        </DrawerLayout>
      )
    } else {
      return navigator
    }
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
    const { renderBackButton } = this.props

    if (index === 0 || typeof renderBackButton !== 'function') {
      return <View style={{ width: 0, height: 0 }} />
    } else {
      const { props, store } = this
      const backButton = renderBackButton()
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
    const Page = this.routes[route.page] || {}
    const title = Page.title || ''

    return (
      <Text style={[ styles.toolbarTitle, this.props.titleStyle ]}>
        {title}
      </Text>
    )
  }
}

const TOOLBAR_HEIGHT = 53
const styles = StyleSheet.create({
  toolbar: {
    flex: 1,
    height: TOOLBAR_HEIGHT
  },
  toolbarTitle: {
    marginVertical: 9,
    fontSize: 20
  },
  page: {
    paddingTop: TOOLBAR_HEIGHT
  }
})
