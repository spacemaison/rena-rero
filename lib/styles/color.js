import _color from 'color'

// This is a hack to force the NPM 'color' library to clone the color object on
// every method call rather than mutating it. This allows us to export immutable
// colors in the "base.js" file that just work, rather than having to remember
// to call clone on every mutation to that one color object.

export function color (...args) {
  return _color(...args)
}

color.prototype = Object.create(_color.prototype)

for (let name of Object.getOwnPropertyNames(_color.prototype)) {
  color.prototype[name] = function (...args) {
    const _super = _color.prototype
    const clone = _super.clone.call(this)

    return _super[name].apply(clone, args)
  }
}
