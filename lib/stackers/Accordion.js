// TODO: Your almost there! I've decided to forgoe hooking transition animations
// into the router in favor of just handling them as subviews of this PageStack.
// This means you can just copy the "TestRNProject"s code more or less into
// this file, which should be pretty easy, yay!
//
// Do things in the following order
// - Finish actually copying the code in
// - Commit the work and refactor space-watch-frontend-native to use it
// - Get TestRNProject looking good on iOS
// - Use that knowledge to get space-watch-frontend-native looking good on iOS

import React from 'react'
import debounce from 'lodash.debounce'
import {
    Animated,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    NavigationExperimental as Navigation,
    View } from 'react-native'
import { PageStack } from './PageStack'
import { styles } from '../styles/accordion-stacker'
import { DefaultPageBindings } from '../pages/DefaultPageBindings'
import { DefaultPageComponent } from '../pages/DefaultPageComponent'

const { Header } = Navigation

export class Accordion extends PageStack {
  constructor ({
      pages = [],
      offsets = [],
      renderScrollView,
      scrollViewOffset = 0 } = {}) {
    super(...arguments)

    this.pages = pages
    this._animation = new Animated.Value(0)
    this._contentOffset = { x: 0, y: 0 }
    this._scenes = null
    this.renderScrollView = renderScrollView || this.renderScrollView
    this.scrollViewOffset = scrollViewOffset

    this.bindings = new DefaultPageBindings(arguments[0])
  }

  toolbar () {
    return null
  }

  renderScrollView (props) {
    return <ScrollView {...props} />
  }

  scenes (store, props) {
    const { navigationState } = props
    const { route } = props.scene

    const activePage = navigationState.getPage(props.scene.route)
    const pages = this.pages.map(page => navigationState.getPage(page))
    const scene = () => (
      <AccordionScenes
        activePage={activePage}
        activeRoute={route}
        ref={scenes => { this._scenes = scenes }}
        renderScrollView={this.renderScrollView.bind(this)}
        scrollViewOffset={this.scrollViewOffset}
        pages={pages}
        setScrollBoundary={this.setScrollBoundary.bind(this)}
        routerProps={props}
        onHeaderPress={this.onTransitionAccordion.bind(this)}
        onScroll={this.onScroll.bind(this)}
        onNavigateBack={this.onNavigateBack.bind(this)}
        />
    )

    return (
      <Navigation.Card
        {...props}
        key={props.scene.key}
        style={[ { flex: 1, backgroundColor: 'white' }, activePage.style(props) ]}
        panHandlers={activePage.handlers(props)}
        renderScene={scene} />
    )
  }

  onScroll (event) {
    const { nativeEvent: { contentOffset } } = event

    this._contentOffset = contentOffset
  }

  onTransitionAccordion (pageIndex) {
    const state = {
      animation: this._animation,
      activePosition: pageIndex,
      contentOffset: this._contentOffset,
      hasActivePage: true,
      isAnimating: true
    }

    this._scenes.setState(state, () => {
      Animated.spring(this._animation, { toValue: 1 }).start(() => {
        this._scenes.setState({ isAnimating: false })
      })
    })
  }

  onNavigateBack () {
    this._scenes.setState({ hasActivePage: false, scrollBoundary: null }, () => {
      Animated.spring(this._animation, { toValue: 0 }).start()
    })
  }

  setScrollBoundary (scrollBoundary) {
    this._scenes.setState({ scrollBoundary })
  }
}

class AccordionScenes extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {
      animation: null,
      contentOffset: { x: 0, y: 0 },
      activePosition: NaN,
      hasActivePage: false
    }
    this._sv = null
  }

  componentDidUpdate () {
    const { scrollViewOffset } = this.props
    const { isAnimating, contentOffset } = this.state

    if (isAnimating && contentOffset.y < scrollViewOffset && this._sv) {
      this._sv.scrollTo({ y: scrollViewOffset })
    }
  }

  render () {
    const { props, state } = this
    const { activeRoute, renderScrollView } = props

    const scrollView = renderScrollView(
        activeRoute.page.combined,
        activeRoute.pass || {})
    const style = styles.scrollView
    const ref = sv => { this._sv = sv }

    const noop = () => {}
    const scrollTo = options => this._sv.scrollTo(options)
    const scrollToDebounced = this._sv && debounce(scrollTo, 80) || noop
    const onScroll = event => {
      const { scrollBoundary } = state

      props.onScroll(event)

      if (scrollBoundary) {
        const { nativeEvent: { contentOffset, layoutMeasurement } } = event
        const { height: windowHeight } = layoutMeasurement
        const testHeight = Math.min(windowHeight, scrollBoundary.height)

        if (contentOffset.y < scrollBoundary.y1) {
          scrollToDebounced({ y: scrollBoundary.y1 })
        } else if (contentOffset.y + testHeight > scrollBoundary.y2) {
          scrollToDebounced({ y: scrollBoundary.y2 - testHeight })
        }
      }
    }

    return React.cloneElement(scrollView, { style, onScroll, ref },
      props.pages.map((page, index) => (
        <AccordionScene
          {...props}
          {...state}
          onHeaderPress={(...args) => { props.onHeaderPress(index, ...args) }}
          key={index}
          position={index}
          page={page}
          route={activeRoute}
          />
      ))
    )
  }
}

