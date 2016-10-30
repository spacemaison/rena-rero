'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = undefined;

var _reactRedux = require('react-redux');

var _Router = require('../components/Router');

var connector = (0, _reactRedux.connect)(mapState, mapDispatch);
var Router = exports.Router = connector(_Router.Router);

function mapState(_ref) {
  var router = _ref.router;

  return { routerState: router };
}

function mapDispatch(dispatch) {
  return {};
}