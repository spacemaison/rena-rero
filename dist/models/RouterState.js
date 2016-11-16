'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouterState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _Route = require('./Route');

var _DrawerState = require('./DrawerState');

var _Page = require('../components/Page');

var _Tabs = require('../containers/Tabs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RESERVED = ['previous'];
var inheritsFrom = function inheritsFrom(Test, Klass) {
  try {
    return Object.create(Klass.prototype) instanceof Test;
  } catch (e) {
    return false;
  }
};

var RouterState = exports.RouterState = function () {
  function RouterState() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$routes = _ref.routes;
    var routes = _ref$routes === undefined ? [] : _ref$routes;
    var _ref$index = _ref.index;
    var index = _ref$index === undefined ? 0 : _ref$index;
    var pages = _ref.pages;
    var drawer = _ref.drawer;
    var initialPage = _ref.initialPage;

    _classCallCheck(this, RouterState);

    drawer = drawer || new _DrawerState.DrawerState();

    if (!Array.isArray(routes)) {
      throw new TypeError('Expected routes to be an array');
    }

    if (!pages || Object.keys(pages).length === 0) {
      throw new TypeError('Expected pages object to be passed to RouterState with key names ' + 'that correspond to Routes passed into the pushPage action.');
    }

    /*
    if (!pageKeys.every(key => inheritsFrom(Page, pages[key]))) {
      throw new TypeError(
          'Expected every page in "pages" to inherit from Page class')
    }
    */

    if (!routes.every(function (route) {
      return route instanceof _Route.Route;
    })) {
      throw new TypeError('Expected router state to contain only routes');
    }

    if (!Number.isInteger(index)) {
      throw new TypeError('Expected index to be an integer');
    }

    if (routes.length === 0) {
      if (typeof initialPage === 'string') {
        initialPage = new _Route.Route({ key: initialPage });
      }

      if (!(initialPage instanceof _Route.Route)) {
        throw new TypeError('Expected Route or a string pointing to a Route to be passed as ' + 'the initial page');
      }

      if (!pages[initialPage.url.path]) {
        throw new TypeError('Expected pages to contain initial page');
      }

      if (RESERVED.some(function (reserved) {
        return reserved in pages;
      })) {
        throw new TypeError('Reserved page name used: "' + reserved + '"');
      }

      routes.push(initialPage);
      index = 0;
    }

    if (index < 0 || !routes[index]) {
      throw new Error('RouterState must have an active route');
    }

    Object.assign(this, {
      routes: routes,
      drawer: drawer,
      index: index,
      pages: pages
    });
  }

  _createClass(RouterState, [{
    key: 'getPage',
    value: function getPage() {
      var route = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var pages = this.pages;
      var url = route.url;


      if (!url || !url.protocol || url.protocol !== 'page:') {
        throw new Error('URL protocol is not \'page:\' for route: ' + url);
      }

      if (!pages.hasOwnProperty(url.path)) {
        throw new Error('Page at: "' + url.path + '" does not exist');
      }

      var PageClass = Object.getPrototypeOf(pages[url.path].prototype);

      if (PageClass.constructor !== _Page.Page && PageClass.constructor !== _Tabs.Tabs) {
        throw new TypeError('Expected Page at route: ' + url.path + '. Did your page inherit from ' + 'the Page component?');
      }

      return pages[url.path];
    }
  }, {
    key: 'getCurrentPage',
    value: function getCurrentPage() {
      var route = arguments.length <= 0 || arguments[0] === undefined ? this.getCurrentRoute() : arguments[0];

      return this.getPage(route);
    }
  }, {
    key: 'getRoute',
    value: function getRoute(index) {
      return this.routes[index];
    }
  }, {
    key: 'getCurrentRoute',
    value: function getCurrentRoute() {
      return this.routes[this.index];
    }
  }]);

  return RouterState;
}();