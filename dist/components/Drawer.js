'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drawer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNativeDrawerLayout = require('react-native-drawer-layout');

var _reactNativeDrawerLayout2 = _interopRequireDefault(_reactNativeDrawerLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Drawer = exports.Drawer = function (_React$Component) {
  _inherits(Drawer, _React$Component);

  function Drawer() {
    _classCallCheck(this, Drawer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Drawer).apply(this, arguments));
  }

  _createClass(Drawer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._subscribeToStore();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unsubscribeToStore();
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;


      return _react2.default.createElement(
        _reactNativeDrawerLayout2.default,
        _extends({}, props, { ref: 'imperativeDrawer' }),
        props.children
      );
    }
  }, {
    key: '_subscribeToStore',
    value: function _subscribeToStore() {
      var store = this.context.store;
      var imperativeDrawer = this.refs.imperativeDrawer;


      this._unsubscribeToStore = store.subscribe(function () {
        var _store$getState = store.getState();

        var _store$getState$route = _store$getState.router;
        _store$getState$route = _store$getState$route === undefined ? {} : _store$getState$route;
        var _store$getState$route2 = _store$getState$route.drawer;
        var drawer = _store$getState$route2 === undefined ? {} : _store$getState$route2;


        if (drawer.isOpen) {
          imperativeDrawer.openDrawer();
        } else {
          imperativeDrawer.closeDrawer();
        }
      });
    }
  }, {
    key: '_unsubscribeToStore',
    value: function _unsubscribeToStore() {
      // Noop here because it's overridden later in _subscribeToStore
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return _reactNativeDrawerLayout2.default.propTypes;
    }
  }, {
    key: 'contextTypes',
    get: function get() {
      return {
        store: _react2.default.PropTypes.object
      };
    }
  }, {
    key: 'positions',
    get: function get() {
      return _reactNativeDrawerLayout2.default.positions;
    }
  }]);

  return Drawer;
}(_react2.default.Component);