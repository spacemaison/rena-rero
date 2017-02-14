'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Accordion = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactNative = require('react-native');

var _PageStack2 = require('./PageStack');

var _accordionStacker = require('../styles/accordion-stacker');

var _DefaultPageBindings = require('../pages/DefaultPageBindings');

var _DefaultPageComponent = require('../pages/DefaultPageComponent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // TODO: Your almost there! I've decided to forgoe hooking transition animations
// into the router in favor of just handling them as subviews of this PageStack.
// This means you can just copy the "TestRNProject"s code more or less into
// this file, which should be pretty easy, yay!
//
// Do things in the following order
// - Finish actually copying the code in
// - Commit the work and refactor space-watch-frontend-native to use it
// - Get TestRNProject looking good on iOS
// - Use that knowledge to get space-watch-frontend-native looking good on iOS

var Header = _reactNative.NavigationExperimental.Header;

var Accordion = exports.Accordion = function (_PageStack) {
  _inherits(Accordion, _PageStack);

  function Accordion() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$pages = _ref.pages;
    var pages = _ref$pages === undefined ? [] : _ref$pages;
    var _ref$offsets = _ref.offsets;
    var offsets = _ref$offsets === undefined ? [] : _ref$offsets;
    var renderScrollView = _ref.renderScrollView;
    var _ref$scrollViewOffset = _ref.scrollViewOffset;
    var scrollViewOffset = _ref$scrollViewOffset === undefined ? 0 : _ref$scrollViewOffset;

    _classCallCheck(this, Accordion);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Accordion).apply(this, arguments));

    _this.pages = pages;
    _this._animation = new _reactNative.Animated.Value(0);
    _this._contentOffset = { x: 0, y: 0 };
    _this._scenes = null;
    _this.renderScrollView = renderScrollView || _this.renderScrollView;
    _this.scrollViewOffset = scrollViewOffset;

    _this.bindings = new _DefaultPageBindings.DefaultPageBindings(arguments[0]);
    return _this;
  }

  _createClass(Accordion, [{
    key: 'toolbar',
    value: function toolbar() {
      return null;
    }
  }, {
    key: 'renderScrollView',
    value: function renderScrollView(props) {
      return _react2.default.createElement(_reactNative.ScrollView, props);
    }
  }, {
    key: 'scenes',
    value: function scenes(store, props) {
      var _this2 = this;

      var navigationState = props.navigationState;
      var route = props.scene.route;


      var activePage = navigationState.getPage(props.scene.route);
      var pages = this.pages.map(function (page) {
        return navigationState.getPage(page);
      });
      var scene = function scene() {
        return _react2.default.createElement(AccordionScenes, {
          activePage: activePage,
          activeRoute: route,
          ref: function ref(scenes) {
            _this2._scenes = scenes;
          },
          renderScrollView: _this2.renderScrollView.bind(_this2),
          scrollViewOffset: _this2.scrollViewOffset,
          pages: pages,
          setScrollBoundary: _this2.setScrollBoundary.bind(_this2),
          routerProps: props,
          onHeaderPress: _this2.onTransitionAccordion.bind(_this2),
          onScroll: _this2.onScroll.bind(_this2),
          onNavigateBack: _this2.onNavigateBack.bind(_this2)
        });
      };

      return _react2.default.createElement(_reactNative.NavigationExperimental.Card, _extends({}, props, {
        key: props.scene.key,
        style: [{ flex: 1, backgroundColor: 'white' }, activePage.style(props)],
        panHandlers: activePage.handlers(props),
        renderScene: scene }));
    }
  }, {
    key: 'onScroll',
    value: function onScroll(event) {
      var contentOffset = event.nativeEvent.contentOffset;


      this._contentOffset = contentOffset;
    }
  }, {
    key: 'onTransitionAccordion',
    value: function onTransitionAccordion(pageIndex) {
      var _this3 = this;

      var state = {
        animation: this._animation,
        activePosition: pageIndex,
        contentOffset: this._contentOffset,
        hasActivePage: true,
        isAnimating: true
      };

      this._scenes.setState(state, function () {
        _reactNative.Animated.spring(_this3._animation, { toValue: 1 }).start(function () {
          _this3._scenes.setState({ isAnimating: false });
        });
      });
    }
  }, {
    key: 'onNavigateBack',
    value: function onNavigateBack() {
      var _this4 = this;

      this._scenes.setState({ hasActivePage: false, scrollBoundary: null }, function () {
        _reactNative.Animated.spring(_this4._animation, { toValue: 0 }).start();
      });
    }
  }, {
    key: 'setScrollBoundary',
    value: function setScrollBoundary(scrollBoundary) {
      this._scenes.setState({ scrollBoundary: scrollBoundary });
    }
  }]);

  return Accordion;
}(_PageStack2.PageStack);

