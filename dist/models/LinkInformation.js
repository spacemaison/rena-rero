'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkInformation = undefined;

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinkInformation = exports.LinkInformation = function LinkInformation() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$page = _ref.page;
  var page = _ref$page === undefined ? '' : _ref$page;
  var _ref$pass = _ref.pass;
  var pass = _ref$pass === undefined ? null : _ref$pass;

  _classCallCheck(this, LinkInformation);

  page = _url2.default.parse(page);

  if (!page.protocol) {
    page.protocol = 'page:';
  }

  this.page = page;
  this.pass = pass;
};