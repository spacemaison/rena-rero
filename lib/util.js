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
