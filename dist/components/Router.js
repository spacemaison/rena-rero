'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _Drawer = require('./Drawer');

var _router = require('../actions/router');

var _DrawerOptions = require('../models/DrawerOptions');

var _RouterState = require('../models/RouterState');

var _Styles = require('../models/Styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = exports.Router = function (_React$Component) {
  _inherits(Router, _React$Component);

  _createClass(Router, null, [{
    key: 'propTypes',
    get: function get() {
      var _React$PropTypes = _react2.default.PropTypes;
      var func = _React$PropTypes.func;
      var instanceOf = _React$PropTypes.instanceOf;
      var style = _reactNative.View.propTypes.style;


      return {
        drawerProps: instanceOf(_DrawerOptions.DrawerOptions),
        renderDrawerContent: func,
        router: instanceOf(_RouterState.RouterState),
        toolbarStyle: style,
        styles: instanceOf(_Styles.Styles)
      };
    }
  }, {
    key: 'contextTypes',
    get: function get() {
      var object = _react.PropTypes.object;


      return {
        store: object
      };
    }
  }, {
    key: 'childContextTypes',
    get: function get() {
      var instanceOf = _react.PropTypes.instanceOf;


      return {
        styles: instanceOf(_Styles.Styles)
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        styles: new _Styles.Styles()
      };
    }
  }]);

  function Router() {
    var _Object$getPrototypeO;

    _classCallCheck(this, Router);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Router)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this.renderScenes = _this.renderScenes.bind(_this);
    _this.onNavigateBack = _this.onNavigateBack.bind(_this);
    return _this;
  }

  _createClass(Router, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        styles: this.props.styles || {}
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;

      var navigator = _react2.default.createElement(_reactNative.NavigationExperimental.Transitioner, {
        navigationState: this.props.router,
        render: this.renderScenes
      });
      var drawerProps = void 0;

      if (typeof props.renderDrawerContent === 'function') {
        drawerProps = Object.assign({}, props.drawerProps || {}, {
          renderContent: props.renderDrawerContent
        });
      } else if (props.drawerProps) {
        drawerProps = props.drawerProps;
      }

      if (drawerProps) {
        drawerProps = Object.assign({}, new _DrawerOptions.DrawerOptions(drawerProps));

        return _react2.default.createElement(
          _Drawer.Drawer,
          drawerProps,
          navigator
        );
      } else {
        return navigator;
      }
    }
  }, {
    key: 'renderScenes',
    value: function renderScenes(props) {
      var onNavigateBack = this.onNavigateBack;
      var store = this.context.store;
      var router = this.props.router;
      var route = props.scene.route;


      props = Object.assign({}, props, { onNavigateBack: onNavigateBack });

      var activePage = router.getPage(route);
      var toolbar = activePage.stack.toolbar(store, props);
      var scenes = activePage.stack.scenes(store, props);

      return _react2.default.createElement(
        _reactNative.View,
        { style: styles.sceneOuterContainer },
        toolbar,
        _react2.default.createElement(
          _reactNative.View,
          { style: styles.sceneInnerContainer },
          scenes
        )
      );
    }
  }, {
    key: 'onNavigateBack',
    value: function onNavigateBack() {
      var _ref = this.context || {};

      var store = _ref.store;


      if (store) {
        store.dispatch((0, _router.popPage)());
      }
    }
  }]);

  return Router;
}(_react2.default.Component);

var styles = _reactNative.StyleSheet.create({
  sceneOuterContainer: {
    flex: 1
  },

  sceneInnerContainer: {
    flex: 1
  },

  overlayBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});