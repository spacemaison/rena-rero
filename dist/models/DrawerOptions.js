'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawerOptions = exports.positions = undefined;

var _reactNativeDrawerLayout = require('react-native-drawer-layout');

var _reactNativeDrawerLayout2 = _interopRequireDefault(_reactNativeDrawerLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DRAWER_LOCK_MODES = ['unlocked', 'locked-closed', 'locked-open'];

var DRAWER_POSITIONS = ['left', 'right'];

var noop = function noop() {};

var positions = exports.positions = _reactNativeDrawerLayout2.default.positions;

var DrawerOptions = exports.DrawerOptions = function DrawerOptions() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$backgroundColor = _ref.backgroundColor;
  var backgroundColor = _ref$backgroundColor === undefined ? 'rgba(255, 255, 255, 1)' : _ref$backgroundColor;
  var _ref$keyboardDismissM = _ref.keyboardDismissMode;
  var keyboardDismissMode = _ref$keyboardDismissM === undefined ? 'none' : _ref$keyboardDismissM;
  var _ref$lockMode = _ref.lockMode;
  var lockMode = _ref$lockMode === undefined ? 'unlocked' : _ref$lockMode;
  var _ref$onOpen = _ref.onOpen;
  var onOpen = _ref$onOpen === undefined ? noop : _ref$onOpen;
  var _ref$onClose = _ref.onClose;
  var onClose = _ref$onClose === undefined ? noop : _ref$onClose;
  var _ref$onSlide = _ref.onSlide;
  var onSlide = _ref$onSlide === undefined ? noop : _ref$onSlide;
  var _ref$onStateChanged = _ref.onStateChanged;
  var onStateChanged = _ref$onStateChanged === undefined ? noop : _ref$onStateChanged;
  var _ref$position = _ref.position;
  var position = _ref$position === undefined ? _reactNativeDrawerLayout2.default.positions.left : _ref$position;
  var renderContent = _ref.renderContent;
  var _ref$width = _ref.width;
  var width = _ref$width === undefined ? 300 : _ref$width;

  _classCallCheck(this, DrawerOptions);

  if (typeof renderContent !== 'function') {
    throw new TypeError('Expected DrawerOption "render" function to be included');
  }

  if (!DRAWER_LOCK_MODES.some(function (mode) {
    return mode === lockMode;
  })) {
    throw new TypeError('Invalid DrawerOption "lock mode": ' + lockMode + '. Expected one of ' + DRAWER_LOCK_MODES.join(', '));
  }

  if (_reactNativeDrawerLayout2.default.positions.left !== position && _reactNativeDrawerLayout2.default.positions.right !== position) {
    throw new TypeError('Invalid DrawerOption "position": ' + position + '. Expected one of ' + DRAWER_POSITIONS.join(', '));
  }

  Object.assign(this, {
    drawerBackgroundColor: backgroundColor,
    drawerLockMode: lockMode,
    drawerPosition: position,
    drawerWidth: width,
    keyboardDismissMode: keyboardDismissMode,
    lockMode: lockMode,
    onDrawerOpen: onOpen,
    onDrawerClose: onClose,
    onDrawerSlide: onSlide,
    onDrawerStateChanged: onStateChanged,
    renderNavigationView: renderContent
  });
};