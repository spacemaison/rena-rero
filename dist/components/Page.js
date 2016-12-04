'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _Transitioners = require('../models/Transitioners');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigation = _reactNative.NavigationExperimental || { Header: {} };
var Header = Navigation.Header;

var Page = exports.Page = function (_React$Component) {
  _inherits(Page, _React$Component);

  function Page() {
    _classCallCheck(this, Page);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Page).apply(this, arguments));
  }

  _createClass(Page, null, [{
    key: 'renderRightComponent',
    value: function renderRightComponent() {
      return null;
    }
  }, {
    key: 'renderToolbar',
    value: function renderToolbar(props) {
      var _this2 = this;

      var titleComponent = function titleComponent() {
        return _react2.default.createElement(
          Header.Title,
          null,
          _this2.title
        );
      };

      return _react2.default.createElement(Header, _extends({}, props, {
        style: props.toolbarStyle,
        renderTitleComponent: titleComponent,
        renderRightComponent: this.renderRightComponent.bind(this)
      }));
    }
  }, {
    key: 'title',
    get: function get() {
      return '';
    }
  }, {
    key: 'transitions',
    get: function get() {
      return null;
    }
  }]);

  return Page;
}(_react2.default.Component);