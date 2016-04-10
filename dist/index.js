'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _router = require('./actions/router');

Object.defineProperty(exports, 'popPage', {
  enumerable: true,
  get: function get() {
    return _router.popPage;
  }
});
Object.defineProperty(exports, 'pushPage', {
  enumerable: true,
  get: function get() {
    return _router.pushPage;
  }
});

var _Router = require('./components/Router');

Object.defineProperty(exports, 'Router', {
  enumerable: true,
  get: function get() {
    return _Router.Router;
  }
});

var _Link = require('./components/Link');

Object.defineProperty(exports, 'Link', {
  enumerable: true,
  get: function get() {
    return _Link.Link;
  }
});

var _router2 = require('./reducers/router');

Object.defineProperty(exports, 'router', {
  enumerable: true,
  get: function get() {
    return _router2.router;
  }
});