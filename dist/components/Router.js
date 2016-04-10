'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactNative = require('react-native');

var _reactNative2 = _interopRequireDefault(_reactNative);

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
      var _React$PropType = _reactNative2.default.PropType;
      var object = _React$PropType.object;
      var func = _React$PropType.func;
      var number = _React$PropType.number;
      var string = _React$PropType.string;
      var _View$propTypes = _reactNative.View.propTypes;
      var color = _View$propTypes.color;
      var style = _View$propTypes.style;


      return {
        routes: object,
        initialRoute: string.isRequired,
        store: object,
        sceneStyle: style,
        toolbarStyle: style,
        titleStyle: style,
        renderBackButton: func,
        backButtonUnderlayColor: color,
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

      var store = this.props.store;

      var _store$getState = store.getState();

      var lastStack = _store$getState.router.stack;


      if (!lastStack) {
        lastStack = [{ page: this.props.initialRoute }];
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
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = stack.slice(-(stack.length - lastLength))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var newPage = _step.value;

              _this2._navigator.push(new _LinkInformation.LinkInformation(newPage));
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
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

      var _props = this.props;
      var props = _props === undefined ? {} : _props;
      var _props2 = this.props;
      var initialRoute = _props2.initialRoute;
      var _props2$routes = _props2.routes;
      var routes = _props2$routes === undefined ? {} : _props2$routes;
      var store = _props2.store;

      var routeMapper = new RouteMapper(routes, store, props, function () {
        return _this3._currentPage;
      });

      return _reactNative2.default.createElement(_reactNative.Navigator, {
        ref: function ref(navigator) {
          return _this3._navigator = navigator;
        },
        initialRoute: { page: initialRoute },
        sceneStyle: props.sceneStyle,
        renderScene: this.renderScene,
        navigationBar: _reactNative2.default.createElement(_reactNative.Navigator.NavigationBar, {
          style: props.toolbarStyle,
          routeMapper: routeMapper }) });
    }
  }, {
    key: 'renderScene',
    value: function renderScene(route, navigator) {
      var _this4 = this;

      var _props$routes = this.props.routes;
      var routes = _props$routes === undefined ? {} : _props$routes;

      var Page = routes[route.page];
      return Page ? _reactNative2.default.createElement(Page, { ref: function ref(page) {
          return _this4._currentPage = page;
        } }) : _reactNative2.default.createElement(_reactNative.View, null);
    }
  }]);

  return Router;
}(_reactNative2.default.Component);

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

      if (index === 0 || typeof this.getBackButton !== 'function') {
        return _reactNative2.default.createElement(_reactNative.View, { style: { width: 0, height: 0 } });
      } else {
        var _ret = function () {
          var props = _this5.props;
          var store = _this5.store;

          var backButton = _this5.getBackButton();
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
            v: _reactNative2.default.createElement(
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

      return _reactNative2.default.createElement(_reactNative.View, null);
    }
  }, {
    key: 'Title',
    value: function Title(route, navigator, index, navState) {
      var title = this.routes[route.page].title || '';

      return _reactNative2.default.createElement(
        _reactNative.Text,
        { style: this.props.titleStyle },
        title
      );
    }
  }]);

  return RouteMapper;
}();