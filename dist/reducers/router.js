'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = router;

var _actions = require('../actions/actions');

var _LinkInformation = require('../models/LinkInformation');

function router() {
  var router = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];
  var _router$stack = router.stack;
  var last = _router$stack === undefined ? [] : _router$stack;


  switch (action.type) {
    case _actions.POP_PAGE:
      return { stack: last.slice(0, last.length - 1) };

    case _actions.PUSH_PAGE:
      return { stack: last.concat(new _LinkInformation.LinkInformation(action.payload)) };
  }

  return router;
}