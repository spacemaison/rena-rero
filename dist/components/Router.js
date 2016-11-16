'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _reactNative = require('react-native');

var _Page = require('./Page');

var _Drawer = require('./Drawer');

var _router = require('../actions/router');

var _LinkInformation = require('../models/LinkInformation');

var _DrawerOptions = require('../models/DrawerOptions');

var _RouterState = require('../models/RouterState');

var _Transitioners = require('../models/Transitioners');

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
      var any = _React$PropTypes.any;
      var object = _React$PropTypes.object;
      var func = _React$PropTypes.func;
      var instanceOf = _React$PropTypes.instanceOf;
      var number = _React$PropTypes.number;
      var string = _React$PropTypes.string;
      var style = _reactNative.View.propTypes.style;

      var _ref = _reactNative.StyleSheet.propTypes || {};

      var color = _ref.color;


      return {
        drawerProps: instanceOf(_DrawerOptions.DrawerOptions),
        renderDrawerContent: func,
        routerState: instanceOf(_RouterState.RouterState),
        toolbarStyle: style
      };
    }
  }, {
    key: 'contextTypes',
    get: function get() {
      return {
        store: _react2.default.PropTypes.object
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
    _this.renderScene = _this.renderScene.bind(_this);
    _this.onNavigateBack = _this.onNavigateBack.bind(_this);
    return _this;
  }

  _createClass(Router, [{
    key: 'render',
    value: function render() {
      var props = this.props;

      var navigator = _react2.default.createElement(_reactNative.NavigationExperimental.Transitioner, {
        navigationState: this.props.routerState,
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
      var _this2 = this;

      var onNavigateBack = this.onNavigateBack;
      var _props = this.props;
      var toolbarStyle = _props.toolbarStyle;
      var routerState = _props.routerState;


      var ActivePage = routerState.getPage(props.scene.route);
      var renderToolbar = ActivePage.renderToolbar || _Page.Page.renderToolbar;
      var toolbar = renderToolbar.call(ActivePage, Object.assign({}, props, {
        onNavigateBack: onNavigateBack,
        toolbarStyle: toolbarStyle
      }));
      var scenes = props.scenes.map(function (scene) {
        return _this2.renderScene(Object.assign({}, props, { scene: scene }));
      });

      return _react2.default.createElement(
        _reactNative.View,
        { style: styles.sceneOuterContainer },
        _react2.default.createElement(
          _reactNative.View,
          { style: styles.sceneInnerContainer },
          scenes
        ),
        toolbar
      );
    }
  }, {
    key: 'renderScene',
    value: function renderScene(props) {
      var onNavigateBack = this.onNavigateBack;
      var routerState = this.props.routerState;

      var _ref2 = props.scene || {};

      var route = _ref2.route;
      var url = route.url;
      var pass = route.pass;


      var passedProps = Object.assign({}, props, {
        onNavigateBack: onNavigateBack
      });
      var CurrentPage = routerState.getPage(route);
      var transitions = new _Transitioners.Transitioners(route.transitions, CurrentPage.transitions);

      var style = transitions.style.call(CurrentPage, passedProps);
      var handlers = transitions.handlers.call(CurrentPage, passedProps);

      return _react2.default.createElement(_reactNative.NavigationExperimental.Card, _extends({}, props, {
        key: 'card_' + props.scene.key,
        style: style,
        panHandlers: handlers,
        renderScene: function renderScene(props) {
          return _react2.default.createElement(CurrentPage, _extends({}, pass || {}, { url: url }));
        }
      }));
    }
  }, {
    key: 'onNavigateBack',
    value: function onNavigateBack() {
      var _ref3 = this.context || {};

      var store = _ref3.store;


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