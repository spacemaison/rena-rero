'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageStack = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageStack = exports.PageStack = function () {
  function PageStack() {
    _classCallCheck(this, PageStack);
  }

  _createClass(PageStack, [{
    key: 'toolbar',
    value: function toolbar(store, routerProps) {
      var navigationState = routerProps.navigationState;
      var scene = routerProps.scene;
      var route = scene.route;


      var page = navigationState.getPage(route);

      return page.toolbar(route.page.combined, route.pass || {}, routerProps);
    }

    /**
    Maps an array of pages to Navigation.Card using the default panHandlers and
    styles.
    */

  }, {
    key: 'scenes',
    value: function scenes(store, props) {
      var _this = this;

      var navigationState = props.navigationState;

      var allPages = props.scenes.map(function (scene) {
        return navigationState.getPage(scene.route);
      });

      return allPages.map(function (page, i) {
        return _this.scene(store, props, props.scenes[i], page);
      });
    }

    /**
    Returns a Navigation.Card component from the given page using the default
    panHandlers and styles. The default panHandlers and styles are the left/right
    transitions provided by React Native.
    */

  }, {
    key: 'scene',
    value: function scene(store, routerProps, routeState, page) {
      var route = routeState.route;
      var combined = route.page.combined;

      var scene = page.content(combined, route.pass || {}, routerProps);
      var handlers = page.handlers(routerProps);
      var style = page.style(routerProps);

      return _react2.default.createElement(_reactNative.NavigationExperimental.Card, _extends({}, routerProps, {
        key: routeState.key,
        style: style,
        panHandlers: handlers,
        renderScene: function renderScene() {
          return scene;
        }
      }));
    }
  }]);

  return PageStack;
}();