export function noop () {}
export function classOf (Klass) {
  return function (props, name, component) {
    const error = new TypeError(
        `Invalid prop '${name}' supplied to ${component}. Expected class ` +
        `constructor '${Klass.name}'`)

    try {
      const Test = props[name]
      const proto = Test.prototype

      if (!proto || !(Object.create(proto) instanceof Klass)) {
        return error
      }
    } catch (e) {
      return error
    }
  }
}

export function deepEquals (objA = {}, objB = {}) {
  for (const key of Object.keys(objA)) {
    const aVal = objA[key]
    const bVal = objB[key]

    if (aVal === bVal) {
      continue
    } else if (isObject(aVal) && isObject(bVal)) {
      if (!deepEquals(aVal, bVal)) {
        return false
      }
    } else {
      return false
    }
  }

  return true
}

export function hasSameKeys (objA = {}, objB = {}) {
  return Object.keys(objA).every(property => (
    Object.prototype.hasOwnProperty.call(objB, property)
  ))
}

export const hasOwnProp = Object.prototype.hasOwnProperty.bind(Object.prototype)
export const isObject = test => test && typeof test === 'object'
