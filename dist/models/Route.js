'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Route = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Route = exports.Route = function () {
  function Route() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var key = _ref.key;
    var url = _ref.url;
    var _ref$pass = _ref.pass;
    var pass = _ref$pass === undefined ? null : _ref$pass;
    var _ref$transition = _ref.transition;
    var transition = _ref$transition === undefined ? function () {} : _ref$transition;

    _classCallCheck(this, Route);

    this.pass = pass;
    this.transition = transition;

    if (typeof key === 'string' && key) {
      this.url = _url2.default.parse(key, true);
    } else if (url instanceof _url2.default.Url) {
      this.url = _url2.default.parse(_url2.default.format(url));
    } else {
      throw new TypeError('Route expected to have either a key string or a url');
    }

    this.url.protocol = this.url.protocol || 'page:';
  }

  _createClass(Route, [{
    key: 'key',
    get: function get() {
      return _url2.default.format(this.url);
    }
  }]);

  return Route;
}();