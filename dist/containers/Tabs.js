'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = undefined;

var _reactRedux = require('react-redux');

var _Tabs = require('../components/Tabs');

var _Route = require('../models/Route');

var connector = (0, _reactRedux.connect)(mapState, mapDispatch);
var Tabs = exports.Tabs = connector(_Tabs.Tabs);

function mapState(_ref, _ref2) {
  var router = _ref.router;
  var _ref2$tabs = _ref2.tabs;
  var tabs = _ref2$tabs === undefined ? [] : _ref2$tabs;

  var CurrentPage = router.getCurrentPage();
  var route = router.getCurrentRoute();

  var proto = Object.getPrototypeOf(CurrentPage.prototype);
  if (proto.constructor === Tabs) {
    route = new _Route.Route({ key: tabs[0] });
    CurrentPage = router.getPage(route);
  }

  return {
    CurrentPage: CurrentPage,
    tabs: tabs,
    url: route.url,
    pass: route.pass
  };
}

function mapDispatch(dispatch) {
  return {};
}