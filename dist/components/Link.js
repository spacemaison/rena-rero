'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _router = require('../actions/router');

var _Route = require('../models/Route');

var _Transitioners = require('../models/Transitioners');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Link = exports.Link = function (_React$Component) {
  _inherits(Link, _React$Component);

  _createClass(Link, null, [{
    key: 'propTypes',
    get: function get() {
      var any = _react.PropTypes.any;
      var func = _react.PropTypes.func;
      var instanceOf = _react.PropTypes.instanceOf;
      var string = _react.PropTypes.string;
      var style = _reactNative.View.propTypes.style;


      return {
        pass: any,
        style: style,
        to: string.isRequired,
        transitions: instanceOf(_Transitioners.Transitioners),
        onPress: func,
        renderPage: func,
        renderToolbar: func
      };
    }
  }, {
    key: 'contextTypes',
    get: function get() {
      var any = _react.PropTypes.any;
      var style = _reactNative.View.propTypes.style;


      return {
        linkStyle: style,
        urlLinker: any,
        store: any
      };
    }
  }]);

  function Link() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var context = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var renderer = arguments[2];

    _classCallCheck(this, Link);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Link).call(this, props, context, renderer));

    _this.onPress = _this.onPress.bind(_this);
    return _this;
  }

  _createClass(Link, [{
    key: 'render',
    value: function render() {
      var _context = this.context;
      var context = _context === undefined ? {} : _context;
      var _props = this.props;
      var props = _props === undefined ? {} : _props;
      var onPress = this.onPress;
      var _context$linkStyle = context.linkStyle;
      var linkStyle = _context$linkStyle === undefined ? {} : _context$linkStyle;
      var style = props.style;
      var children = props.children;
      var to = props.to;


      return _react2.default.createElement(
        _reactNative.TouchableOpacity,
        { style: style || linkStyle, onPress: onPress, ref: 'th' },
        children || _react2.default.createElement(
          _reactNative.Text,
          null,
          to
        )
      );
    }
  }, {
    key: 'measure',
    value: function measure() {
      var _refs$th;

      return (_refs$th = this.refs.th).measure.apply(_refs$th, arguments);
    }
  }, {
    key: 'onPress',
    value: function onPress() {
      var _ref = this.context || {};

      var store = _ref.store;
      var _ref$urlLinker = _ref.urlLinker;
      var urlLinker = _ref$urlLinker === undefined ? _reactNative.Linking : _ref$urlLinker;

      var _ref2 = this.props || {};

      var transitions = _ref2.transitions;
      var to = _ref2.to;
      var _ref2$pass = _ref2.pass;
      var pass = _ref2$pass === undefined ? null : _ref2$pass;
      var onPress = _ref2.onPress;
      var renderPage = _ref2.renderPage;
      var renderToolbar = _ref2.renderToolbar;

      var uri = _url2.default.parse(to, true);

      if (store == null) {
        throw new Error('Cannot instantiate link elements outside of a Provider element');
      }

      if (uri.protocol && uri.protocol !== 'page:') {
        urlLinker.openURL(to);
      } else {
        store.dispatch((0, _router.closeDrawer)());

        var action = uri.path === 'previous' ? (0, _router.popPage)() : (0, _router.pushPage)(new _Route.Route({
          key: to,
          pass: Object.assign({}, uri.query, pass),
          renderPage: renderPage,
          renderToolbar: renderToolbar,
          transitions: transitions
        }));

        var dispatch = store.dispatch.bind(store, action);

        if (typeof onPress === 'function') {
          onPress.call(this, dispatch);
        } else {
          dispatch();
        }
      }
    }
  }]);

  return Link;
}(_react2.default.Component);