var AccordionScenes = function (_React$Component) {
  _inherits(AccordionScenes, _React$Component);

  function AccordionScenes() {
    var _Object$getPrototypeO;

    _classCallCheck(this, AccordionScenes);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this5 = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AccordionScenes)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this5.state = {
      animation: null,
      contentOffset: { x: 0, y: 0 },
      activePosition: NaN,
      hasActivePage: false
    };
    _this5._sv = null;
    return _this5;
  }

  _createClass(AccordionScenes, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var scrollViewOffset = this.props.scrollViewOffset;
      var _state = this.state;
      var isAnimating = _state.isAnimating;
      var contentOffset = _state.contentOffset;


      if (isAnimating && contentOffset.y < scrollViewOffset && this._sv) {
        this._sv.scrollTo({ y: scrollViewOffset });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var props = this.props;
      var state = this.state;
      var activeRoute = props.activeRoute;
      var renderScrollView = props.renderScrollView;


      var scrollView = renderScrollView(activeRoute.page.combined, activeRoute.pass || {});
      var style = _accordionStacker.styles.scrollView;
      var ref = function ref(sv) {
        _this6._sv = sv;
      };

      var noop = function noop() {};
      var scrollTo = function scrollTo(options) {
        return _this6._sv.scrollTo(options);
      };
      var scrollToDebounced = this._sv && (0, _lodash2.default)(scrollTo, 80) || noop;
      var onScroll = function onScroll(event) {
        var scrollBoundary = state.scrollBoundary;


        props.onScroll(event);

        if (scrollBoundary) {
          var _event$nativeEvent = event.nativeEvent;
          var contentOffset = _event$nativeEvent.contentOffset;
          var layoutMeasurement = _event$nativeEvent.layoutMeasurement;
          var windowHeight = layoutMeasurement.height;

          var testHeight = Math.min(windowHeight, scrollBoundary.height);

          if (contentOffset.y < scrollBoundary.y1) {
            scrollToDebounced({ y: scrollBoundary.y1 });
          } else if (contentOffset.y + testHeight > scrollBoundary.y2) {
            scrollToDebounced({ y: scrollBoundary.y2 - testHeight });
          }
        }
      };

      return _react2.default.cloneElement(scrollView, { style: style, onScroll: onScroll, ref: ref }, props.pages.map(function (page, index) {
        return _react2.default.createElement(AccordionScene, _extends({}, props, state, {
          onHeaderPress: function onHeaderPress() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            props.onHeaderPress.apply(props, [index].concat(args));
          },
          key: index,
          position: index,
          page: page,
          route: activeRoute
        }));
      }));
    }
  }]);

  return AccordionScenes;
}(_react2.default.Component);

