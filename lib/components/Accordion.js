import React, { PropTypes } from 'react'
import {
    ScrollView,
    NavigationExperimental,
    Platform,
    StyleSheet,
    View } from 'react-native'
import { Link } from './Link'
import { Page } from './Page'
import { classOf } from '../util'
import { Route } from '../models/Route'
import { Transitioners } from '../models/Transitioners'

const { Header } = NavigationExperimental
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56

export class Accordion extends Page {
  static get propTypes () {
    const { arrayOf, instanceOf, oneOfType, string } = PropTypes

    return {
      pages: arrayOf(oneOfType([ string, classOf(Page) ])),
      route: instanceOf(Route)
    }
  }

  static get contextTypes () {
    return {
      store: React.PropTypes.object
    }
  }

  static renderToolbar () {
    return null
  }

  shouldComponentUpdate (nextProps) {
    const { router } = this.context.store.getState()
    const { pages: currentPages } = this.props

    return nextProps.pages
      .map((nextPage) => router.getPage(nextPage))
      .some((nextPage, index) => currentPages[index] !== nextPage)
  }

  render () {
    const { context, props } = this
    const { store } = context
    const { router } = store.getState()
    const { route, pages, renderScrollView = this.renderScrollView } = props

    const dispatch = context.store.dispatch.bind(context.store)
    const wrapWithPassed = (pass, store, dispatch, cb) => props => {
      const state = store.getState()
      return cb.call(this, Object.assign({}, props, { pass, dispatch, state }))
    }

    const scrollViewParent = renderScrollView.call(this)
    const children = pages
      .map(page => [ router.getPage(page), page ])
      .map(([ page, uri ]) => (
        <View key={page.title}>
          <AccordionLink
            to={uri}
            renderLeftComponent={
              wrapWithPassed(
                  route.pass,
                  store,
                  dispatch,
                  page.renderToolbarLeftComponent)}
            renderRightComponent={
              wrapWithPassed(
                  route.pass,
                  store,
                  dispatch,
                  page.renderToolbarRightComponent)}
            />

          {(page.renderPreview || (() => null)).call(page)}
        </View>
      ))

    return React.cloneElement(scrollViewParent, {}, children)
  }

  renderScrollView (props = {}) {
    return <ScrollView {...props} />
  }
}

export class AccordionLink extends React.Component {
  static get propTypes () {
    const { func } = PropTypes

    return Object.assign(Link.propTypes, {
      renderLeftComponent: func,
      renderRightComponent: func
    })
  }

  static get defaultProps () {
    const noComponent = () => null

    return {
      renderLeftComponent: noComponent,
      renderRightComponent: noComponent
    }
  }

  get transition () {
    const self = this

    return new Transitioners({
      style ({ layout = {}, position, scene } = {}) {
        const { measurement } = self

        if (!measurement) {
          return {}
        }

        const index = scene.index
        const inputRange = [ index - 1, index, index + 0.99, index + 1 ]

        const bottom = position.interpolate({
          inputRange,
          outputRange: [
            layout.initHeight,
            measurement.height - APPBAR_HEIGHT,
            layout.initHeight,
            layout.initHeight
          ]
        })

        const top = position.interpolate({
          inputRange,
          outputRange: [ measurement.y, 0, 0, -10 ]
        })

        return {
          backgroundColor: 'white',
          opacity: 1,
          left: 0,
          top,
          bottom
        }
      }
    })
  }

  constructor (...args) {
    super(...args)
    this.onPress = this.onPress.bind(this)
    this.renderToolbar = this.renderToolbar.bind(this)
    this.measurement = null
  }

  onPress (dispatch) {
    this.refs.link.measure((_, __, width, height, x, y) => {
      this.measurement = { width, height, x, y }
      dispatch()
    })
  }

  render () {
    const { transition, props } = this
    const {
        renderRightComponent,
        renderLeftComponent } = props

    const styles = [
      toolbarStyleStatic.base,
      { height: APPBAR_HEIGHT }
    ]

    return (
      <Link
        {...props}
        onPress={this.onPress}
        style={styles}
        transitions={transition}
        renderToolbar={this.renderToolbar.bind(this)}
        ref='link'
        >
        <View style={[ ...styles, toolbarStyleStatic.wrapper ]}>
          <View style={{ paddingLeft: 12 }}>
            {renderLeftComponent()}
          </View>

          <View>
            <Header.Title>{this.props.to || ''}</Header.Title>
          </View>

          <View style={toolbarStyleStatic.rightChild}>
            {renderRightComponent()}
          </View>
        </View>
      </Link>
    )
  }

  renderToolbar (props) {
    const { scene, toolbarStyle: toolbarStyleOverride = {} } = props
    const { index } = scene

    const toolbarStyleDynamic = {
      transform: [{
        translateY: props.position.interpolate({
          inputRange: [ index - 1, index, index + 0.99, index + 1 ],
          outputRange: [ this.measurement.y, 0, 0, -10 ]
        })
      }]
    }

    const titleComponent = (...args) => {
      return <Header.Title>{this.props.to}</Header.Title>
    }

    const rightComponentStyles = [
      toolbarStyleStatic.rightChild,
      { height: APPBAR_HEIGHT }
    ]

    return (
      <AccordianHeader
        {...props}
        style={[
          toolbarStyleStatic.base,
          toolbarStyleStatic.shadow,
          toolbarStyleDynamic,
          toolbarStyleOverride
        ]}
        renderTitleComponent={titleComponent}
        renderRightComponent={() => (
          <View style={rightComponentStyles}>
            {this.props.renderRightComponent()}
          </View>
        )}
        />
    )
  }
}

class AccordianHeader extends Header {
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
          transform: [
            {
              translateX: position.interpolate({
                inputRange: [ index - 1, index + 1 ],
                outputRange: [ -50, 50 ]
              })
            }
          ]
        }
      })
  }
}

const toolbarStyleStatic = StyleSheet.create({
  base: {
    alignItems: 'center',
    backgroundColor: Platform.OS === 'ios' ? '#EFEFF2' : '#FFF',
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },

  shadow: {
    borderBottomColor: 'rgba(0, 0, 0, .15)',
    borderBottomWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0
  },

  wrapper: {
    backgroundColor: 'transparent',
    flex: 1
  },

  leftChild: {
    paddingLeft: 12
  },

  rightChild: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 12
  }
})
