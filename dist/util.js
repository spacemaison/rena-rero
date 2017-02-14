'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.noop = noop;
exports.classOf = classOf;
exports.deepEquals = deepEquals;
exports.hasSameKeys = hasSameKeys;
function noop() {}
function classOf(Klass) {
  return function (props, name, component) {
    var error = new TypeError('Invalid prop \'' + name + '\' supplied to ' + component + '. Expected class ' + ('constructor \'' + Klass.name + '\''));

    try {
      var Test = props[name];
      var proto = Test.prototype;

      if (!proto || !(Object.create(proto) instanceof Klass)) {
        return error;
      }
    } catch (e) {
      return error;
    }
  };
}

function deepEquals() {
  var objA = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var objB = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(objA)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      var aVal = objA[key];
      var bVal = objB[key];

      if (aVal === bVal) {
        continue;
      } else if (isObject(aVal) && isObject(bVal)) {
        if (!deepEquals(aVal, bVal)) {
          return false;
        }
      } else {
        return false;
      }
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

  return true;
}

function hasSameKeys() {
  var objA = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var objB = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return Object.keys(objA).every(function (property) {
    return Object.prototype.hasOwnProperty.call(objB, property);
  });
}

var hasOwnProp = exports.hasOwnProp = Object.prototype.hasOwnProperty.bind(Object.prototype);
var isObject = exports.isObject = function isObject(test) {
  return test && (typeof test === 'undefined' ? 'undefined' : _typeof(test)) === 'object';
};