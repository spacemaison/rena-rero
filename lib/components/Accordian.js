import React, { PropTypes } from 'react'
import { Animated, ListView, Platform, StyleSheet, View } from 'react-native'
import { Link } from './Link'
import { Page } from './Page'
import { Transitioners } from '../models/Transitioners'
import { NavigationExperimental } from 'react-native'

const Navigation = NavigationExperimental || { Card: {} }
const {
    CardStackPanResponder,
    CardStackStyleInterpolator } = Navigation.Card

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56

export class Accordian extends React.Component {
  static get propTypes () {
    const { any, instanceOf } = PropTypes

    return {
      dataSource: instanceOf(ListView.DataSource),
      listViewProps: any
    }
  }

  static renderToolbar () {
    return null
  }

  constructor (...args) {
    super(...args)
    this.renderRow = this.renderRow.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
  }

  render () {
    const { previews, titles, listViewProps = {} } = this.props

    return (
      <ListView
        enableEmptySections
        dataSource={this.props.dataSource}
        renderSectionHeader={this.renderSectionHeader}
        renderRow={this.renderRow}
        style={{ flex: 1 }}
        {...listViewProps}
        />
    )
  }

  renderSectionHeader (_, title) {
    return <AccordianLink to={title} />
  }

  renderRow (Page) {
    return (Page.renderPreview || (() => {})).call(Page)
  }
}

export class AccordianLink extends React.Component {
  static get propTypes () {
    return Link.propTypes
  }

  get transition () {
    const self = this
    const { position } = this.props

    return new Transitioners({
      style ({ layout = {}, position, scene } = {}) {
        const { measurement } = self

        if (!layout.isMeasured) {
          return CardStackStyleInterpolator.forInitial(props)
        }

        if (!measurement) {
          return {}
        }

        const index = scene.index
        const inputRange = [ index - 1, index, index + 0.99, index + 1 ]

        const opacity = position.interpolate({
          inputRange,
          outputRange: [ 1, 1, 0.3, 0 ]
        })

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
    const { transition } = this

    return (
      <Link
        {...this.props}
        onPress={this.onPress}
        style={[ toolbarStyleStatic.base, { height: APPBAR_HEIGHT } ]}
        transitions={transition}
        renderToolbar={this.renderToolbar.bind(this, transition)}
        ref='link'
        />
    )
  }

  renderToolbar (transitions, props) {
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

    return Page.renderToolbar(Object.assign({}, props, {
      toolbarStyle: [
        toolbarStyleStatic.base,
        toolbarStyleStatic.shadow,
        toolbarStyleDynamic,
        toolbarStyleOverride
      ]
    }))
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
  }
})
