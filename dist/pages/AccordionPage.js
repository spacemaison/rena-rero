'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccordionPage = undefined;

var _Page2 = require('./Page');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccordionPage = exports.AccordionPage = function (_Page) {
  _inherits(AccordionPage, _Page);

  function AccordionPage() {
    var _Object$getPrototypeO;

    _classCallCheck(this, AccordionPage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AccordionPage)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this.preview = args[0] && args[0].preview;
    return _this;
  }

  return AccordionPage;
}(_Page2.Page);