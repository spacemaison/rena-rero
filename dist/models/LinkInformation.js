'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinkInformation = exports.LinkInformation = function LinkInformation() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$page = _ref.page;
  var page = _ref$page === undefined ? '' : _ref$page;
  var _ref$pass = _ref.pass;
  var pass = _ref$pass === undefined ? null : _ref$pass;

  _classCallCheck(this, LinkInformation);

  this.page = page;
  this.pass = pass;
};