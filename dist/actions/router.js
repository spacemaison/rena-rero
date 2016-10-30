'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeDrawer = exports.openDrawer = exports.pushPage = exports.popPage = undefined;

var _action = require('./action');

var _actions = require('./actions');

var popPage = exports.popPage = _action.action.bind(null, _actions.POP_PAGE);
var pushPage = exports.pushPage = _action.action.bind(null, _actions.PUSH_PAGE);
var openDrawer = exports.openDrawer = _action.action.bind(null, _actions.OPEN_DRAWER);
var closeDrawer = exports.closeDrawer = _action.action.bind(null, _actions.CLOSE_DRAWER);