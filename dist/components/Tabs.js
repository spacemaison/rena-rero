'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _TabLink = require('./TabLink');

var _Page2 = require('./Page');

var _tabs = require('../styles/tabs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = exports.Tabs = function (_Page) {
  _inherits(Tabs, _Page);

  function Tabs() {
    _classCallCheck(this, Tabs);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Tabs).apply(this, arguments));
  }

  _createClass(Tabs, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var CurrentPage = _props.CurrentPage;
      var pass = _props.pass;
      var tabs = _props.tabs;
      var url = _props.url;


      return Tabs.renderTabs(tabs, CurrentPage, { pass: pass, url: url });
    }
  }], [{
    key: 'renderToolbar',
    value: function renderToolbar() {
      return null;
    }
  }, {
    key: 'renderTabs',
    value: function renderTabs(tabs, Component, route) {
      return _react2.default.createElement(
        _reactNative.View,
        { style: _tabs.styles.tabs },
        _react2.default.createElement(Component, _extends({}, route.pass, { url: route.url })),
        _react2.default.createElement(
          _reactNative.View,
          { style: _tabs.styles.tabbar },
          tabs.map(function (page) {
            return _react2.default.createElement(_TabLink.TabLink, { key: page, to: page, tabs: tabs });
          })
        )
      );
    }
  }, {
    key: 'propTypes',
    get: function get() {
      var arrayOf = _react.PropTypes.arrayOf;
      var any = _react.PropTypes.any;
      var instanceOf = _react.PropTypes.instanceOf;
      var object = _react.PropTypes.object;
      var string = _react.PropTypes.string;


      return {
        CurrentPage: any,
        pass: object,
        tabs: arrayOf(string),
        url: instanceOf(_url2.default.Url)
      };
    }
  }]);

  return Tabs;
}(_Page2.Page);