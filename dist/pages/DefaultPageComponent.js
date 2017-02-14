'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultPageComponent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _IconBar = require('../components/IconBar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = _reactNative.NavigationExperimental.Header;

var DefaultPageComponent = exports.DefaultPageComponent = function () {
  function DefaultPageComponent() {
    var overrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, DefaultPageComponent);

    this.content = overrides.content || this.content;
    this.toolbar = overrides.toolbar || this.toolbar;
    this.toolbarLeft = overrides.toolbarLeft || this.toolbarLeft;
    this.toolbarRight = overrides.toolbarRight || this.toolbarRight;
    this.toolbarTitle = overrides.toolbarTitle || this.toolbarTitle;
    this.title = overrides.title || this.title;
    this.iconsLeft = Array.isArray(overrides.iconsLeft) ? overrides.iconsLeft : overrides.iconLeft ? [overrides.iconLeft] : null;
    this.iconsRight = Array.isArray(overrides.iconsRight) ? overrides.iconsRight : overrides.iconRight ? [overrides.iconRight] : null;
  }

  _createClass(DefaultPageComponent, [{
    key: 'content',
    value: function content() {
      return null;
    }
  }, {
    key: 'toolbar',
    value: function toolbar(storeProps, passedProps, routerProps) {
      return _react2.default.createElement(Header, _extends({}, routerProps, {
        renderTitleComponent: this.toolbarTitle.bind(this, storeProps, passedProps),
        renderRightComponent: this.toolbarRight.bind(this, storeProps, passedProps)
      }));
    }
  }, {
    key: 'toolbarLeft',
    value: function toolbarLeft(_) {
      var _this = this,
          _arguments = arguments;

      var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var style = _ref.style;

      var icons = (this.iconsLeft || []).map(function (icon) {
        return typeof icon === 'function' ? icon.bind.apply(icon, [_this].concat(Array.prototype.slice.call(_arguments))) : icon;
      });
      return _react2.default.createElement(_IconBar.IconBar, { style: style, icons: icons });
    }
  }, {
    key: 'toolbarRight',
    value: function toolbarRight(_) {
      var _this2 = this,
          _arguments2 = arguments;

      var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var style = _ref2.style;

      var icons = (this.iconsRight || []).map(function (icon) {
        return typeof icon === 'function' ? icon.bind.apply(icon, [_this2].concat(Array.prototype.slice.call(_arguments2))) : icon;
      });
      return _react2.default.createElement(_IconBar.IconBar, { style: style, icons: icons });
    }
  }, {
    key: 'toolbarTitle',
    value: function toolbarTitle() {
      var title = typeof this.title === 'function' ? this.title.apply(this, arguments) : typeof this.title === 'string' ? this.title : '';

      return _react2.default.createElement(
        Header.Title,
        null,
        title
      );
    }
  }]);

  return DefaultPageComponent;
}();