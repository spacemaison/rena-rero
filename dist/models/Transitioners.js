'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transitioners = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactNative = require('react-native');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Navigation = _reactNative.NavigationExperimental || { Card: {} };
var _Navigation$Card = Navigation.Card;
var CardStackPanResponder = _Navigation$Card.CardStackPanResponder;
var CardStackStyleInterpolator = _Navigation$Card.CardStackStyleInterpolator;


var emptyObject = function emptyObject() {
  return {};
};
var ifFunction = function ifFunction(test) {
  return typeof test === 'function' && test || null;
};
var defaultHandlers = function defaultHandlers(props) {
  return CardStackPanResponder.forHorizontal(props);
};
var defaultStyle = function defaultStyle(props) {
  return CardStackStyleInterpolator.forHorizontal(props);
};
var composeResult = function composeResult() {
  var a = arguments.length <= 0 || arguments[0] === undefined ? emptyObject : arguments[0];
  var b = arguments.length <= 1 || arguments[1] === undefined ? emptyObject : arguments[1];
  return function () {
    return Object.assign({}, a.apply(undefined, arguments) || {}, b.apply(undefined, arguments) || {});
  };
};

var Transitioners = exports.Transitioners = function () {
  function Transitioners() {
    _classCallCheck(this, Transitioners);

    for (var _len = arguments.length, handlers = Array(_len), _key = 0; _key < _len; _key++) {
      handlers[_key] = arguments[_key];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = handlers.filter(function (handler) {
        return handler != null;
      })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var obj = _step.value;
        var style = obj.style;
        var _handlers = obj.handlers;


        style = ifFunction(style) || defaultStyle;
        _handlers = ifFunction(_handlers) || defaultHandlers;

        this.style = composeResult(style, this.style);
        this.handlers = composeResult(_handlers, this.handlers);
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
  }

  _createClass(Transitioners, [{
    key: 'style',
    value: function style() {
      return {};
    }
  }, {
    key: 'handlers',
    value: function handlers() {
      return {};
    }
  }]);

  return Transitioners;
}();