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

var _Link = require('./Link');

var _Page2 = require('./Page');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noTransition = function noTransition() {
  return {};
};

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
      var _props$pass = _props.pass;
      var pass = _props$pass === undefined ? {} : _props$pass;
      var url = _props.url;
      var _props$tabs = _props.tabs;
      var tabs = _props$tabs === undefined ? [] : _props$tabs;


      return _react2.default.createElement(
        _reactNative.View,
        null,
        _react2.default.createElement(CurrentPage, _extends({}, pass || {}, { url: url })),
        _react2.default.createElement(
          _reactNative.View,
          null,
          tabs.map(function (page) {
            return _react2.default.createElement(
              _reactNative.View,
              { key: page },
              _react2.default.createElement(_Link.Link, { to: page, transition: noTransition })
            );
          })
        )
      );
    }
  }], [{
    key: 'renderToolbar',
    value: function renderToolbar() {
      return null;
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