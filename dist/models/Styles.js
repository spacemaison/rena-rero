'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconStyle = exports.ButtonStyle = exports.Style = exports.Styles = undefined;

var _icon = require('../styles/icon');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Styles = exports.Styles = function Styles() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$button = _ref.button;
  var button = _ref$button === undefined ? new ButtonStyle() : _ref$button;
  var _ref$icon = _ref.icon;
  var icon = _ref$icon === undefined ? new IconStyle() : _ref$icon;

  _classCallCheck(this, Styles);

  Object.assign(this, { button: button, icon: icon });
};

var Style = exports.Style = function Style() {
  var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref2$style = _ref2.style;
  var style = _ref2$style === undefined ? null : _ref2$style;

  _classCallCheck(this, Style);

  this.style = style;
};

var ButtonStyle = exports.ButtonStyle = function (_Style) {
  _inherits(ButtonStyle, _Style);

  function ButtonStyle() {
    _classCallCheck(this, ButtonStyle);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ButtonStyle).apply(this, arguments));
  }

  return ButtonStyle;
}(Style);

var IconStyle = exports.IconStyle = function (_Style2) {
  _inherits(IconStyle, _Style2);

  function IconStyle() {
    var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var font = _ref3.font;
    var color = _ref3.color;
    var size = _ref3.size;
    var activeOpacity = _ref3.activeOpacity;

    _classCallCheck(this, IconStyle);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(IconStyle).apply(this, arguments));

    _this2.font = font || _icon.defaults.font;
    _this2.color = color || _icon.defaults.color;
    _this2.size = size || _icon.defaults.size;
    _this2.activeOpacity = Number.isFinite(activeOpacity) ? activeOpacity : _icon.defaults.activeOpacity;
    return _this2;
  }

  return IconStyle;
}(Style);