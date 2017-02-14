'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconBar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _Icon = require('./Icon');

var _Styles = require('../models/Styles');

var _iconBar = require('../styles/icon-bar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconBar = exports.IconBar = function (_React$Component) {
  _inherits(IconBar, _React$Component);

  function IconBar() {
    _classCallCheck(this, IconBar);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(IconBar).apply(this, arguments));
  }

  _createClass(IconBar, [{
    key: 'render',
    value: function render() {
      var context = this.context;
      var props = this.props;

      var activeOpacity = props.activeOpacity || context.styles.icon.activeOpacity;

      return _react2.default.createElement(
        _reactNative.Animated.View,
        { style: [_iconBar.styles.iconBar, this.props.style] },
        _react2.default.createElement(
          _reactNative.TouchableOpacity,
          { activeOpacity: activeOpacity },
          (this.props.icons || []).map(function (icon) {
            return typeof icon === 'string' ? { name: icon } : typeof icon === 'function' ? icon() : icon;
          }).map(function (icon, i) {
            var style = [_iconBar.styles.icon, icon.style];
            return _react2.default.createElement(_Icon.Icon, _extends({}, icon, { key: i, style: style }));
          })
        )
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      var arrayOf = _react.PropTypes.arrayOf;
      var func = _react.PropTypes.func;
      var number = _react.PropTypes.number;
      var oneOfType = _react.PropTypes.oneOfType;
      var string = _react.PropTypes.string;
      var object = _react.PropTypes.object;
      var style = _reactNative.Animated.View.propTypes.style;


      return {
        activeOpacity: number,
        icons: arrayOf(oneOfType([string, object, func])),
        style: style
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        icons: []
      };
    }
  }, {
    key: 'contextTypes',
    get: function get() {
      return {
        styles: _react.PropTypes.instanceOf(_Styles.Styles)
      };
    }
  }]);

  return IconBar;
}(_react2.default.Component);