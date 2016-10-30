"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DrawerState = exports.DrawerState = function DrawerState() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$isOpen = _ref.isOpen;
  var isOpen = _ref$isOpen === undefined ? false : _ref$isOpen;

  _classCallCheck(this, DrawerState);

  this.isOpen = isOpen;
};