var AccordionScene = function (_React$Component2) {
  _inherits(AccordionScene, _React$Component2);

  function AccordionScene() {
    var _Object$getPrototypeO2;

    _classCallCheck(this, AccordionScene);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var _this7 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(AccordionScene)).call.apply(_Object$getPrototypeO2, [this].concat(args)));

    _this7.__layout = { x: 0, y: 0, width: 0, height: 0 };
    return _this7;
  }

  _createClass(AccordionScene, [{
    key: 'render',
    value: function render() {
      var _this8 = this;

      var props = this.props;
      var layout = this.__layout;
      var animation = props.animation;
      var activePosition = props.activePosition;
      var contentOffset = props.contentOffset;
      var position = props.position;
      var route = props.route;
      var hasActivePage = props.hasActivePage;
      var page = props.page;
      var routerProps = props.routerProps;
      var scrollViewOffset = props.scrollViewOffset;

      var _Dimensions$get = _reactNative.Dimensions.get('window');

      var windowHeight = _Dimensions$get.height;


      var isActivePage = position === activePosition;
      var outputFinal = isActivePage && contentOffset.y < scrollViewOffset ? -layout.y : isActivePage ? -(layout.y - contentOffset.y + scrollViewOffset) : position < activePosition ? -windowHeight : position > activePosition ? windowHeight : -(layout.y - contentOffset.y);

      var dynamicStyle = {
        transform: isNaN(activePosition) ? [] : [{
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, outputFinal]
          })
        }]
      };
      var render = hasActivePage && isActivePage ? page.content.bind(page) : (page.preview || page.content).bind(page);

      if (page.toolbarLeft !== _DefaultPageComponent.DefaultPageComponent.prototype.toolbarLeft || page.toolbarRight !== _DefaultPageComponent.DefaultPageComponent.prototype.toolbarRight) {
        throw new TypeError('The Accordion stack does not support rendering pages with generic ' + 'toolbar components. You can use iconsLeft or iconsRight to add ' + 'icons to the toolbars.');
      }

      return _react2.default.createElement(
        _reactNative.Animated.View,
        {
          style: [_accordionStacker.styles.scene, dynamicStyle],
          onLayout: function onLayout(event) {
            if (hasActivePage && isActivePage) {
              var nativeEvent = event.nativeEvent;
              var _layout = nativeEvent.layout;

              var y1 = contentOffset.y < scrollViewOffset ? scrollViewOffset : contentOffset.y;

              props.setScrollBoundary({
                y1: y1,
                y2: y1 + _layout.height,
                height: _layout.height
              });
            }
            return _this8.onLayout(event);
          } },
        _react2.default.createElement(
          _reactNative.TouchableOpacity,
          { onPress: this.props.onHeaderPress },
          _react2.default.createElement(AccordionHeader, _extends({}, routerProps, {
            hasActivePage: true,
            style: _accordionStacker.styles.header,
            renderLeftComponent: renderLeftComponent,
            renderRightComponent: page.toolbarRight.bind(page, route.page.combined, route.pass || {}),
            renderTitleComponent: page.toolbarTitle.bind(page, route.page.combined, route.pass || {})
          }))
        ),
        _react2.default.createElement(
          _reactNative.View,
          null,
          render(route.page.combined, Object.assign({}, route.pass || {}, {
            isPreviewPage: !hasActivePage || !isActivePage
          }))
        )
      );

      function renderLeftComponent() {
        if (isActivePage && hasActivePage) {
          return _react2.default.createElement(Header.BackButton, { onPress: props.onNavigateBack });
        }

        if (page.iconsLeft && page.iconsLeft.length > 1) {
          throw new Error('Accordion only supports rendering one left icon');
        }

        var style = {
          opacity: animation == null ? 1 : animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
          })
        };

        return page.toolbarLeft(route.page.combined, { style: style });
      }
    }
  }, {
    key: 'onLayout',
    value: function onLayout() {
      var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref2$nativeEvent$lay = _ref2.nativeEvent.layout;
      var layout = _ref2$nativeEvent$lay === undefined ? {} : _ref2$nativeEvent$lay;

      this.__layout = layout;
    }
  }]);

  return AccordionScene;
}(_react2.default.Component);

var AccordionHeader = function (_Header) {
  _inherits(AccordionHeader, _Header);

  function AccordionHeader() {
    _classCallCheck(this, AccordionHeader);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AccordionHeader).apply(this, arguments));
  }

  _createClass(AccordionHeader, [{
    key: '_renderLeft',
    value: function _renderLeft(props) {
      return this._renderSubView(props, 'left', this.props.renderLeftComponent, function () {
        return {};
      });
    }
  }, {
    key: '_renderRight',
    value: function _renderRight(props) {
      return this._renderSubView(props, 'right', this.props.renderRightComponent, function () {
        return {};
      });
    }
  }, {
    key: '_renderTitle',
    value: function _renderTitle(props) {
      var _this10 = this;

      return this._renderSubView(props, 'title', this.props.renderTitleComponent, function () {
        var position = props.position;
        var scene = props.scene;
        var index = scene.index;


        if (!scene.isActive) {
          return { opacity: 0 };
        }

        return {
          transform: !_this10.props.hasActivePage ? [] : [{
            translateX: position.interpolate({
              inputRange: [index - 1, index + 1],
              outputRange: [-50, 50]
            })
          }]
        };
      });
    }
  }]);

  return AccordionHeader;
}(Header);