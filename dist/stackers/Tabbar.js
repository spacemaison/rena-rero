'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabbar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Page2 = require('./Page');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { TabLink } from '../components/TabLink'

var Tabbar = exports.Tabbar = function (_Page) {
  _inherits(Tabbar, _Page);

  function Tabbar() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$pages = _ref.pages;
    var pages = _ref$pages === undefined ? [] : _ref$pages;

    _classCallCheck(this, Tabbar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tabbar).apply(this, arguments));

    _this.pages = pages;
    return _this;
  }

  _createClass(Tabbar, [{
    key: 'toolbars',
    value: function toolbars() {
      return null;
    }
  }, {
    key: 'scenes',
    value: function scenes() {}
  }]);

  return Tabbar;
}(_Page2.Page);