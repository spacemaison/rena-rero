'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushPage = exports.popPage = undefined;

var _action = require('./action');

var _actions = require('./actions');

var popPage = exports.popPage = _action.action.bind(null, _actions.POP_PAGE);
var pushPage = exports.pushPage = _action.action.bind(null, _actions.PUSH_PAGE);