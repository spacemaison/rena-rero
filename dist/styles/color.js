'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.color = color;

var _color2 = require('color');

var _color3 = _interopRequireDefault(_color2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This is a hack to force the NPM 'color' library to clone the color object on
// every method call rather than mutating it. This allows us to export immutable
// colors in the "base.js" file that just work, rather than having to remember
// to call clone on every mutation to that one color object.

function color() {
  return _color3.default.apply(undefined, arguments);
}

color.prototype = Object.create(_color3.default.prototype);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  var _loop = function _loop() {
    var name = _step.value;

    color.prototype[name] = function () {
      var _super = _color3.default.prototype;
      var clone = _super.clone.call(this);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _super[name].apply(clone, args);
    };
  };

  for (var _iterator = Object.getOwnPropertyNames(_color3.default.prototype)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    _loop();
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}