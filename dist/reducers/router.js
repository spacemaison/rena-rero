'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = router;

var _actions = require('../actions/actions');

var _RouterState = require('../models/RouterState');

var _DrawerState = require('../models/DrawerState');

var _reactNative = require('react-native');

function router() {
  var initialRouteState = arguments.length <= 0 || arguments[0] === undefined ? new _RouterState.RouterState() : arguments[0];

  return _router.bind(new _RouterState.RouterState(initialRouteState));
}

function _router() {
  var router = arguments.length <= 0 || arguments[0] === undefined ? this : arguments[0];

  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var type = _ref.type;
  var route = _ref.payload;

  switch (type) {
    case _actions.CLOSE_DRAWER:
    case _actions.OPEN_DRAWER:
      var isOpen = type === _actions.OPEN_DRAWER;
      var drawer = new _DrawerState.DrawerState({ isOpen: isOpen });

      return new _RouterState.RouterState(Object.assign({}, router, { drawer: drawer }));

    case _actions.PUSH_PAGE:
      var current = router.routes[router.index];

      if (current.key === (route && route.key)) {
        return router;
      }

      var previous = router.routes.slice(0).reverse().find(function (_ref2) {
        var url = _ref2.url;
        return route.url.path === url.path;
      });

      if (previous) {
        route.url.query.count = (+previous.url.query.count || 0) + 1;
      }

      return new _RouterState.RouterState(_reactNative.NavigationExperimental.StateUtils.push(router, route));

    case _actions.POP_PAGE:
      if (router.index === 0 || router.routes.length === 1) {
        return router;
      }

      return new _RouterState.RouterState(_reactNative.NavigationExperimental.StateUtils.pop(router));
  }

  return router;
}