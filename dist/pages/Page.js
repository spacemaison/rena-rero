'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = undefined;

var _DefaultPageComponent = require('./DefaultPageComponent');

var _DefaultPageBindings = require('./DefaultPageBindings');

var _DefaultPageTransitions = require('./DefaultPageTransitions');

var _PageStack = require('../stackers/PageStack');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Page = exports.Page = function Page() {
  var overrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  _classCallCheck(this, Page);

  Object.assign(this, new _DefaultPageComponent.DefaultPageComponent(overrides));
  Object.assign(this, new _DefaultPageTransitions.DefaultPageTransitions(overrides));

  this.bindings = new _DefaultPageBindings.DefaultPageBindings(overrides.bindings);
  this.stack = overrides.stack || new _PageStack.PageStack();
};