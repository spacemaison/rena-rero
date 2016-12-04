'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabLink = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _Link = require('./Link');

var _Tabs = require('./Tabs');

var _Transitioners = require('../models/Transitioners');

var _tabLink = require('../styles/tab-link');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noop = function noop() {};
var noTransition = new _Transitioners.Transitioners({ style: noop, handlers: noop });

var TabLink = exports.TabLink = function (_React$Component) {
  _inherits(TabLink, _React$Component);

  function TabLink() {
    _classCallCheck(this, TabLink);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TabLink).apply(this, arguments));
  }

  _createClass(TabLink, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var pass = _props.pass;
      var to = _props.to;
      var tabs = _props.tabs;

      var props = {
        pass: pass, to: to,
        transitions: noTransition,
        renderPage: _Tabs.Tabs.renderTabs.bind(null, tabs),
        renderToolbar: function renderToolbar() {
          return null;
        }
      };

      return _react2.default.createElement(_Link.Link, _extends({}, props, { style: _tabLink.styles.tabLink }));
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      var arrayOf = _react.PropTypes.arrayOf;
      var string = _react.PropTypes.string;


      return Object.assign({}, _Link.Link.propTypes, {
        tabs: arrayOf(string)
      });
    }
  }]);

  return TabLink;
}(_react2.default.Component);