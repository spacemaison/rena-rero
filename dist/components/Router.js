'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeDrawerLayout = require('react-native-drawer-layout');

var _reactNativeDrawerLayout2 = _interopRequireDefault(_reactNativeDrawerLayout);

var _router = require('../actions/router');

var _LinkInformation = require('../models/LinkInformation');

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
      var number = _React$PropTypes.number;
      var string = _React$PropTypes.string;
      var style = _reactNative.View.propTypes.style;

      var _ref = _reactNative.StyleSheet.propTypes || {};

      var color = _ref.color;


      return {
        drawerWidth: number,
        drawerPosition: any, // FIXME
        routes: object,
        initialRoute: string.isRequired,
        store: object,
        sceneStyle: style,
        toolbarStyle: style,
        titleStyle: style,
        renderBackButton: func,
        renderDrawerContent: func,
        backButtonUnderlayColor: any, // FIXME
        backButtonStyle: style,
        backButtonActiveOpacity: number
      };
    }
  }]);

  function Router() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var context = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var renderer = arguments[2];

    _classCallCheck(this, Router);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Router).call(this, props, context, renderer));

    _this.renderScene = _this.renderScene.bind(_this);
    _this.unsubscribeToStore = function () {};
    _this._navigator = null;
    _this._currentPage = null;
    return _this;
  }

  _createClass(Router, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props;
      var store = _props.store;
      var initialRoute = _props.initialRoute;

      var _store$getState = store.getState();

      var lastStack = _store$getState.router.stack;


      if (!lastStack) {
        var linkInfo = new _LinkInformation.LinkInformation({ page: initialRoute });

        store.dispatch((0, _router.pushPage)(linkInfo));
        lastStack = [linkInfo];
      }

      this.unsubscribeToStore = store.subscribe(function () {
        var _store$getState2 = store.getState();

        var _store$getState2$rout = _store$getState2.router.stack;
        var stack = _store$getState2$rout === undefined ? [] : _store$getState2$rout;

        var lastLength = lastStack.length;

        if (!_this2._navigator) {
          lastStack = stack;
          return;
        }

        if (stack.length > lastLength) {
          stack.slice(-(stack.length - lastLength)).forEach(function (newPage) {
            _this2._navigator.push(new _LinkInformation.LinkInformation(newPage));
          });
        } else if (stack.length < lastLength) {
          var difference = lastLength - stack.length;
          while (difference > 0) {
            _this2._navigator.pop();
            difference -= 1;
          }
        }
        lastStack = stack;
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribeToStore();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props;
      var props = _props2 === undefined ? {} : _props2;
      var _props3 = this.props;
      var initialRoute = _props3.initialRoute;
      var _props3$routes = _props3.routes;
      var routes = _props3$routes === undefined ? {} : _props3$routes;
      var store = _props3.store;

      var routeMapper = new RouteMapper(routes, store, props, function () {
        return _this3._currentPage;
      });
      var navigator = _react2.default.createElement(_reactNative.Navigator, {
        ref: function ref(navigator) {
          return _this3._navigator = navigator;
        },
        initialRoute: { page: initialRoute },
        sceneStyle: [styles.page, props.sceneStyle],
        renderScene: this.renderScene,
        navigationBar: _react2.default.createElement(_reactNative.Navigator.NavigationBar, {
          style: [styles.toolbar, props.toolbarStyle],
          routeMapper: routeMapper }) });

      if (typeof props.renderDrawerContent === 'function') {
        return _react2.default.createElement(
          _reactNativeDrawerLayout2.default,
          {
            drawerWidth: props.drawerWidth,
            drawerPosition: props.drawerPosition,
            renderNavigationView: props.renderDrawerContent },
          navigator
        );
      } else {
        return navigator;
      }
    }
  }, {
    key: 'renderScene',
    value: function renderScene(route, navigator) {
      var _this4 = this;

      var _props$routes = this.props.routes;
      var routes = _props$routes === undefined ? {} : _props$routes;

      var Page = routes[route.page];
      return Page ? _react2.default.createElement(Page, { ref: function ref(page) {
          return _this4._currentPage = page;
        } }) : _react2.default.createElement(_reactNative.View, null);
    }
  }]);

  return Router;
}(_react2.default.Component);

var RouteMapper = function () {
  function RouteMapper(routes, store, props, getCurrentPage) {
    _classCallCheck(this, RouteMapper);

    this.routes = routes;
    this.store = store;
    this.props = props;
    this.getCurrentPage = getCurrentPage;
  }

  _createClass(RouteMapper, [{
    key: 'LeftButton',
    value: function LeftButton(route, navigator, index, navState) {
      var _this5 = this;

      var renderBackButton = this.props.renderBackButton;


      if (index === 0 || typeof renderBackButton !== 'function') {
        return _react2.default.createElement(_reactNative.View, { style: { width: 0, height: 0 } });
      } else {
        var _ret = function () {
          var props = _this5.props;
          var store = _this5.store;

          var backButton = renderBackButton();
          var onPress = function onPress() {
            return store.dispatch((0, _router.popPage)());
          };
          var touchableProps = {};

          if (props.backButtonActiveOpacity) {
            touchableProps.activeOpacity = props.backButtonActiveOpacity;
          }
          if (props.backButtonStyle) {
            touchableProps.style = props.backButtonStyle;
          }
          if (props.backButtonUnderlayColor) {
            touchableProps.underlayColor = props.backButtonUnderlayColor;
          }

          return {
            v: _react2.default.createElement(
              _reactNative.TouchableHighlight,
              _extends({}, touchableProps, { onPress: onPress }),
              backButton
            )
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    }
  }, {
    key: 'RightButton',
    value: function RightButton(route, navigator, index, navState) {
      var Page = this.routes[route.page] || {};

      if (typeof Page.renderToolbarActions === 'function') {
        return Page.renderToolbarActions();
      }

      return _react2.default.createElement(_reactNative.View, null);
    }
  }, {
    key: 'Title',
    value: function Title(route, navigator, index, navState) {
      var Page = this.routes[route.page] || {};
      var title = Page.title || '';

      return _react2.default.createElement(
        _reactNative.Text,
        { style: [styles.toolbarTitle, this.props.titleStyle] },
        title
      );
    }
  }]);

  return RouteMapper;
}();

var TOOLBAR_HEIGHT = 53;
var styles = _reactNative.StyleSheet.create({
  toolbar: {
    flex: 1,
    height: TOOLBAR_HEIGHT
  },
  toolbarTitle: {
    marginVertical: 9,
    fontSize: 20
  },
  page: {
    paddingTop: TOOLBAR_HEIGHT
  }
});