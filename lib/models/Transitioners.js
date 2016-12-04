import { NavigationExperimental } from 'react-native'

const Navigation = NavigationExperimental || { Card: {} }
const {
    CardStackPanResponder,
    CardStackStyleInterpolator } = Navigation.Card

const emptyObject = () => ({})
const ifFunction = test => typeof test === 'function' && test || null
const defaultHandlers = props => CardStackPanResponder.forHorizontal(props)
const defaultStyle = props => CardStackStyleInterpolator.forHorizontal(props)
const composeResult = (a = emptyObject, b = emptyObject) => (
  (...args) => Object.assign({}, a(...args) || {}, b(...args) || {})
)

export class Transitioners {
  constructor (...handlers) {
    for (let obj of handlers.filter(handler => handler != null)) {
      let { style, handlers } = obj

      style = ifFunction(style) || defaultStyle
      handlers = ifFunction(handlers) || defaultHandlers

      this.style = composeResult(style, this.style)
      this.handlers = composeResult(handlers, this.handlers)
    }
  }

  style (...args) {
    return {}
  }

  handlers (...args) {
    return {}
  }
}
