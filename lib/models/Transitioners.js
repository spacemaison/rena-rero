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
  constructor (...allHandlers) {
    allHandlers = allHandlers.map(handler => {
      const { style, handlers } = handler || Object.create(null)

      return {
        style: ifFunction(style) || defaultStyle,
        handlers: ifFunction(handlers) || defaultHandlers
      }
    })

    for (let { style, handlers } of allHandlers) {
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
