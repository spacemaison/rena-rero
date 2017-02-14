'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Route = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _Transitioners = require('./Transitioners');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Route = exports.Route = function () {
  _createClass(Route, null, [{
    key: 'normalizePageName',
    value: function normalizePageName() {
      var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      var lowerCaseName = name.toLowerCase();

      if (!/^page:\/?\/?/.test(lowerCaseName)) {
        lowerCaseName = 'page:' + lowerCaseName;
      }

      return lowerCaseName;
    }
  }]);

  function Route() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var key = _ref.key;
    var url = _ref.url;
    var _ref$pass = _ref.pass;
    var pass = _ref$pass === undefined ? null : _ref$pass;
    var _ref$transitions = _ref.transitions;
    var transitions = _ref$transitions === undefined ? new _Transitioners.Transitioners() : _ref$transitions;
    var _ref$page = _ref.page;
    var page = _ref$page === undefined ? { props: {}, events: {}, combined: {} } : _ref$page;
    var renderPage = _ref.renderPage;
    var renderToolbar = _ref.renderToolbar;

    _classCallCheck(this, Route);

    Object.assign(this, { page: page, pass: pass, renderPage: renderPage, renderToolbar: renderToolbar, transitions: transitions });

    if (typeof key === 'string' && key) {
      this.url = _url2.default.parse(Route.normalizePageName(key), true);
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