class AccordionScene extends React.Component {
  constructor (...args) {
    super(...args)
    this.__layout = { x: 0, y: 0, width: 0, height: 0 }
  }

  render () {
    const { props, __layout: layout } = this
    const { animation, activePosition, contentOffset, position, route } = props
    const { hasActivePage, page, routerProps, scrollViewOffset } = props
    const { height: windowHeight } = Dimensions.get('window')

    const isActivePage = position === activePosition
    const outputFinal =
        isActivePage && contentOffset.y < scrollViewOffset ? -(layout.y)
      : isActivePage ? -(layout.y - contentOffset.y + scrollViewOffset)
      : position < activePosition ? -windowHeight
      : position > activePosition ? windowHeight
      : -(layout.y - contentOffset.y)

    const dynamicStyle = {
      transform: isNaN(activePosition) ? [] : [{
        translateY: animation.interpolate({
          inputRange: [ 0, 1 ],
          outputRange: [ 0, outputFinal ]
        })
      }]
    }
    const render = hasActivePage && isActivePage
        ? (page.content).bind(page)
        : (page.preview || page.content).bind(page)

    if (page.toolbarLeft !== DefaultPageComponent.prototype.toolbarLeft ||
        page.toolbarRight !== DefaultPageComponent.prototype.toolbarRight) {
      throw new TypeError(
          'The Accordion stack does not support rendering pages with generic ' +
          'toolbar components. You can use iconsLeft or iconsRight to add ' +
          'icons to the toolbars.')
    }

    return (
      <Animated.View
        style={[ styles.scene, dynamicStyle ]}
        onLayout={event => {
          if (hasActivePage && isActivePage) {
            const { nativeEvent } = event
            const { layout } = nativeEvent
            const y1 = contentOffset.y < scrollViewOffset
                ? scrollViewOffset
                : contentOffset.y

            props.setScrollBoundary({
              y1,
              y2: y1 + layout.height,
              height: layout.height
            })
          }
          return this.onLayout(event)
        }}>
        <TouchableOpacity onPress={this.props.onHeaderPress}>
          <AccordionHeader
            {...routerProps}
            hasActivePage
            style={styles.header}
            renderLeftComponent={renderLeftComponent}
            renderRightComponent={page.toolbarRight.bind(
                page,
                route.page.combined,
                route.pass || {})}
            renderTitleComponent={page.toolbarTitle.bind(
                page,
                route.page.combined,
                route.pass || {})}
            />
        </TouchableOpacity>

        <View>
          {render(route.page.combined, Object.assign({}, route.pass || {}, {
            isPreviewPage: !hasActivePage || !isActivePage
          }))}
        </View>
      </Animated.View>
    )

    function renderLeftComponent () {
      if (isActivePage && hasActivePage) {
        return <Header.BackButton onPress={props.onNavigateBack} />
      }

      if (page.iconsLeft && page.iconsLeft.length > 1) {
        throw new Error('Accordion only supports rendering one left icon')
      }

      const style = {
        opacity: animation == null ? 1 : animation.interpolate({
          inputRange: [ 0, 1 ],
          outputRange: [ 1, 0 ]
        })
      }

      return page.toolbarLeft(route.page.combined, { style })
    }
  }

  onLayout ({ nativeEvent: { layout = {} } } = {}) {
    this.__layout = layout
  }
}

class AccordionHeader extends Header {
  _renderLeft (props) {
    return this._renderSubView(
        props,
        'left',
        this.props.renderLeftComponent,
        () => ({}))
  }

  _renderRight (props) {
    return this._renderSubView(
        props,
        'right',
        this.props.renderRightComponent,
        () => ({}))
  }

  _renderTitle (props) {
    return this._renderSubView(
      props,
      'title',
      this.props.renderTitleComponent,
      () => {
        const { position, scene } = props
        const { index } = scene

        if (!scene.isActive) {
          return { opacity: 0 }
        }

        return {
          transform: !this.props.hasActivePage ? [] : [{
            translateX: position.interpolate({
              inputRange: [ index - 1, index + 1 ],
              outputRange: [ -50, 50 ]
            })
          }]
        }
      })
  }
}
