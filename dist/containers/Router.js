'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = undefined;

var _reactRedux = require('react-redux');

var _Router = require('../components/Router');

var _RouterState = require('../models/RouterState');

var _Route = require('../models/Route');

var _util = require('../util');

var returned = void 0;

var connector = (0, _reactRedux.connectAdvanced)(function (dispatch) {
  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var router = state.router;
    var previousRoutes = returned && returned.router && returned.router.routes;
    var nextRouter = new _RouterState.RouterState(Object.assign({}, router, {
      routes: router.routes.map(function (route, i) {
        var page = router.getPage(route);
        var pass = route.pass || {};
        var previousRoute = previousRoutes && previousRoutes[i];

        var nextProps = page.bindings.state(state, pass);
        var nextEvents = page.bindings.events(dispatch);

        if (previousRoute && (0, _util.deepEquals)(nextProps, previousRoute.page.props) && (0, _util.hasSameKeys)(nextEvents, previousRoute.page.events)) {
          return previousRoute;
        }

        return new _Route.Route(Object.assign({}, route, {
          page: {
            props: nextProps,
            events: nextEvents,
            combined: Object.assign({}, nextProps, nextEvents)
          }
        }));
      })
    }));

    if (previousRoutes && previousRoutes.length === nextRouter.routes.length && nextRouter.routes.every(isSameAs(previousRoutes))) {
      return returned;
    } else {
      returned = { router: nextRouter };
      return returned;
    }
  };
});

var isSameAs = function isSameAs(routes) {
  return function (route, i) {
    return route === routes[i];
  };
};
var Router = exports.Router = connector(_Router.Router);