'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Styles = require('../models/Styles');

var _FontAwesome = require('react-native-vector-icons/FontAwesome');

var _FontAwesome2 = _interopRequireDefault(_FontAwesome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconButton = exports.IconButton = function (_React$Component) {
  _inherits(IconButton, _React$Component);

  function IconButton() {
    _classCallCheck(this, IconButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(IconButton).apply(this, arguments));
  }

  _createClass(IconButton, [{
    key: 'render',
    value: function render() {
      var _context$styles = this.context.styles;
      var styles = _context$styles === undefined ? {} : _context$styles;
      var icon = styles.icon;
      var props = this.props;
      // FIXME: react-native-vector-icons doesn't resolve icons dynamically.
      // const Icon = require('react-native-vector-icons/' + icon.font)

      return _react2.default.createElement(
        _FontAwesome2.default.Button,
        _extends({ size: icon.size, color: icon.color }, props),
        props.children
      );
    }
  }], [{
    key: 'contextTypes',
    get: function get() {
      return {
        styles: _react2.default.PropTypes.instanceOf(_Styles.Styles)
      };
    }
  }]);

  return IconButton;
}(_react2.default.Component);